const express = require('express')
const { default: MovieSearch } = require('../../src/Components/MovieSearch')
const router = express.Router()

//All routes to http://localhost:8080/movieData/
router.get('/', (req, res, next) => {
    res.send('Movie Router Route')
})

//POST route
//The movie rating table will be queried by movie ID: if the movie record does not exist, a new instance will be created and the rating tallied under the appropriate column.
//If the instance already exists, the value in the appropriate rating column will be incremented by one.   
// router.post('/', async(req, res, next) => {
//     // try {
//     //     const {selectedMovie, ratingType} = req.body
//     //     //findOrCreate returns a promise for an array. first element is the instance, second element
//     //     //is a boolean (wasCreated): true = instance was just created; false = instance was already there
//     //     // const [instance, wasCreated] = await Movies.findOrCreate({where: {imdbID: selectedMovie.imdbID}})
//     //     // if (wasCreated){
//     //     //     await instance.update({[ratingType]: 1})
//     //     // } else {
//     //     //     let previousVal = instance[ratingType]
//     //     //     await instance.update({[ratingType]: previousVal + 1})
//     //     // }

//     //     // if (instance){
//     //     //     res.send('Received Request to Post Data with rating')
//     //     // } else {
//     //     //     res.status(404).send('Not Found')
//     //     // }
//     //     res.send('Found!')
//     // } catch (error) {
//     //     next(error)
//     // }
// })

module.exports = router


