/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("users", table => {
        table.string("spotifyId")
        table.string("accessToken")
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.table("users", table => {
        table.dropColumn('spotifyId')
        table.dropColumn("accessToken")
    })
}