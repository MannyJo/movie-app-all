import React from 'react';

const SearchCategory = ({ handleClick }) => {
    return (
        <div className="category-btn">
            <button onClick={handleClick('popular')}>Popular</button>
            <button onClick={handleClick('now_playing')}>Now Playing</button>
            <button onClick={handleClick('top_rated')}>Top Rated</button>
            <button onClick={handleClick('upcoming')}>Upcoming</button>
        </div>
    )
}

export default SearchCategory;