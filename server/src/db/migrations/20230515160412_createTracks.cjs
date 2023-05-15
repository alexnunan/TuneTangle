/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("tracks", (table) => {
        table.bigIncrements("id")
        table.string("title").notNullable().unique()
        table.string("artist").notNullable()
        table.string("genre").notNullable()
        table.integer("releaseYear").notNullable()
        table.string("album").notNullable()
        table.integer("duration").notNullable()
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("tracks")
}
