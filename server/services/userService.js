const bcrypt = require('bcrypt');
const { User } = require('../db/models/');
const { UserTask, Task } = require('../db/models');
const { Op } = require('sequelize');

class UserService {
  static async getRecommendedUsers(id) {
    const user = await User.findOne({ where: { id }, include: Task });
    const userTasks = user.Tasks.map((task) => task.id);
    const recommendedUsers = await User.findAll({
      where: {
        '$Tasks.id$': {
          [Op.in]: userTasks,
        },
      },
      include: Task,
    });
    const idRecommendedUsers = recommendedUsers.map((user) => user.id);
    const recommendedUsersWithTasks = await User.findAll({
      attributes: ['id', 'nickname', 'first_name', 'last_name', 'email', 'isAdmin', 'avatar'],
      include: Task,
      where: {
        id: {
          [Op.in]: idRecommendedUsers,
        },
      },
    });
      return recommendedUsersWithTasks.map((user) => {
      const { Tasks: tasks, ...rest } = user.get({ plain: true });
      const commonTasksCount = tasks.filter((task) => userTasks.includes(task.id)).length;
      const percentCommonTasks = Math.floor(commonTasksCount / userTasks.length * 100)
      return { ...rest, common: percentCommonTasks };
    });
  }

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
      console.log(email);
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
    console.log(data);
    const { email, password } = data;
    try {
      const candidate = await User.findOne({ where: { email } });
      if (!candidate) {
        return null;
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
