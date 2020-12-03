import logo from "./logo.svg";
import "./App.css";
import MovieSearch from "./Components/MovieSearch";
import MovieRatings from "./Components/MovieRatings";

function App() {
  return (
    <div className="App">
      <MovieSearch />
      <MovieRatings />
    </div>
  );
}

export default App;
