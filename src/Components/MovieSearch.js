import React, { useState, useCallback } from "react";
import { Form, Container } from "react-bootstrap";
import DisplayMovieTitles from "./DisplayMovieTitles";
import axios from "axios";
import { debounce } from "lodash";

//This function component renders a search bar where a user can type in the title of a movie.
//Rather than use a class component to handle user input through a form, the useState React Hook is used.
const MovieSearch = () => {
  const [searchState, setSearchState] = useState({
    title: "",
    titleResults: [],
  });

  const handleChange = (event) => {
    let nextValue = event.target.value;
    setSearchState({ ...searchState, title: nextValue });
    debouncedRequestOMDBAPI(nextValue);
  };

  const requestOMDBAPI = async (nextValue) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=tt3896198&apikey=6befe58e&s=${nextValue}`
      );
      const movieInfo = response.data.Search;
      setSearchState({ ...searchState, titleResults: movieInfo });
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedRequestOMDBAPI = useCallback(
    debounce((nextValue) => requestOMDBAPI(nextValue), 1000),
    []
  );

  //Renders the search bar and calls the DisplayMovieTitles component, passing the titleResults (array of objects) as a prop to the component.
  return (
    <Container>
      <Form>
        <Form.Label column="lg">Search For A Movie</Form.Label>
        <Form.Control
          column="lg"
          type="text"
          placeholder="Search"
          value={searchState.title}
          onChange={handleChange}
        />
      </Form>
      <DisplayMovieTitles titleResults={searchState.titleResults} />
    </Container>
  );
};

export default MovieSearch;
