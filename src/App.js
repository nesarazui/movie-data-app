import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieSearch from "./components/MovieSearch";
import MovieRatings from "./components/MovieRatings";
import SingleMovieData from "./components/SingleMovieData";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <MovieSearch />
          </Route>
          <Route path="/movieRatings">
            <MovieRatings />
          </Route>
          <Route path="/singleMovie/">
            <SingleMovieData />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
