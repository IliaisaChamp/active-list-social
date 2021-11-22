const bcrypt = require('bcrypt');
const { User } = require('../db/models/');
const { UserTask, Task } = require('../db/models');

class UserService {


  static async getUserTasks(userId) {
    return await UserTask.findAll({
      raw: true,
      where: {
        user_id: userId,
      },
      include: Task,
    });
  }

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
      console.log(email)
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
    console.log(data)
    const { email, password } = data;
    try {
      const candidate = await User.findOne({ where: { email } });
      if (!candidate) {
        return null
      }
      const validPassword = await bcrypt.compare(password, candidate.password);
      if (!validPassword) {
        return null;
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
      return await User.findOne({ where: { id }, raw: true });

    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
