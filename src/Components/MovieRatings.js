import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";

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
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Thumbs Up</th>
            <th>Thumbs Down</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((movieObj) => {
            return (
              <tr key={movieObj.imdbID}>
                <td>{movieObj.title}</td>
                <td>{movieObj.upRatings}</td>
                <td>{movieObj.downRatings}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default MovieRatings;

//  {/* <div key={movieObj.imdbID}>
//     <div>Title: {movieObj.title}</div>
//     <div>Thumbs Up: {movieObj.upRatings}</div>
//     <div>Thumbs Down: {movieObj.downRatings}</div>
//   </div> */}
