'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'DataMonitors',
      [
        {
          content: 'lagi di bandung',
          user_name: 'budi',
          author: 'budi',
          user_location: 'bandung',
          user_profile_image_url_https: 'https://ui-avatars.com/api/?name=Budi',
          retweet_count: 4,
          favorite_count: 10,
          createdAt: new Date("2020-03-25T12:01:00Z"),
          updatedAt: new Date(),
        },
        {
          content: 'lagi di pekanbaru',
          user_name: 'joni',
          author: 'joni',
          user_location: 'pekanbaru',
          user_profile_image_url_https: 'https://ui-avatars.com/api/?name=Joni',
          retweet_count: 45,
          favorite_count: 2,
          createdAt: new Date("2020-03-25T12:05:00Z"),
          updatedAt: new Date(),
        },
        {
          content: 'lagi di jakarta',
          user_name: 'cindy',
          author: 'cindy',
          user_location: 'jakarta',
          user_profile_image_url_https: 'https://ui-avatars.com/api/?name=Cindy',
          retweet_count: 123,
          favorite_count: 56,
          createdAt: new Date("2020-03-25T12:04:00Z"),
          updatedAt: new Date(),
        },
        {
          content: 'lagi di medan',
          user_name: 'joe',
          author: 'joe',
          user_location: 'medan',
          user_profile_image_url_https: 'https://ui-avatars.com/api/?name=Joe',
          retweet_count: 11,
          favorite_count: 23,
          createdAt: new Date("2020-03-25T12:01:00Z"),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
