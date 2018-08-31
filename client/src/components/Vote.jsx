import React from "react";
import moment from "moment";

const Vote = ({ vote }) => {
  const generateVote = function(position) {
    if (position === "Yes") {
      return (
        <li className="list-group-item bg-success">
          <h5 className="m-0">
            <i className="fas fa-check text-light" />
          </h5>
        </li>
      );
    } else if (position === "No") {
      return (
        <li className="list-group-item bg-danger">
          <h5 className="m-0">
            <i className="fas fa-times text-light" />
          </h5>
        </li>
      );
    }
  };

  const generateResult = function(result) {
    if (result === "Passed") {
      return (
        <li className="list-group-item bg-success">
          <h5 className="m-0 text-light">{result}</h5>
        </li>
      );
    } else if (result.toLowerCase().indexOf('confirmed') > -1) {
      return (
        <li className="list-group-item bg-success">
          <h5 className="m-0 text-light">{result}</h5>
        </li>
      );
    } else if (result.toLowerCase().indexOf('agreed') > -1) {
      return (
        <li className="list-group-item bg-success">
          <h5 className="m-0 text-light">{result}</h5>
        </li>
      );
    } else if (result === "Failed") {
      return (
        <li className="list-group-item bg-danger">
          <h5 className="m-0 text-light">{result}</h5>
        </li>
      );
    } else if (result.toLowerCase().indexOf('rejected') > -1) {
      return (
        <li className="list-group-item bg-danger">
          <h5 className="m-0 text-light">{result}</h5>
        </li>
      );
    } else {
      return (
        <li className="list-group-item bg-warning">
          <h5 className="m-0 text-light">{result}</h5>
        </li>
      );
    }
  };

  return (
    <li className="vote list-group-item position-relative">
      <div className="row">
        <div className="col-6 col-sm-4 col-md-3">
          <ul className="list-group">
            {generateVote(vote.position)}
            {generateResult(vote.result)}
            <li className="list-group-item">
              <div className="row">
                <div className="col-6">
                  <i className="fas text-success fa-thumbs-up" />
                </div>
                <div className="col-6">{vote.total.yes}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-6">
                  <i className="fas text-danger fa-thumbs-down" />
                </div>
                <div className="col-6">{vote.total.no}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-6">
                  <i className="fas text-warning fa-hand-point-right" />
                </div>
                <div className="col-6">{vote.total.present}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col-6">
                  <i className="fas text-dark fa-hand-paper" />
                </div>
                <div className="col-6">{vote.total.not_voting}</div>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-6 col-sm-8 col-md-9 text-left">
          <div className="d-flex flex-wrap justify-content-between">
            <h4 className="text-primary">
              <a
                href={`https://projects.propublica.org/represent/votes/${
                  vote.congress
                }/${vote.chamber}/${vote.session}/${vote.roll_call}`}
                target="_blank"
              >
                {vote.chamber} {vote.roll_call}
              </a>
            </h4>
            <p>{moment(vote.date).format("dddd, MMMM Do")}</p>
          </div>
          <label className="font-weight-bold" for="">Bill number:</label>
          <h4 className="text-primary">{vote.bill.number}</h4>
          <label className="font-weight-bold" for="title">
            Title:
          </label>
          <p>{vote.bill.title}</p>
          <label className="font-weight-bold" for="question">
            Question:
          </label>
          <p>{vote.question}</p>
          <label className="font-weight-bold" for="description">
            Description:
          </label>
          <p>{vote.description}</p>
          <label className="font-weight-bold" for="latest-action">
            Latest Action:
          </label>
          <p>{vote.bill.latest_action}</p>
        </div>
      </div>
    </li>
  );
};

export default Vote;
