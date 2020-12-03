import React, { useState, useCallback } from 'react'
import { Form, Button } from 'react-bootstrap'
import DisplayMovieTitles from './DisplayMovieTitles'
import axios from 'axios'

//This function component renders a search bar where a user can type in the title of a movie.
//Rather than use a class component to handle user input through a form, the useState React Hook is used.
const MovieSearch = () => {
    const [searchState, setSearchState] = useState({title: '', titleResults: []})

    const handleChange = (event) => {
        setSearchState({...searchState, title: event.target.value})
        let nextValue = event.target.value
        debouncedRequestOMDBAPI(nextValue);
    }

    const debounce = (callback, time) => {
        let timeoutPointer;
        return () => {
            const context = this;
            clearTimeout(timeoutPointer);
            timeoutPointer = setTimeout(callback.bind(context), time)       
        }
    }

    const requestOMDBAPI = (nextValue) => {
        console.log('making request!')
      axios.request(`http://www.omdbapis.com/?i=tt3896198&apikey=6befe58e&s=${nextValue}`).then(function (response) {
          const movieInfo = response.data.Search
          console.log('did we get the movie info: ', movieInfo)
          //setSearchState({...searchState, titleResults: movieInfo})
      }).catch(function (error) {
          console.error(error);
      });
      //setSearchState({...searchState, title: ''})
    }

    const debouncedRequestOMDBAPI =  useCallback(debounce( (nextValue) => requestOMDBAPI(nextValue),1000),[]);

    //Renders the search bar and calls the DisplayMovieTitles component, passing the titleResults (array of objects) as a prop to the component.
    return(
        <div>
          <Form>
              <Form.Label>Search IMDB</Form.Label>
              <Form.Control type="text" placeholder="search" value={searchState.title} onChange={handleChange} />
              {/* <Button type="submit"> Submit </Button> */}
              {/* <Form.Text className="text-muted">
                  Search for a movie to find more information 
              </Form.Text> */}
          </Form>
          <DisplayMovieTitles titleResults={searchState.titleResults}/>
        </div>
    )
}

export default MovieSearch;


