module.exports = {
    development: {
        client: 'better-sqlite3',
        connection: {
            filename: "./list.db",
        },
        migrations: {
            directory: './migrations'
        },
        pool: {
            min: 0,
            max: 1,
            idleTimeoutMillis: 100
        },
        useNullAsDefault: true
    }
}