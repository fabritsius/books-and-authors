const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const logger = require('./middleware/logger');

// Init the App

const app = express();

// Init the view engine

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// Init the middleware

app.use(logger);
app.use(bodyParser.json());

// Set static folder
app.use(express.static(
    path.join(__dirname, 'public')
));

// Set routes

app.get('/', (req, res) => {
    res.render('home');
});

// Set route files

app.use('/create', require('./routes/create'));

// Start the server

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`A Client service is listening on port ${port}`);
});