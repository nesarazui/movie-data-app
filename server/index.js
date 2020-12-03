const express = require("express");
const app = express();

//Manages requests from external sources (i.e. React running on different server)
const cors = require("cors");
app.use(cors());

//Body Parsing Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Selecting  the PORT the server will listen on
const PORT = 8080;

//Making the movieData route available
const movieData = require("./routes/movieData");

//Activating the database process within this module
const { db } = require("../models");

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.use("/movieData", movieData);

//Verifying that the database is connected
db.authenticate().then(() => {
  console.log("connected to the database");
});

//Error Middleware
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send("Something broke!");
});

//Synchronizing the MovieRatings model with the database (model is already defined on db i.e db.define() so can call .sync() on the entire Sequelize instance). This allows Sequelize to automatically create the table according to the
//model definition using the sync method. Placing the sync before the server calls its .listen method with a port will prevent us from running into a race
//condition where we are able to make requests to the database before it is synced. {force: true} will drop all tables and recreate them - any existing rows of data will be lost. Good to use after a change is made to a model (remove after)
const init = async () => {
  await db.sync();
  console.log("All models were synchronized successfully.");
  app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}/`);
  });
};

init();
