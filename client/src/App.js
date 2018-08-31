import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import config from './config'
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import Tweets from './components/Tweets';
import VoteInfo from './components/VoteInfo';
import Finances from './components/Finances';

class App extends Component {
  constructor() {
    super();
    this.state = {
      config: config,
      data: [],
      query: config.demName,
      display: 'loader',
    };
    this.queryPress = this.queryPress.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.queryFinance = this.queryFinance.bind(this);
    this.queryTwitter = this.queryTwitter.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.displayContent = this.displayContent.bind(this);
    this.queryPropublica = this.queryPropublica.bind(this);
  }

  componentDidMount() {
    this.updateDisplay('Press', 'DEM', config.demName);
  }

  showLoader() {
    this.setState({
      display: 'loader',
    });
  }

  updateDisplay(display, party, query) {
    if (this.state.display === `${display}-${party}`) return null;
    const app = this;
    app.showLoader();
    this['query' + display](query)
    .then(function ({ data }) {
      app.setState({
        data,
        display: `${display}-${party}`,
      });
    });
  }

  queryPropublica(query) {
    return axios({
      method: 'get',
      url: '/propublica',
      params: {
        id: query,
      },
    });
  }

  queryFinance() {
    return axios({
      method: 'get',
      url: '/propublica/finance',
      params: {
        dem: config.demFECId,
        rep: config.repFECId,
        demCommittee: config.demCommitteeFECId,
        repCommittee: config.repCommitteeFECId,
      },
    });
  }

  queryPress(query) {
    return axios({
      method: 'get',
      url: '/newsApi',
      params: {
        q: query,
      },
    });
  }

  queryTwitter(username) {
    return axios({
      method: 'get',
      url: '/twitter/timeline',
      params: {
        u: username,
      },
    });
  }

  updateQuery({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  displayContent(display) {
    const { data } = this.state;
    if (display === 'loader') {
      return (<Loader></Loader>);
    } else if (display.indexOf('Propublica') > -1) {
      return (<VoteInfo votes={ data }></VoteInfo>);
    } else if (display.indexOf('Twitter') > -1) {
      return (<Tweets tweets={ data }></Tweets>);
    } else if (display.indexOf('Press') > -1) {
      return (<Articles articles={ data }></Articles>);
    } else if (display.indexOf('Finance') > -1) {
      return (<Finances data={ data }></Finances>);
    }
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar mb-4 d-flex app-nav-main">
          <a className="navbar-brand interactive">
            <span className="d-none d-sm-block upper">Spanbergregator</span>
            <span className="d-sm-none"><i className="fas fa-star"></i></span>
          </a>
          <form className="input-group w-auto" onSubmit={ target => target.preventDefault() }>
            <input
              name="query"
              className="form-control border-primary"
              placeholder="Free Search"
              onChange={ this.updateQuery }
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                onClick={() => this.updateDisplay('Press', '*', this.state.query)}
                type="submit"
            >
                Search
              </button>
            </div>
          </form>
        </nav>

        <main className="container">
          <Navbar
            config={this.state.config}
            display={this.state.display}
            updateDisplay={this.updateDisplay}
          ></Navbar>

          <div className="content">
            { this.displayContent(this.state.display) }
          </div>
        </main>

        <footer>
          <p className="text-light m-3">
            Made with NewsApi, Propublica
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
