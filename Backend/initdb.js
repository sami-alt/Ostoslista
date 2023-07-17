const knex = require('knex')({
    client: 'better-sqlite3',
    connection: {
      filename: "./list.db",
    },
    pool: {
        min: 0,
        max: 1,
        idleTimeoutMillis: 100
    }
});

knex.schema.createTable('items', (table)=>{
    table.increments('id').primary();
    table.text('product');
    table.integer('done');
    table.integer('listId').references('id').inTable('lists').notNullable();
}).then(console.log('items table created'))    

knex.schema.createTable('lists', (table)=>{
    table.integer('id').primary();
    table.text('name');
    table.integer('owner').references('id').inTable('users').notNullable();
}).then(console.log('lists table created'))
/*
.references('id').inTable('users').notNullable();
knex.schema.createTable('users', (table)=>{
    table.increments('id').primary();
    table.text('username').unique();
    table.text('passwordHash');
}).then(console.log('user table created'))

knex.schema.createTable('sessions', (table)=> {
    table.text('token');
    table.integer('userId').references('id').inTable('users')
    table.timestamp('created_at').defaultTo(knex.fn.now());
}).then(console.log('sessions teble created'))