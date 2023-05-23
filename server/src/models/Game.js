const Model = require("./Model")

class Game extends Model {
    static get tableName(){
        return "games"
    }
}

module.exports = Game