const { Sequelize } = require("sequelize");
const { pg } = require("./vars");

const db = new Sequelize(
  `postgres://${pg.USER}:${pg.PASSWORD}@${pg.HOST}:${pg.PORT}/${pg.DB}`,
  {
    logging: false,
    timezone: "UTC",
  }
);

module.exports = db;
