const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/contacts/contacts.router');

// .env config

const ALLOWED_CORS_ORIGIN = process.env.ALLOWED_CORS_ORIGIN;

// create server
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// middlewares
app.use(express.json({ limit: '200kb' }));
app.use(morgan(formatsLogger));
app.use(cors({ origin: ALLOWED_CORS_ORIGIN }));

//Routes
app.use('/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Page Not found' });
});

//Errors middleware
app.use((err, req, res, next) => {
  const statusCode = err.status ?? 500;
  res.status(statusCode).send(err.message);
});

exports.app = app;
