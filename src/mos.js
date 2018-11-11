// Running JQuery
$(document).ready(function() {
  var path = window.location.origin
  // Reverse string
  var word = "hello"
  var reverse = function(word){
    var rev = word.split('').reverse().join('')
    return  $('.cnccAnswer').append(rev)
  }
  reverse(word)

  
  // Star Rating Options
  $('input[type=radio]').click(function(e){
    $('div.stars_wrapper > p > span').text(e.target.value)
  })
  
  // Collect Tweets
  // Get Request using twitter API
  var getTweetsOnLoad = function() {
    return getTweets()
  }

  var getTweets = function() {
    $.ajax({
      url: `${path}/tweets`,
      type: 'GET',
      success: function(data){ 
        showTweets(data, 'new')
      },
      error: function(error) {
        console.log(error)
      }
    });
  }

  // update Tweets periodically    
  var showTweets = function(tweets, query) { 
    if (!$('.newyorkcomiccon').length){
      $('p:contains("NYCC is coming!")').after('<ul class="newyorkcomiccon"><strong>Latest #nycc2016 & #newyorkcomiccon Tweets</strong><br /><br /><br /></ul>')
    } else {
      $('.newyorkcomiccon > li').remove()
    }
    tweets.statuses.forEach(tweet => {
      $('.newyorkcomiccon').append('<li>' + tweet.text + '</li>')
    });
  }

  getTweetsOnLoad()
  setInterval(getTweets, 60000)
}); // Ending document.ready();