require('dotenv').config();

const fs = require('fs');
const https = require('https');
const P = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const twitterAPI = require('node-twitter-api');

const {
  PropublicaApiKey,
  NewsApiKey,
  TwitterConsumerKey,
  TwitterConsumerSecret,
  TwitterAccessToken,
  TwitterAccessTokenSecret,
  PORT,
} = process.env;

const twitter = new twitterAPI({
  consumerKey: TwitterConsumerKey,
  consumerSecret: TwitterConsumerSecret,
});

const staticFiles = express.static(path.join(__dirname, '../client/build'))

const app = express();

app.use(staticFiles)

app.use(express.static(path.join(__dirname, '/client')));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



app.get('/propublica', function (req, res) {
  const id = req.query.id;
  axios({
    method: 'get',
    url: `https://api.propublica.org/congress/v1/members/${id}/votes.json`,
    headers: {
      'x-api-key': PropublicaApiKey,
    }
  }).then(function (response) {
    res.send(response.data.results[0].votes);
  });
});

app.get('/propublica/finance', function (req, res) {
  const {
    dem: demId,
    rep: repId,
    demCommittee: demCommitteeId,
    repCommittee: repCommitteeId,
  } = req.query;
  const demInfo = axios({
    method: 'get',
    url: `https://api.propublica.org/campaign-finance/v1/2018/candidates/${demId}.json`,
    headers: {
      'x-api-key': PropublicaApiKey,
    },
  });
  const repInfo = axios({
    method: 'get',
    url: `https://api.propublica.org/campaign-finance/v1/2018/candidates/${repId}.json`,
    headers: {
      'x-api-key': PropublicaApiKey,
    },
  });
  const demCommitteeInfo = axios({
    method: 'get',
    url: `https://api.propublica.org/campaign-finance/v1/2018/committees/${demCommitteeId}.json`,
    headers: {
      'x-api-key': PropublicaApiKey,
    },
  });
  const repCommitteeInfo = axios({
    method: 'get',
    url: `https://api.propublica.org/campaign-finance/v1/2018/committees/${repCommitteeId}.json`,
    headers: {
      'x-api-key': PropublicaApiKey,
    },
  });
  P.all([
    demInfo,
    repInfo,
    demCommitteeInfo,
    repCommitteeInfo,
  ])
  .then(function (response) {
    const [dem, rep, demCommittee, repCommittee] = response;
    res.send([
      dem.data.results[0],
      rep.data.results[0],
      demCommittee.data.results[0],
      repCommittee.data.results[0],
    ]);
  });
});

app.get('/newsApi', function (req, res) {
  const query = req.query.q;
  axios({
    method: 'get',
    url: `https://newsapi.org/v2/everything?q=${query}&pageSize=100&sortBy=publishedAt`,
    headers: {
      'x-api-key': NewsApiKey,
    },
  }).then(function (response) {
    res.send(response.data.articles);
  });
});

app.get('/twitter/timeline', function (req, res) {
  const username = req.query.u;
  twitter.getTimeline("user", {
      count: 100,
      include_rts: true,
      exclude_replies: false,
      screen_name: username,
    },
    TwitterAccessToken,
    TwitterAccessTokenSecret,
    function (error, data, response) {
      if (error) {
        console.error(error);
      } else {
        res.send(data);
      }
    }
  );
});

app.use('/*', staticFiles);

app.listen(PORT, () => console.warn(`Listening on http://localhost:${PORT}`));