import React from 'react';
import Tweet from './Tweet';
import uuid from 'uuid/v1';

const Tweets = ({ tweets }) => {
    const generateList = function(tweets) {
        return tweets.map(tweet => <Tweet key={uuid()} tweet={tweet}></Tweet>);
    };

    return (
        <ul className="list-group border-top-0">
            { generateList(tweets) }
        </ul>
    );
};

export default Tweets;