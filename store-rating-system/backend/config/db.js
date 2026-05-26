const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "store_rating",
    "root",
    "Janhavi@28", {
        host: "localhost",
        dialect: "mysql",
    }
);

module.exports = sequelize;