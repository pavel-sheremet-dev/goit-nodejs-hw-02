const path = require('path');

class Config {
  getEnvVars = () => {
    return {
      PORT: process.env.PORT ?? 3000,
      ALLOWED_CORS_ORIGIN: process.env.ALLOWED_CORS_ORIGIN ?? '*',
      getLoggerFormat: env => (env === 'development' ? 'dev' : 'short'),
      MONGO_URI: process.env.MONGO_URI,
    };
  };

  getSubscriptions = () => ({
    all: ['starter', 'pro', 'business', 'super_admin'],
    starter: 'starter',
    pro: 'pro',
    business: 'business',
    super: 'super_admin',
  });

  getMimetypes = () => ['image/jpeg', 'image/png'];

  getDirPath = () => ({
    temp: path.resolve(process.cwd(), 'temp'),
    static: path.resolve(process.cwd(), 'static'),
    avatars: path.resolve(process.cwd(), 'static', 'avatars'),
  });
}

exports.config = new Config();
