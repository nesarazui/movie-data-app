import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

//This function component displays the movie search results returned from the OMDB API (data in an array accessed via props). If the array
//is empty, the display is 'no movie results yet'.
//Each movie displayed is clickable, and navigates to the singleMovie page. The data for that particular movie is passed through Link to as an object.

const DisplayMovieTitles = (props) => {
  const titleResults = props.titleResults;

  return (
    <div>
      {titleResults.length ? (
        <div>
          {titleResults.map((movieObj, idx) => {
            return (
              <div key={idx}>
                <Link to={{ pathname: "/singleMovie", state: { movieObj } }}>
                  <ListGroup className="my-2">
                    <ListGroup.Item>
                      <div>{movieObj.Title}</div>
                      <div>{movieObj.Year}</div>
                    </ListGroup.Item>
                  </ListGroup>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div>No Movie Results To Display</div>
      )}
    </div>
  );
};

export default DisplayMovieTitles;
