import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

/* This component renders the search results returned from the OMDBAPI database (the results are stored in an array of objects passed down via props from the MovieSearch component). Using conditional rendering, the component displays 'No Movie Results to Display" if the array
is empty. Each movie displayed is clickable, and navigates to the singleMovie page via Link, with both the movie data and pathname being passed through as an object.
 */

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
                  <ListGroup className="my-2 text-secondary">
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
