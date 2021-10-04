import React from "react";
import { useSelector } from "react-redux";
import { getAllMovies, getAllShows } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";

const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);
  let renderMovies,
    renderShows = "";
  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, idx) => <MovieCard key={idx} data={movie} />)
    ) : (
      <div className="movies-error">
        <h3>{movies.error}</h3>
      </div>
    );

  renderShows =
    shows.Response === "True" ? (
      shows.Search.map((show, idx) => <MovieCard key={idx} data={show} />)
    ) : (
      <div className="shows-error">
        <h3>{shows.error}</h3>
      </div>
    );

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">123}</div>
        <div className="movie-container">{renderMovies}</div>
      </div>
      <div className="show-list">
        <h2>Shows</h2>
        <div className="movie-container">{renderShows}</div>
        <div className="movie-container">11231</div>
      </div>
    </div>
  );
};

export default MovieListing;
