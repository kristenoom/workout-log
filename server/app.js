require('dotenv').config();
let express = require("express");
let app = express();
let sequelize = require("./db");

let user = require("./controllers/user-controller");
let log = require('./controllers/log-controller');

sequelize.sync();
//sequalize.sync({force:true});

app.use(express.json());
app.use(require("./middleware/headers"));

//Exposed
app.use("/user", user);

//Protected
//app.use(require('./middleware/validate-session'));
app.use('/log', log);

app.listen(3000, function () {
  console.log("App is listening on port 3000");
});