import React from 'react';
import './Rank.css';

const Rank = ({name,entries}) => {
    return(
        <div className="rank">
            <div className="rank-h">
                {`${name}, your current entry count is...`}
            </div>
            <div className="rank-n">
                {entries}
            </div>
        </div>
    );
}

export default Rank;