/*eslint-disable*/
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User } = require('../db/models');
const { UserTask, Task, Report, Like, Comment } = require('../db/models');

class UserService {
  static async getFollowers(id) {
    const result = await User.findOne({
      where: { id },
      include: {
        model: User,
        raw: true,
        as: 'followers',
        attributes: ['id', 'nickname', 'first_name', 'last_name', 'email'],
      },
    });
    return result.followers.map((elem) => {
      const { Followers, ...rest } = elem.get({ plain: true });
      return rest;
    });
  }

  static async getReports(user_id) {
    return Report.findAll({
      where: { user_id },
      include: [
        { model: User, attributes: ['nickname', 'avatar'] },
        { model: Task, attributes: ['title'] },
        { model: Like },
        { model: Comment, attributes: ['id'] },
      ],
      order: [['updatedAt', 'DESC']],
    });
  }

  static async getRecommendedUsers(id) {
    const user = await User.findOne({ where: { id }, include: Task });
    const userTasks = user.Tasks.map((task) => task.id);
    const recommendedUsers = await User.findAll({
      where: {
        [Op.and]: [
          {
            '$Tasks.id$': {
              [Op.in]: userTasks,
            },
          },
          { id: { [Op.ne]: id } },
        ],
      },
      include: Task,
    });
    const idRecommendedUsers = recommendedUsers.map((recUser) => recUser.id);
    const recommendedUsersWithTasks = await User.findAll({
      attributes: ['id', 'nickname', 'first_name', 'last_name', 'email', 'isAdmin', 'avatar'],
      include: Task,
      where: {
        id: {
          [Op.in]: idRecommendedUsers,
        },
      },
    });
    return Promise.all(
      recommendedUsersWithTasks.map(async (user) => {
        const { Tasks: tasks, ...rest } = user.get({ plain: true });
        const commonTasksCount = tasks.filter((task) => userTasks.includes(task.id)).length;
        const percentCommonTasks = Math.floor((commonTasksCount / userTasks.length) * 100);
        const reports = await UserService.getReports(user.id);
        return { ...rest, percentCommonTasks, reportsCount: reports.length };
      }),
    );
  }

  static async getUserTasks(userId) {
    return UserTask.findAll({
      raw: true,
      where: {
        user_id: userId,
      },
      include: Task,
    });
  }

  static async createUser(regData) {
    const { password } = regData;
    // eslint-disable-next-line no-useless-catch
    try {
      const hashPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND));

      // eslint-disable-next-line no-param-reassign
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
    // eslint-disable-next-line no-useless-catch
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
    // eslint-disable-next-line no-useless-catch
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
    // eslint-disable-next-line no-useless-catch
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
    const { password } = data;
    // eslint-disable-next-line no-useless-catch
    try {
      if (password) {
        const hashPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND));
        data.password = hashPassword;
        await User.findByIdAndUpdate(id, {
          $set: data,
        });
        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    // eslint-disable-next-line no-useless-catch
    try {
      await User.findByIdAndDelete(id);

      return true;
    } catch (error) {
      throw error;
    }
  }

  static async getUser(id) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await User.findOne({ where: { id }, raw: true });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
