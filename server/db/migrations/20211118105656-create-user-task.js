'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'UserTasks',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: 'action_unique',
          references: {
            key: 'id',
            model: 'Users',
          },
        },
        task_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: 'action_unique',
          references: {
            key: 'id',
            model: 'Tasks',
          },
        },
        isDone: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        uniqueKeys: {
          action_unique: {
            fields: ['user_id', 'task_id'],
          },
        },
      },
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserTasks');
  },
};
