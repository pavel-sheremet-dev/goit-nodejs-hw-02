const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const contacts = require('./routes/contacts');

console.log('contacts', contacts)




// .env config


const ALLOWED_CORS_ORIGIN = process.env.ALLOWED_CORS_ORIGIN

// create server
const app = express();

// middlewares
app.use(express.json({ limit: '200kb' }));
app.use(morgan('dev'));
app.use(cors({origin: ALLOWED_CORS_ORIGIN}));

//Routes
// app.use('/users', contacts);

//Errors middleware
app.use((err, req, res, next) => {
  const statusCode = err.status ?? 500;
  res.status(statusCode).send(err.message);
});

exports.app = app;

// Start listen




