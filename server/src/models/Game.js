const Model = require("./Model")

class Game extends Model {
    static get tableName(){
        return "games"
    }

    static get relationMappings() {
        const { Guess } = require("./index.js")
        return {
            guesses: {
                relation: Model.HasManyRelation,
                modelClass: Guess,
                join: {
                    from: "games.id",
                    to: "guesses.gameId"
                }
            }
        }
    }
}

module.exports = Game