/* eslint-disable no-console */
const tableName = "users";

/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  const tableExists = await knex.schema.hasTable(tableName);

  if (!tableExists) {
    console.log(`Creating ${tableName}`);
    return knex.schema.createTable(tableName, (table) => {
      table.bigIncrements("id");
      table.string("email").notNullable().unique();
      table.string("cryptedPassword").notNullable();
      table.string("accessToken").defaultTo("BQBMrshS7BDHLpP8bsEBhYt3hcgkXrOUMQh1ZPctf_9FupPljjjzTQhSPoOuZzHovdkWkGgBtNejQe3FD8Rbod8ii2GUqPL9AMyGZf5VZyUcDLHSKJ94ZtHtGOA3fgU8aTBHiAywANYz9OPTBz0EHSGRIuGOC2EEPaHd_JIrxmFEveDLDorX537agxmhNrnjG72BMA")
      table.string("refreshToken").defaultTo("AQCmgEF129Jq5W0FrAUmkYl36geGHDtTv1EyiCD85xRVT5yMA9OGWZiTyFLg_vTtUD_I44P8ZpznNwLzG7XV3vbyB6FBf1rAiEuabmuIMmqC7chZaNYCX7zOIzPOqxLsoug")
      table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    });
  }

  console.log(`${tableName} already exists; skipping`);
  return 1;
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  console.log(`Rolling back ${tableName}`);
  return knex.schema.dropTableIfExists(tableName);
};