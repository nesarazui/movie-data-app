import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router";
import { Container, Button, Card, ListGroup } from "react-bootstrap";

//This function component receives the movie data object accessed through useLocation(). Using this data object, an axios call is made to the OMDBAPI to retrieve
//the full data by utilizing an exact title match query. (The data retrieved includes information on the director, plot, etc). This data gets stored under the 'selectedMovie' state,
//which is then used to render the specfic details about the movie: (title, director, release year, plot, etc).
//There is also an option to give a 'thumbs up' or 'thumbs down' rating. The rating is coded as upRating/downRating and sent along with the movie object as a POST request to the backend to update the database accordingly.
const SingleMovieData = (props) => {
  const [selectedMovie, setSelectedMovie] = useState({});
  const location = useLocation();
  const history = useHistory();
  const movieObj = location.state.movieObj;
  console.log("comments: ", movieObj);

  useEffect(() => {
    const getFullData = async (movieObj) => {
      console.log("does this happen first", movieObj);
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?i=tt3896198&apikey=6befe58e&t=${movieObj.Title}`
        );
        const fullMovieData = response.data;
        setSelectedMovie(fullMovieData);
      } catch (error) {
        console.error(error);
      }
    };
    getFullData(movieObj);
  }, []);

  const recordRating = async (ratingType) => {
    try {
      await axios.post("http://localhost:8080/movieData/", {
        ratingType,
        selectedMovie,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const returnToSearch = () => {
    history.goBack();
  };

  return (
    <Container>
      <Card>
        <Card.Header>Movie Details</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Title: {selectedMovie.Title}</ListGroup.Item>
          <ListGroup.Item>Director: {selectedMovie.Director}</ListGroup.Item>
          <ListGroup.Item>Release Year: {selectedMovie.Year}</ListGroup.Item>
          <ListGroup.Item>Plot: {selectedMovie.Plot}</ListGroup.Item>
        </ListGroup>
      </Card>
      <Button
        onClick={() => {
          recordRating("upRatings");
        }}
      >
        Thumbs Up
      </Button>
      <Button
        onClick={() => {
          recordRating("downRatings");
        }}
      >
        Thumbs Down
      </Button>
      <Button variant="outline-success" onClick={returnToSearch}>
        Return To Search
      </Button>
    </Container>
  );
};

export default SingleMovieData;
