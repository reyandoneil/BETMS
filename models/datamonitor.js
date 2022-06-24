'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataMonitor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DataMonitor.init({
    content: DataTypes.STRING,
    user_name: DataTypes.STRING,
    author: DataTypes.STRING,
    user_location: DataTypes.STRING,
    user_profile_image_url_https: DataTypes.STRING,
    retweet_count: DataTypes.INTEGER,
    favorite_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DataMonitor',
  });
  return DataMonitor;
};