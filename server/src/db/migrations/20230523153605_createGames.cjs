/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("games", (table) => {
        table.bigIncrements("id")
        table.string("spotifyId").notNullable()
        table.string("playlistId").notNullable()
        table.string("randomSongId").notNullable()
        table.integer("guesses").defaultTo(0)
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("games")
}
