require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios')
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'src')))

const getTweets = function(req, res) {
  axios.get(`https://api.twitter.com/1.1/search/tweets.json?q=%23newyorkcomiccon%20OR%20%23nycc2016&result_type=recent&src=typd`, { headers: { Authorization: process.env.BEARER_TOKEN }})
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      console.log(error)
    })
}
// get Tweets
app.get('/tweets', getTweets)
app.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: /");
});


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})