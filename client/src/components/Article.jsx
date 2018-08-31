import React from "react";
import moment from "moment";

const Article = ({ article }) => (
  <li className="article list-group-item">
    <div className="row">
      <div className="col-4">
        <a href={article.url} target="_blank">
          <img
            className="article-img"
            alt="Article Img"
            src={article.urlToImage}
          />
        </a>
        <p className="text-ellipsis"> {article.source.name} </p>
        <p> {moment(article.publishedAt).format("dddd, MMMM Do")} </p>
      </div>
      <div className="col-8">
        <p>
          <a href={article.url} target="_blank">
            {article.title}
          </a>
        </p>
        <p>{article.description}</p>
      </div>
    </div>
  </li>
);

export default Article;
