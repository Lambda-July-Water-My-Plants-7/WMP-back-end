const { DATABASE_URL } = require('./config/secrets')

module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: './data/dev.db3'
        },
        migrations: {
            directory: './data/migrations'
        },
        pool: {
            afterCreate: (conn, done) => {
                conn.run("PRAGMA foreign_keys = ON", done);
            }
        },
        useNullAsDefault: true
    },
    production: {
        client: 'pg',
        connection: DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tablename: 'knex_migrations',
            directory: './migrations'
        }
    }
}