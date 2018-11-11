require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios')
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'src')))

app.get('/tweets', function(req, res) {

  axios.get('https://api.twitter.com/1.1/search/tweets.json?q=nycc2016&src=typd', { headers: { Authorization: process.env.BEARER_TOKEN }})
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      console.log(error)
    })
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})