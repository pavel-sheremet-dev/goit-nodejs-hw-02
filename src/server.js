const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const { getConfig } = require('./config');
const { contactsRouter } = require('./routes/contacts/router');

class Server {
  constructor() {
    this.app = null;
  }

  start() {
    this.initSever();
    this.initConfig();
    // this.initDataBase()
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

  // configure()

  initMiddlewares = () => {
    this.app.use(express.json({ limit: '200kb' }));
    this.configureLogger();
    this.configureCors();
  };

  initRoutes = () => {
    this.app.use('/api/contacts', contactsRouter);
  };

  initErrorHandling = () => {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status ?? 500;
      res.status(statusCode).send(err.message);
    });
  };

  startListening = () => {
    const { PORT } = getConfig();
    this.app.listen(PORT, err => {
      if (err) console.error(err);
      console.log(`Server works on PORT: ${PORT}`);
    });
  };

  configureLogger = () => {
    const { getLoggerFormat } = getConfig();
    const loggerFormat = getLoggerFormat(this.app.get('env'));
    this.app.use(morgan(loggerFormat));
  };

  configureCors = () => {
    const { CORS } = getConfig();
    this.app.use(cors({ origin: CORS }));
  };
}

exports.Server = Server;
