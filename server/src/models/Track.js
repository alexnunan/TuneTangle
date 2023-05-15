const Model = require("./Model")
const uniqueFactory = require("objection-unique")

const unique = uniqueFactory({
    fields:["title"],
    identifiers: ["id"]
})

class Track extends unique(Model) {
    static get tableName(){
        return "tracks"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["title", 'artist', "genre", "releaseYear", "album", "duration"],
            properties: {
                title: { type: "string" },
                artist: { type: "string" },
                genre: { type: "string" },
                releaseYear: { type: "integer" },
                album: { type: "string" },
                duration: { type: "integer" }
            }
        }
    }
}

module.exports = Track