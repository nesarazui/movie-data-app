import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieRatings = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/movieData/");
        const movieData = response.data;
        console.log(movieData, "?");
        setRatings(movieData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      This will return a list of all the movies that have been rated
      {ratings.map((movieObj) => {
        return (
          <div key={movieObj.imdbID}>
            <div>Title: {movieObj.title}</div>
            <div>Thumbs Up: {movieObj.upRatings}</div>
            <div>Thumbs Down: {movieObj.downRatings}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieRatings;
