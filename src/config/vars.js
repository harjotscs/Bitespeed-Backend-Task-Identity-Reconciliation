module.exports = {
  port: process.env.PORT,
  pg: {
    HOST: process.env.PG_HOST,
    USER: process.env.PG_USER,
    PASSWORD: process.env.PG_PASSWORD,
    DB: process.env.PG_DATABASE,
    PORT: process.env.PG_PORT,
  },
  logLevel: process.env.LOG_LEVEL,
};
