import React from 'react';
import Article from './Article';
import uuid from 'uuid/v1';

const Articles = ({ articles }) => {
    const generateList = function(articles) {
        return articles.map(article => <Article key={uuid()} article={article}></Article>);
    };

    return (
        <ul className="list-group border-top-0">
            { generateList(articles) }
        </ul>
    );
};

export default Articles;