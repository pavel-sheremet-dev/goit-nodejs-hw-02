const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const { contactsRouter } = require('./routes/contacts/router');
const { authRouter } = require('./routes/auth/router');
const { staticRouter } = require('./routes/static/router');
const { config } = require('./config');

class Server {
  constructor() {
    this.app = null;
  }

  start() {
    this.initSever();
    this.initConfig();
    this.initDataBase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initSever = () => {
    this.app = express();
  };

  initConfig = () => {
    dotenv.config({ path: path.resolve(__dirname, '../.env') });
  };

  initDataBase = async () => {
    const { MONGO_URI } = config.getEnvVars();
    try {
      await mongoose.connect(MONGO_URI);
      console.log('Database successfully connected');
    } catch (error) {
      console.log('Database error connection');
      process.exit(1);
    }
  };

  initMiddlewares = () => {
    this.app.use(express.json({ limit: '200kb' }));
    this.configureLogger();
    this.configureCors();

    this.app.use(express.static('static'));
  };

  initRoutes = () => {
    this.app.use('/api/contacts', contactsRouter);
    this.app.use('/api/users', authRouter);
    this.app.use('/static', staticRouter);
  };

  initErrorHandling = () => {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status ?? 500;
      res.status(statusCode).send(err.message);
    });
  };

  startListening = () => {
    const { PORT } = config.getEnvVars();
    this.app.listen(PORT, err => {
      if (err) console.error(err);
      console.log(`Server works on PORT: ${PORT}`);
    });
  };

  configureLogger = () => {
    const { getLoggerFormat } = config.getEnvVars();
    const loggerFormat = getLoggerFormat(this.app.get('env'));
    this.app.use(morgan(loggerFormat));
  };

  configureCors = () => {
    const { CORS } = config.getEnvVars();
    this.app.use(cors({ origin: CORS }));
  };
}

exports.Server = Server;
