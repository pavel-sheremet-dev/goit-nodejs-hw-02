const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const { contactsRouter } = require('./src/routes/contacts/contacts.router');


// .env config
dotenv.config({path: path.resolve(__dirname, './.env')});

const PORT = process.env.PORT
const ALLOWED_CORS_ORIGIN = process.env.ALLOWED_CORS_ORIGIN

// create server
const app = express();

// middlewares
app.use(express.json({ limit: '200kb' }));
app.use(morgan('dev'));
app.use(cors({origin: ALLOWED_CORS_ORIGIN}));

//Routes
app.use('/users', contactsRouter);

//Errors middleware
app.use((err, req, res, next) => {
  const statusCode = err.status ?? 500;
  res.status(statusCode).send(err.message);
});

// Start listen
app.listen(PORT, err => {
  if (err) console.error(err);
  console.log(`Server works on port: ${PORT}`);
});



