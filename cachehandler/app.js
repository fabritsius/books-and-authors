const redis = require('redis');
const db = require('knex')({
    client: 'pg',
    connection: {
        host: 'db',
        user: 'postgres',
        password: 'mysecretpassword',
        database: 'postgres'
    }
});

const getTimeString = require('./logic/timeprint');

// Create Redis Client
const cache = redis.createClient({host : 'redis', port : 6379});

cache.on('connect', () => {
    console.log('Connected to Redis cache...');
});

const updateCache = () => {
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
    
        if (rows.length) {
            cache.rpush('top5', rows.map((r) => JSON.stringify(r)));
            
            // Remove previous records
            cache.ltrim('top5', -rows.length, -1);
        } else {
            // Clear the cache
            cache.ltrim('top5', 1, 0)
        }
        
        console.log(getTimeString(), 'Cache updated');
    }).catch((err) => {
        console.error(err);
    });
}

updateCache();
setInterval(updateCache, 60 * 1000);