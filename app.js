const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const db = require('./models/index')

const routes = require('./routes/index');
const books = require('./routes/books');
const port = 3000

const app = express();


// (async () => {
//     try {
//         await db.sequelize.authenticate()
//         await db.sequelize.sync()
//         console.log('Connection to the database successful!')
//     } catch (error) {
//         console.error('Error connecting to the database: ', error)
//     }
// })()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/books', books);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Handles errors
app.use((err, req, res, next) => {
    // Ensure the err object has status and message properties defined
    err.status = err.status || 500;
    err.message = err.message || 'Server error';
    res.status(err.status);
    if (res.statusCode === 404) {
        console.log("I'm sorry, page not found;(");
        res.render('page-not-found', { err });
    } else {
        console.log("I'm sorry, server error;(");
        res.render('error', { err });
    }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;
