import React from "react";
import moment from "moment";
import Finance from './Finance';

const Finances = ({ data }) => {
  const [
    dem,
    rep,
    demCommittee,
    repCommittee,
  ] = data;
  return (
  <div className="card py-4">
    <div className="row">
      <div className="col-12 col-sm-6">
        <Finance candidateInfo={dem} committeeInfo={demCommittee}></Finance>
      </div>
      <div className="col-12 col-sm-6">
        <Finance candidateInfo={rep} committeeInfo={repCommittee}></Finance>
      </div>
    </div>
  </div>
  )
};

export default Finances;
