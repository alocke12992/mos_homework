require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios')
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'src')))

const getTweets = function(req, res) {
  let query = req.params.hashtag

  axios.get(`https://api.twitter.com/1.1/search/tweets.json?q=${query}&src=typd`, { headers: { Authorization: process.env.BEARER_TOKEN }})
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      console.log(error)
    })
}
// get Tweets
app.get('/tweets/:hashtag', getTweets)
app.get('/robots.txt', function (req, res) {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: /");
});


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})