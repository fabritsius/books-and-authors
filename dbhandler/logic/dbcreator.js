const db = require('knex')({
    client: 'pg',
    connection: {
        host: 'db',
        user: 'postgres',
        password: 'mysecretpassword',
        database: 'postgres'
    }
});

db.schema.hasTable('authors').then((exists) => {
    if (!exists) {
        db.schema.createTable('authors', (table) => {
            table.increments('id')
                .notNullable()
                .primary();
            table.string('name');
            table.integer('age');
        }).then(() => {
            console.log('"Authors" table is created');
        }).catch((err) => { 
            console.error(err);
            throw err;
        });
    }
}).then(() => {
    db.schema.hasTable('books').then((exists) => {
        if (!exists) {
            db.schema.createTable('books', (table) => {
                table.increments('id')
                    .notNullable()
                    .primary();
                table.string('title');
                table.integer('authorId')
                    .unsigned()
                    .notNullable()
                    .references('id')
                    .inTable('authors');
                table.integer('pages');
            }).then(() => {
                console.log('"Books" table is created');
            }).catch((err) => { 
                console.error(err);
                throw err;
            });
        }
    });
});

module.exports = db;