import React, { Component } from 'react';
import App from '../App';
import login from '../log'



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
    let userInput = this.state.usercode
    if (userInput === login.usercode){
      this.setState({
        loggedIn:true
      })
    } else {
      alert('Incorrect password')
    }
      event.preventDefault()
  }


  loginForm = () => {
      return (
        <form onSubmit={this.submitLogin}>
          <div>
            <input type="password" name="passcode" placeholder="passcode"  onChange={this.handleChange} />
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
