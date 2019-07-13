const express = require('express');
const bodyParser = require('body-parser');

const logger = require('./middleware/logger');
const cors = require('./middleware/cors');

// Init the App

const app = express();

// Init the middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger);
app.use(cors);

// Set routes

app.get('/top5', (req, res) => {
    res.send({
        ok: true,
        results: [
            {
                id: 1,
                name: 'John Green',
                age: 32
            },
            {
                id: 2,
                name: 'Tom Brown',
                age: 42
            },
            {
                id: 3,
                name: 'Hannah Purple',
                age: 26
            },
            {
                id: 4,
                name: 'Stephan White',
                age: 51
            },
            {
                id: 5,
                name: 'Greg Yellow',
                age: 23
            }
        ]
    });
});

app.post('/author', (req, res) => {
    res.send({
        ok: true,
        author: req.body
    });
});

app.post('/book', (req, res) => {
    res.send({
        ok: true,
        book: req.body
    });
});

// Start the server

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`An API service is listening on port ${port}`);
});