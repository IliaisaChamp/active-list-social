const bcrypt = require('bcrypt');


class UserService {
  static async createUser(regData) {
    const { email, name, password } = regData;
    try {
      const cryptPass = await bcrypt.hash(password, Number(process.env.SALT_ROUND));

      const currentUser = await User.create({ ...regData, password: cryptPass });

      return currentUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async findUser(data) {
    const { email, name, password } = data;
    try {
      const currentUser = await User.findOne({ where: { email } });

      if (currentUser) {
        const areSame = await bcrypt.compare(password, currentUser.password)

        if (areSame) {
          return currentUser;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}

module.exports = UserService;
