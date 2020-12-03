import React, { useState } from 'react'
import SingleMovieData from './SingleMovieData'
import axios from 'axios'

//This function component displays the movie search results returned from the OMDB API (data in an array accessed via props). If the array
//is empty, the display is 'no movie results yet'. Each movie object displayed has an onClick, which calls the getFullData function, which
//makes an axios call to the OMDB API to search database for that specific title. The query response is an object with full data about the movie, including
//director, actors, etc. The response data is passed down as props to the SingleMovieData component.
const DisplayMovieTitles = (props) => {
    const titleResults = props.titleResults
    const [selectedMovie, setSelectedMovie] = useState({})

    const getFullData = (movieObj) => {
        axios.request(`http://www.omdbapi.com/?i=tt3896198&apikey=6befe58e&t=${movieObj.Title}`).then(function (response) {
            const fullMovieData = response.data
            setSelectedMovie(fullMovieData)
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
    <div>
    { 
    titleResults.length ? 
    <div>
        {
            titleResults.map((movieObj, idx) => {
                return(
                    <div key={idx} onClick={() => getFullData(movieObj)}>
                    <div>{movieObj.Title}</div> 
                    <div>{movieObj.Year}</div>
                    <img src={movieObj.Poster} alt="Movie Poster Thumbnail"/>
                    </div>
                )
            })
        }
        {/* <SingleMovieData selectedMovie={selectedMovie} /> */}
    </div> :
    <div>
        No Movie Results Yet
        <SingleMovieData selectedMovie={selectedMovie} />
    </div>
    }
    </div>
    )
}

export default DisplayMovieTitles;
