import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieParam } from '../../config';
import { MOVIE_DB_IMAGE_URL } from '../../api/movieApi';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { serverAxios, movieApiAxios } from '../../axios';
import bgImg from '../../no-image.png';

const Detail = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState({});
    const [watchlistBtn, setWatchlistBtn] = useState('');

    useEffect(() => {
        movieApiAxios.get(`/movie/${id}`, { params: movieParam })
        .then(results => {
            setDetail(results.data);
        }).catch(err => {
            console.error('Error with getting movie detail :', err);
        });

        if(window.sessionStorage.token) {
            serverAxios.get(`/api/watchlist/${id}`)
            .then(results => {
                if(results.data.is_exist === true) {
                    setWatchlistBtn('exist')
                }
            }).catch(err => {
                console.error('Error with getting watchlist status :', err);
            });
        }
    }, [ id ])

    const numberToMoney = moneyStr => {
        if(moneyStr) {
            let money = Number.parseInt(moneyStr);
            return '$' + money.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
        return '$0';
    }

    const addToMyWatchlist = movie_id => e => {
        serverAxios.post(`/api/watchlist/add/`, { movie_id })
        .then(results => {
            if(results.data.is_added === true) {
                setWatchlistBtn('exist');
            }
        }).catch(err => {
            if(err.response.status === 401) {
                window.location.pathname = '/auth'
            } else {
                console.error('Error with putting this movie to my watchlist :', err);
            }
        });
    }

    const removeFromMyWatchlist = id => e => {
        serverAxios.delete(`/api/watchlist/remove/${id}/`)
        .then(results => {
            if(results.data.is_deleted === true) {
                setWatchlistBtn('');
            }
        }).catch(err => {
            if(err.response.status === 401) {
                window.location.pathname = '/auth'
            } else {
                console.error('Error with putting this movie to my watchlist :', err);
            }
        });
    }

    return (
        <div className="movie-detail-container">
            <div className="movie-detail-img">
                {
                    detail.poster_path === null ?
                    <img src={bgImg} alt="no image" />:
                    <img src={MOVIE_DB_IMAGE_URL.small+detail.poster_path} alt={detail.title} />
                }
            </div>
            <div className="movie-detail-info">
                <div className="movie-detail-basic-info">
                    <div className="movie-detail-rate">
                        {detail.vote_average}
                    </div>
                    <div className="movie-detail-title">
                        {detail.title}
                    </div>
                    <p>
                        {detail.tagline}
                    </p>
                    <div>
                        <button 
                            onClick={watchlistBtn === 'exist' ? removeFromMyWatchlist(detail.id) : addToMyWatchlist(detail.id)} 
                            className={`movie-detail-watchlist-btn ${watchlistBtn}`}
                        >
                            <BookmarkBorderIcon />
                            {
                                watchlistBtn === 'exist' ?
                                <span>Remove from my Watchlist</span>:
                                <span>Add to my Watchlist</span>
                            }
                        </button>
                    </div>
                    <p className="movie-detail-overview">
                        {detail.overview}
                    </p>
                    <div>
                        {
                            detail.genres && 
                            <span>
                                Genres : {detail.genres.map(genre => <span className="movie-detail-genre" key={genre.id}>{genre.name}</span>)}
                            </span>
                        }
                    </div>
                </div>
                <div className="movie-detail-add-info">
                    <div>
                        Release Date : {detail.release_date}
                    </div>
                    <div>
                        Runtime : {detail.runtime} mins
                    </div>
                    <div>
                        Budget : {numberToMoney(detail.budget)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;