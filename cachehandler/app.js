const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'mysecretpassword',
        database: 'postgres'
    }
});

db.from('authors')
    .select('*')
.then((rows) => {
    console.log('\nAuthors:\n');
    for (row of rows) {
        console.log(`${row['name']} #${row['id']} (age ${row['age']})`);
    }
}).catch((err) => {
    console.log( err); throw err;
});

db.from('books').select("*").where('pages', '>', 200)
.then((rows) => {
    console.log('\nBooks:\n');
    for (row of rows) {
        console.log(`${row['id']} ${row['title']} by author #${row['authorId']} (${row['pages']} pages)`);
    }
}).catch((err) => {
    console.log( err); throw err;
});

db.from('authors')
    .join('books', 'authors.id', 'books.authorId')
    .select('authors.name', 'authors.age')
    .where('books.pages', '>', 200)
    .count({books: 'authors.id'})
    .groupBy('authors.id')
    .orderBy('books', 'desc')
    .orderBy('age')
    .limit(5)
.then((rows) => {
    console.log('\nPerforming Authors:\n');
    for (row of rows) {
        console.log(`${row['name']} wrote ${row['books']} big books`);
    }
}).catch((err) => {
    console.log( err); throw err;
}).finally(() => {
    db.destroy();
});