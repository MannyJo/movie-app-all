import React, { useState, useEffect } from 'react';
import { movieApiAxios, serverAxios } from '../../axios';
import { movieParam } from '../../config';
import MovieList from '../MovieList/MovieList';

const Watchlist = () => {
    const path = window.location.pathname;
    const [watchlist, setWatchlist] = useState([]);
    const [movies, setMovies] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        serverAxios.get('/api/watchlist/')
        .then(results => {
            setWatchlist(results.data.movies);
            setCount(results.data.count);
        }).catch(err => {
            console.error('Error with getting watchlist :', err);
        });
    }, [ path ])

    useEffect(() => {
        const tmpMovies = [];
        const axiosList = watchlist.map(movie => movieApiAxios.get(`/movie/${movie.movie_id}`, { params: movieParam }));
        Promise.all(axiosList)
        .then(results => {
            for(const result of results) {
                tmpMovies.push(result.data)
            }
            setMovies(tmpMovies);
        }).catch(err => {
            console.error('Error with getting movies :', err);
        });
    }, [ watchlist ])

    return (
        <div className="watchlist-container">
            <h2 className="watchlist-title">Watchlist ({count})</h2>
            {
                count === 0 ?
                <div>
                    <p>No watchlist</p>
                </div> :
                <MovieList movieList={movies} />
            }
        </div>
    )
}

export default Watchlist;