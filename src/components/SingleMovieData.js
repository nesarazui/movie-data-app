import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router";
import { Container, Button, Card, ListGroup } from "react-bootstrap";

/* This component retrieves the movie data object sent via Link from the DisplayMovieTitles component by using useLocation(). A call is made to OMDBAPI (with the match by ID query) using the omdbID from the movie object. The response data includes additional information about the movie, including director, plot, etc). This data gets stored under the 'selectedMovie' state,
which is then used to render the specfic details about the movie: (title, director, release year, plot, etc).
There is also an option to give a 'thumbs up' or 'thumbs down' rating. The rating is coded as upRating/downRating and sent along with the movie object as a POST request to the backend to update the database accordingly.
 */

const SingleMovieData = (props) => {
  const [selectedMovie, setSelectedMovie] = useState({});
  const location = useLocation();
  const history = useHistory();
  const movieObj = location.state.movieObj;

  useEffect(() => {
    const getFullData = async (movieObj) => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=6befe58e&i=${movieObj.imdbID}`
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
      await axios.post(
        "https://movie-data-app-server.herokuapp.com/movieData/",
        {
          ratingType,
          selectedMovie,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const returnToSearch = () => {
    history.goBack();
  };

  return (
    <Container>
      <Card className="mt-5 mb-3">
        <Card.Header>
          <b>Rate This Movie</b>
          <div className="mt-3 mb-3">
            <Button
              variant="outline-success"
              className="mr-2"
              onClick={() => {
                recordRating("upRatings");
              }}
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-hand-thumbs-up"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"
                />
              </svg>
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => {
                recordRating("downRatings");
              }}
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-hand-thumbs-down"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28v1c.563 0 .901.272 1.066.56.086.15.121.3.121.416 0 .12-.035.165-.04.17l-.354.353.353.354c.202.202.407.512.505.805.104.312.043.44-.005.488l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.415-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.353.352.373.714.267 1.021-.122.35-.396.593-.571.651-.653.218-1.447.224-2.11.164a8.907 8.907 0 0 1-1.094-.17l-.014-.004H9.62a.5.5 0 0 0-.595.643 8.34 8.34 0 0 1 .145 4.725c-.03.112-.128.215-.288.255l-.262.066c-.306.076-.642-.156-.667-.519-.075-1.081-.239-2.15-.482-2.85-.174-.502-.603-1.267-1.238-1.977C5.597 8.926 4.715 8.23 3.62 7.93 3.226 7.823 3 7.534 3 7.28V3.279c0-.26.22-.515.553-.55 1.293-.138 1.936-.53 2.491-.869l.04-.024c.27-.165.495-.296.776-.393.277-.096.63-.163 1.14-.163h3.5v-1H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"
                />
              </svg>
            </Button>
          </div>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <b>Title:</b> {selectedMovie.Title}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Director:</b> {selectedMovie.Director}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Release Year:</b> {selectedMovie.Year}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Plot:</b> {selectedMovie.Plot}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Awards:</b> {selectedMovie.Awards}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Country:</b> {selectedMovie.Country}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Genre:</b> {selectedMovie.Genre}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Cast:</b> {selectedMovie.Actors}
          </ListGroup.Item>
          <ListGroup.Item>
            <img src={selectedMovie.Poster} alt="poster-img" />
          </ListGroup.Item>
        </ListGroup>
      </Card>

      <div className="mt-3 mb-3">
        <Button variant="outline-primary" onClick={returnToSearch}>
          Return To Homepage
        </Button>
      </div>
    </Container>
  );
};

export default SingleMovieData;
