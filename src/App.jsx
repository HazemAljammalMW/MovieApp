import { use, useEffect } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import MovieCard from "./components/MovieCard";
import { useGlobalState, } from "./global/GlobalProvider";
import {TrendingSection} from "./components/TrendingSection";
import { updateSearchCount,getTrendingMovies } from "./appwrite";

const API_BASE_URL =
  "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    },delay);
    return () =>{
      clearTimeout(handler);
    }
  }, [value, delay]);

  return debouncedValue;

}
function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const { globalSearchValue } = useGlobalState();
  const debouncedSearchTerm = useDebounce(globalSearchValue, 500);
  

  const fetchMovies = async (query ='') => {
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, options);
      if (!response.ok) {
        toast.error(data.error || "An error occurred while fetching data");
      }
      const data = await response.json();
      if(data.response === 'False') {
        toast.error(data.error || "An error occurred while fetching data");
        setMovies([]);
        return;
      }
      setMovies(data.results|| []);
      if(query && data.results.length > 0){
      await updateSearchCount(query,data.results[0]);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching data");
    }finally {
      setLoading(false);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    }
    catch(err){
      console.error(err);
      toast.error("An error occurred while fetching trending movies");

    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  },[debouncedSearchTerm] );

  useEffect(() => {
    fetchTrendingMovies();
  }
  ,[]);
  return (
    <>
        <div className="wrapper">
          <Header />
          <ToastContainer />
          <h2>Trending</h2>
          <div className="trending">
          <ul>
            {trendingMovies.map((movie,index) => (
              <TrendingSection key={movie.movie_id} movie={movie} number={index +1} />
            ))}
          </ul>
          </div>
          <div className="all-movies">
            {debouncedSearchTerm != ''  ? (
              <h2>Search Results for: {debouncedSearchTerm}</h2>
            ) : (
              <h2>All Movies</h2>
            )}
            
            <ul>
            {loading ? (
              <h1>Loading...</h1>
            ) : movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <h1 className="text-center">No movies</h1>
            )}
            </ul>
          </div>
        </div>
    </>
  );
}

export default App;
