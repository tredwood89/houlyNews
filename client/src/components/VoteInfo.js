import React from 'react';
import Vote from './Vote';
import uuid from 'uuid/v1';

const VoteInfo = ({ votes }) => {
    const voteDivs = votes.map(voteInfo =><Vote key={uuid()} vote={voteInfo}></Vote>);

    return (
    <ul className="list-group">
        {/* <a href="https://www.govtrack.us/congress/members/david_brat/412605" target="_blank">
            <button className="btn btn-danger">GovTrack</button>
        </a> */}
            {voteDivs}
    </ul>
)
};

export default VoteInfo;