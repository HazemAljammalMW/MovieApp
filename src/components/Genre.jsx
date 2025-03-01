import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const API_BASE_URL = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const API_KEY = import.meta.env.VITE_API_KEY;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
};

const Genre = ({ genre_ids }) => {
  const [genres, setGenres] = useState([]);
  const [genreNames, setGenreNames] = useState('');

  const fetchIds = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}`, options);
      const data = await response.json();
      if (!response.ok) {
        throw new Error("An error occurred while fetching data");
      }
      setGenres(data.genres);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchIds();
  }, []);

  useEffect(() => {
    if (genres.length > 0) {
      const names = genres
        .filter((genre) => genre_ids.includes(genre.id))
        .slice(0, 3) // Limit to a maximum of 3 genres
        .map((genre) => genre.name)
        .join(', ');
      setGenreNames(names);
    }
  }, [genres, genre_ids]);


  return (
    <>
        {genreNames}
    </>
  );
};

Genre.propTypes = {
  genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Genre;