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

  var getTweets = function(){
    $.ajax({
      url: `${path}/tweets`,
      type: 'GET',
      success: function(data){ 
        console.log(data)
        showTweets(data)
      },
      error: function(error) {
          console.log(error)
      }
    });
  }

  // update Tweets periodically    
  var showTweets = function(tweets){
    if (!$('.tweets').length){
      $('p:contains("NYCC is coming!")').after('<ul class="tweets"></ul>')
    } else {
      $('.tweets > li').remove()
    }
    tweets.statuses.forEach(tweet => {
      $('.tweets').append('<li>' + tweet.text + '</li>')
    });
  }

  getTweetsOnLoad()
  setInterval(getTweets, 5000)
}); // Ending document.ready();