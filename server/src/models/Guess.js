const Model = require("./Model.js")

class Guess extends Model {
    static get tableName() {
        return "guesses"
    }

    static get relationMappings() {
        const { User, Game } = require("./index.js") 
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "guesses.userId",
                    to: "users.id"
                }
            },

            game: {
                relation: Model.BelongsToOneRelation,
                modelClass: Game,
                join: {
                    from: "guesses.gameId",
                    to: "games.id"
                }
            }
        }
    }
}

module.exports = Guess