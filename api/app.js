const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');

const logger = require('./middleware/logger');
const cors = require('./middleware/cors');

const sendRabbitMessage = require('./logic/rabbitmq');

// Create Redis Client
const cache = redis.createClient();

cache.on('connect', () => {
    console.log('Connected to Redis cache...');
});

// Init the App

const app = express();

// Init the middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger);
app.use(cors);

// Set routes

app.get('/top5', (req, res) => {
    cache.lrange('top5', 0, 4, (err, rows) => {

        if (err) {
            console.error('cache read error', err);
            return res.send({
                ok: false,
                msg: 'Internal error'
            });
        }

        const top5Resp = {
            ok: true,
            results: []
        }

        for (row of rows) {
            top5Resp.results.push(JSON.parse(row));
        }

        return res.send(top5Resp);
    });
});

app.post('/author', (req, res) => {
    sendRabbitMessage({author: req.body}, (err, data) => {
        
        if (err) {
            console.error(err);
        }

        res.send(data);
    });
});

app.post('/book', (req, res) => {
    sendRabbitMessage({book: req.body}, (err, data) => {
        
        if (err) {
            console.error(err);
        }

        res.send(data);
    });
});

// Start the server

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`An API service is listening on port ${port}`);
});