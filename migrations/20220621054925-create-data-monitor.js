'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DataMonitors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      user_name: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      user_location: {
        type: Sequelize.STRING
      },
      user_profile_image_url_https: {
        type: Sequelize.STRING
      },
      retweet_count: {
        type: Sequelize.INTEGER
      },
      favorite_count: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DataMonitors');
  }
};