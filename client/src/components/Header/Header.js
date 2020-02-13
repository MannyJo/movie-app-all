import React, { useState, useEffect } from 'react';
import {
    Link,
} from 'react-router-dom';
import SearchBtn from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button';
import Movie from '@material-ui/icons/Movie';
import ListIcon from '@material-ui/icons/List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Header = ({ title, setTitle, dispatch, setPage, DEFAULT_PAGE, token, setToken }) => {

    useEffect(() => {
        setToken(window.sessionStorage.getItem('token'));
        return () => {
            setToken('')
        }
    }, [ window.sessionStorage.getItem('token') ])
  
    const handleChange = () => e => {
        setTitle(e.target.value);
    }
  
    const handleSearchBtn = () => e => {
        e.preventDefault();
        setPage(DEFAULT_PAGE);
        dispatch({ type: 'SEARCH_WITH_TITLE', payload: { title } });
    }

    const signOut = () => {
        window.sessionStorage.removeItem('token');
        setToken('');
    }

    return (
        <div className="sticky">
            <div className="nav-bar">
                <div className="logo">
                    <Link to="/" onClick={() => setPage(DEFAULT_PAGE)}>
                        <Movie style={{ fontSize: 40, color: 'gold' }} /> 
                        <div>My Movie</div>
                    </Link>
                </div>
                <div>
                    <form className="search-form" onSubmit={handleSearchBtn()}>
                        <input 
                            className="search-box" 
                            type="text" 
                            value={title} 
                            onChange={handleChange()} 
                            placeholder="Search by movie title" 
                        />
                        <button className="search-btn" type="submit">
                            <SearchBtn style={{ fontSize: 30, color: '#000', opacity: 0.5 }} />
                        </button>
                    </form>
                </div>
                <div className="empty-space"></div>
                <div className="login-btn-container">
                    {
                        token === '' || token === null || token === undefined?
                        <Button variant="contained" color="secondary">
                            <Link to="/auth" className="login-btn">Login</Link>
                        </Button>
                        :
                        <div className="header-btn-list">
                            <button className="watchlist-btn">
                                <Link to="/watchlist"><ListIcon /> Watchlist</Link>
                            </button>
                            <button className="signout-btn" onClick={signOut}>
                                <ExitToAppIcon /> Sign Out
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;