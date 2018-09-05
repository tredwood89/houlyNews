import React, { Component } from 'react';
import uuid from 'uuid/v1';

class Facebook extends Component {

componentDidMount(){
  function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.1&appId=2086160541701092&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk')
}

  render(){

    return(
      <div>
        <div id="fb-root"></div>


      </div>
    )
  }
}

export default Facebook
