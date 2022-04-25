exports.getConfig = () => {
  return {
    PORT: process.env.PORT ?? 3000,
    ALLOWED_CORS_ORIGIN: process.env.ALLOWED_CORS_ORIGIN ?? '*',
    getLoggerFormat: env => (env === 'development' ? 'dev' : 'short'),
  };
};
