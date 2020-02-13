import React from 'react';
import { MOVIE_DB_IMAGE_URL } from '../../api/movieApi';
import bgImg from '../../no-image.png';

const Movie = ({ movie }) => {
    return (
        <div className="movie-image-container">
            <a href={`/detail/${movie.id}`}>
                {
                    movie.poster_path === null ?
                    <img src={bgImg} alt="no image" />:
                    <img src={MOVIE_DB_IMAGE_URL.small+movie.poster_path} alt={movie.title} />
                }
                <div className="movie-info">
                    GO DETAIL >
                </div>
            </a>
        </div>
    )
}

export default Movie;