/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw('PRAGMA foreign_keys = ON');
    return knex.schema.alterTable('sharedList', (table => {
        table.foreign('sharedListId').references('lists.id').onDelete('CASCADE');
        table.foreign('sharedToUserId').references('users.id').onDelete('CASCADE');
    }));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
