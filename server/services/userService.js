const bcrypt = require('bcrypt');
const { User } = require('../db/models/');

class UserService {
  static async createUser(regData) {
    const { password } = regData;
    try {
      const hashPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND));

      regData.password = hashPassword;

      const user = await User.create({
        ...regData,
      });
      return user.get({ plain: true });
    } catch (error) {
      throw error;
    }
  }
  static async findByNickname(nickname) {
    try {
      const candidate = await User.findOne({
        where: {
          nickname,
        },
      });
      return !!candidate;
    } catch (error) {
      throw error;
    }
  }
  static async findByEmail(email) {
    try {
      const candidate = await User.findOne({
        where: {
          email,
        },
      });
      return !!candidate;
    } catch (error) {
      throw error;
    }
  }

  static async findAndCheck(data) {
    const { email, password } = data;
    try {
      const candidate = await User.findOne({ where: { email } });

      if (!candidate) {
        return new Error('Пользователь c таким email не найден');
      }
      const validPassword = await bcrypt.compare(password, candidate.password);

      if (!validPassword) {
        return new Error('Пароль не совпадает');
      }

      return candidate.get({ plain: true });
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(data, id) {
    const { userId, password } = data;

    try {
      if (password) {
        const hashPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND));
        data.password = hashPassword;

        const user = await User.findByIdAndUpdate(id, {
          $set: data,
        });

        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      await User.findByIdAndDelete(id);

      return true;
    } catch (error) {
      throw error;
    }
  }

  static async getUser(id) {
    try {
      const user = await User.findById(id);

      const { password, updatedAt, ...other } = user._doc;
      return other;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
