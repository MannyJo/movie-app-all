import React, { useState, useEffect } from 'react';
import { movieApiAxios as axios } from '../../axios';
import { movieParam } from '../../config';
import MovieList from '../MovieList/MovieList';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import SearchCategory from '../SearchCategory/SearchCategory';

const Main = ({ searchText, setTitle, dispatch, page, setPage, DEFAULT_PAGE }) => {
    const DEFAULT_CATEGORY = 'popular';
    const [category, setCategory] = useState(DEFAULT_CATEGORY);
    const [totalPages, setTotalPages] = useState(DEFAULT_PAGE);
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        if(searchText) {
            getMovies('search');
        } else {
            getMovies();
        }
    }, [ category, searchText, page ])

    const getMovies = filter => {
        let path = '';
        let config = {
            params: {
                ...movieParam,
                page
            }
        };

        if(filter === 'search' && searchText.length > 0) {
            path = '/search/movie';
            config.params = {
                ...config.params,
                query: searchText
            }
        } else {
            path = `/movie/${category}`;
        }

        axios.get(path, config)
        .then(results => {
            if(totalPages !== results.data.total_pages)
                setTotalPages(results.data.total_pages);
            if(page === 1) {
                setMovieList(results.data.results);
            } else {
                setMovieList([ ...movieList, ...results.data.results ]);
            }
        }).catch(err => {
            console.log('Error with getting movies :', err);
        });
    }

    const handleClickCategory = filter => e => {
        dispatch({ type: 'SEARCH_TITLE_RESET' });
        setTitle('');
        setPage(DEFAULT_PAGE);
        setCategory(filter || DEFAULT_CATEGORY);
    }

    const loadMore = () => {
        if(totalPages >= page+1) {
            setPage(page+1);
        }
    }

    return (
        <div className="main-container">
            <SearchCategory handleClick={handleClickCategory} />
            <MovieList movieList={movieList} />
            <LoadMoreButton loadMore={loadMore} />
        </div>
    );
}

export default Main;