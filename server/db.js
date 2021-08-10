const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "node-modules-server",
  "postgres",
  "password",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

sequelize.authenticate().then(
  function () {
    console.log("Connected to node-modules-server postgres database!");
  },
  function (err) {
    console.log(err);
  }
);

module.exports = sequelize;