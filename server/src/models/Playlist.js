const Model = require("./Model")

class Playlist extends Model {
    static get tableName(){
        return "playlists"
    }
}

module.exports = Playlist