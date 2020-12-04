import React, { useState, useCallback } from "react";
import { Form, Container } from "react-bootstrap";
import DisplayMovieTitles from "./DisplayMovieTitles";
import axios from "axios";
import { debounce } from "lodash";

/* This component renders a search bar where a user can type in the title of a movie in order to pull up matching results from the IMDB database (using the third-party API 'OMDBAPI')
State is handled in this function component using the useState React Hook: "title" (reflects the user input text) and "titleResults" (initially undefined and then updated to an array with the response data).
Within the requestOMDBAPI function, a check is done to ensure that if there are no matching results from the database (response.data.Error)), 'titleResults' will be updated with an empty array.
Debouncing is being utilized to prevent an API call being made on every key stroke.
The DisplayMovieTitles component will only be rendered if there are movie results (titleResults is updated to an array with data, or an empty array) */

const MovieSearch = () => {
  const [searchState, setSearchState] = useState({
    title: "",
    titleResults: undefined,
  });

  const handleChange = (event) => {
    let nextValue = event.target.value;
    setSearchState({ ...searchState, title: nextValue });
    debouncedRequestOMDBAPI(nextValue);
  };

  const requestOMDBAPI = async (nextValue) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=6befe58e&s=${nextValue}`
      );
      if (response.data.Error) {
        setSearchState({ ...searchState, titleResults: [], title: nextValue });
        return;
      }
      const movieInfo = response.data.Search;
      setSearchState({
        ...searchState,
        titleResults: movieInfo,
        title: nextValue,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedRequestOMDBAPI = useCallback(
    debounce((nextValue) => requestOMDBAPI(nextValue), 1000),
    []
  );

  return (
    <Container>
      <Form>
        <Form.Control
          column="lg"
          type="text"
          placeholder="Search For A Movie..."
          value={searchState.title}
          onChange={handleChange}
          className="mt-5 mb-5"
        />
      </Form>
      {searchState.titleResults && (
        <DisplayMovieTitles titleResults={searchState.titleResults} />
      )}
    </Container>
  );
};

export default MovieSearch;
