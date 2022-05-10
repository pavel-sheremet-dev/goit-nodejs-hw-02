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
}

exports.config = new Config();
