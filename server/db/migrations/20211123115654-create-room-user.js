'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'RoomUsers',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        room_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          unique: 'act_unique',
          references: {
            key: 'id',
            model: 'Rooms',
          },
          onDelete: 'CASCADE',
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          unique: 'act_unique',
          references: {
            key: 'id',
            model: 'Users',
          },
          onDelete: 'CASCADE',
        },
          hasMessages: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          act_unique: {
            fields: ['user_id', 'room_id'],
          },
        },
      },
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RoomUsers');
  },
};
