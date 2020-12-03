import React, { useState } from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'

//This function component receives the data object about the specified movie as props and displays the movie's title, director, release year, and plot.
//There is also an option to give a 'thumbs up' or 'thumbs down' rating. The rating is coded as either 1 or -1 and sent as a POST request to the backend.
//Back End/Database summary: The movie rating table will be queried by movie ID: if the movie record does not exist, a new instance will be created and the rating tallied under the appropriate column.
//If the instance already exists, the value in the appropriate rating column will be incremented by one.   
const SingleMovieData = (props) => {
    const selectedMovie = props.selectedMovie
    selectedMovie.Title = 'Matilda'
    selectedMovie.Director = 'Devito'
    const recordRating = (ratingType) => {
        //POST request to backend
        console.log(selectedMovie)
        axios.post('http://localhost:8080/movieData/', {ratingType, selectedMovie} ).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.error(error);
        });

    }
    return (
        <div>
        Full Information About This Movie 
            <div>Title: {selectedMovie.Title}</div>
            <div>Director {selectedMovie.Director}</div>
            <div>Release Year: {selectedMovie.Year}</div>
            <div>Plot {selectedMovie.Plot}</div>
            <button onClick={() => {recordRating('up')}}>Thumbs Up</button>
            <button onClick={() => {recordRating('down')}}>Thumbs Down</button>
        </div>
    )
}

export default SingleMovieData