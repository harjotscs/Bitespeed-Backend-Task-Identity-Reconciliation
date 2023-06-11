const { Sequelize } = require("sequelize");
const { pg } = require("./vars");

const db = new Sequelize(
  `postgres://:${pg.USER}@${pg.HOST}:${pg.PORT}/${pg.DB}`
);

module.exports = db;
