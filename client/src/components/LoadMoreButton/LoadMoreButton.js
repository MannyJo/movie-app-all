import React from 'react';
import Button from '@material-ui/core/Button';

const LoadMoreButton = ({ loadMore }) => {
    return (
        <div className="load-more-btn-container">
            <Button className="load-more-btn" onClick={loadMore}>Load More</Button>
        </div>
    )
}

export default LoadMoreButton;