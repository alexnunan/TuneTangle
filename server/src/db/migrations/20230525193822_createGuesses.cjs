/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("guesses", (table) => {
        table.bigIncrements("id")
        table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
        table.bigInteger("gameId").notNullable().unsigned().index().references("games.id")
        table.string("trackId").notNullable()
        table.boolean("titleCorrect").notNullable().defaultTo(false)
        table.boolean("artistCorrect").notNullable().defaultTo(false)
        table.boolean("albumCorrect").notNullable().defaultTo(false)
        table.string("releaseDateCheck").notNullable()
        table.string("durationCheck").notNullable()
        table.string("popularityCheck").notNullable()
        table.string("danceabilityCheck").notNullable()
        table.string("energyCheck").notNullable()
        table.string("loudnessCheck").notNullable()
        table.string("tempoCheck").notNullable()
        table.string("valenceCheck").notNullable()
        table.string("instrumentalnessCheck").notNullable()
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("guesses")
}