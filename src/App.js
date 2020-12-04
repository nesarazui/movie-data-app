import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MovieSearch from "./Components/MovieSearch";
import MovieRatings from "./Components/MovieRatings";
import SingleMovieData from "./Components/SingleMovieData";
import NavBar from "./Components/NavBar";

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
