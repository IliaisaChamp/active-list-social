const bcrypt = require('bcrypt');
const { User } = require('../db/models');

class UserService {
  static async createUser(regData) {
    const { password } = regData;
    try {
      const cryptPass = await bcrypt.hash(password, Number(process.env.SALT_ROUND));
      return await User.create({ ...regData, password: cryptPass });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async findUser(data) {
    const { email, password } = data;
    try {
      const currentUser = await User.findOne({ where: { email } });
      if (currentUser) {
        const areSame = await bcrypt.compare(password, currentUser.password);
        if (areSame) {
          return currentUser;
        }
        return null;
      }
      return null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = UserService;
