/* eslint-disable import/no-extraneous-dependencies */
const Model = require("./Model");

class User extends Model {
  static get tableName() {
    return "users";
  }
}

module.exports = User;