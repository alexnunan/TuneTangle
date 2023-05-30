/* eslint-disable import/no-extraneous-dependencies */
const Model = require("./Model");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    const { Guess } = require("./index.js")
    return {
      guesses: {
        relation: Model.HasManyRelation,
        modelClass: Guess,
        join: {
          from: "users.id",
          to: "guesses.userId"
        }
      }
    }
  }
}

module.exports = User;