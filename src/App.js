import MovieCardComponent from "./components/MovieCard";
import SearchComponent from "./components/Search";
import { useState } from "react";

function App() {
  const [movie, setMovie] = useState("");

  return (
    <div className="App">
      <SearchComponent movie={movie} onChange={setMovie} />
      <MovieCardComponent movie={movie} />
    </div>
  );
}

export default App;
