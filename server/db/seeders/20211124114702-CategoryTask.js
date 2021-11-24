'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const taskTitles = require('../../fixtures/startTasks');

    const categoryTasks = taskTitles.map((el, id) => {
      id++
      if (id  <= 30) return { task_id: id, category_id: 1};
      if (id > 30 && id <= 60) return { task_id: id, category_id: 2};
      if (id > 60 && id <= 90) return { task_id: id, category_id: 3};
      if (id > 90 && id <= 120) return { task_id: id, category_id: 4};
      if (id > 120 && id <= 150) return { task_id: id, category_id: 5};
      if (id > 150 && id <= 180) return { task_id: id, category_id: 6};
      if (id > 180 && id <= 230) return { task_id: id, category_id: 7 };
      return { task_id: id, category_id: 8};
    })
    console.log(categoryTasks.length);
    console.dir(categoryTasks);
    await queryInterface.bulkInsert('CategoryTasks', categoryTasks, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
