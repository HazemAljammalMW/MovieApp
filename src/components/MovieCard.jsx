import PropTypes from 'prop-types';
import "../App.css";
import Genre from "./Genre";

const MovieCard = ({ movie: { poster_path, title, vote_average, genre_ids } }) => {
  return (
    <div className='movie-card'>
      <img 
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
        alt={title}
      />
      <h3>{title}</h3>
      <div className='content'>
        <div className='rating'>
          <img src="../../public/star.svg" alt="star" />
          <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
        <span>•</span>
        <span className='genre'  >
        <Genre style={{ fontSize: '2px !important' }} genre_ids={genre_ids} />
        </span>
        </div>

      </div>

    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default MovieCard;