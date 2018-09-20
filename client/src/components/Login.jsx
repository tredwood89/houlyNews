import React, { Component } from 'react';
import App from '../App';
import axios from 'axios';


class Login extends Component {

  state = {
    'usercode':"",
    'loggedIn':false
  }

  handleChange = (event) => {
    this.setState({
      'usercode':event.target.value
    })
  }


  submitLogin = (event) => {
    event.preventDefault()
    let userInput = this.state.usercode

    this.checkLogin(userInput)
    .then(({data}) => {
      if ( data === 'correct'){
        this.setState({
          loggedIn:true
        })
      } else {
        alert('Incorrect password')
      }
    })

    event.target.reset()
  }

  checkLogin = (input) => {
    return axios({
      method: 'get',
      url: '/pw',
      params: {
        input: input
      },
    });
  }


  loginForm = () => {
      return (
        <form onSubmit={this.submitLogin}>
          <div>
            <input type="password" name="passcode" placeholder="passcode" onChange={this.handleChange} />
          </div>
          <input className="login"type="submit" value="Login"/>
      </form>
    )
  }


  render() {
    return(
      <div>
        { this.state.loggedIn ? <App /> : this.loginForm() }

    </div>
    )
  }

}

export default Login
