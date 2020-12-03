const express = require("express");
const { MovieRatings } = require("../../models");
const router = express.Router();

//All routes to http://localhost:8080/movieData/

//Retrieves all movie ratings records from database
router.get("/", async (req, res, next) => {
  try {
    console.log("definitely hit this route!!");
    let movieRecords = await MovieRatings.findAll();
    console.log(movieRecords);
    if (movieRecords) {
      res.send(movieRecords);
    } else {
      res.sendStatus("Not Found");
    }
  } catch (error) {
    next(error);
  }
});

//POST route
//The movie rating table will be queried by movie ID: if the movie record does not exist, a new instance will be created (with default values for up and down ratings at 0). The value in the appropriate rating column will be incremented by one.
router.post("/", async (req, res, next) => {
  try {
    const { selectedMovie, ratingType } = req.body;
    console.log("contents of reqbody: ", selectedMovie, ratingType);
    // findOrCreate returns a promise for an array. first element is the instance, second element
    // is a boolean (wasCreated): true = instance was just created; false = instance was already there
    const [instance] = await MovieRatings.findOrCreate({
      where: { imdbID: selectedMovie.imdbID },
      defaults: { title: selectedMovie.Title },
    });

    let previousVal = instance[ratingType];
    await instance.update({ [ratingType]: previousVal + 1 });

    if (instance) {
      res.send("Received Request to Post Data with rating");
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
