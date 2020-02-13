import React from 'react';
import Movie from '../Movie/Movie';

const MovieList = ({
    movieList,
    page
}) => {
    return (
        <div className="movie-list">
            {movieList.map((movie, i) => <Movie key={movie.id+page+i+''} movie={movie} />)}
        </div>
    )
}

export default MovieList;