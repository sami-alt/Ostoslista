/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('sharedList', (table) => {
        table.integer('sharedToUserId').references('id').inTable('users').notNullable();
        table.integer('sharedListId').references('id').inTable('lists').notNullable();
        table.primary('sharedToUserId', 'sharedListId');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

};
