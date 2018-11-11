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
      url: `${path}/tweets/nycc2016`,
      type: 'GET',
      success: function(data){ 
        showTweets(data, 'nycc2016')
      },
      error: function(error) {
        console.log(error)
      }
    });

    $.ajax({
      url: `${path}/tweets/newyorkcomiccon`,
      type: 'GET',
      success: function(data){ 
        showTweets(data, 'newyorkcomiccon')
      },
      error: function(error) {
          console.log(error)
      }
    })
  }

  // update Tweets periodically    
  var showTweets = function(tweets, query) { 
    if (!$(`.${query}`).length){
      $('p:contains("NYCC is coming!")').after(`<ul class="${query}"><strong>Latest #${query} Tweets</strong><br /><br /><br /></ul>`)
    } else {
      $(`.${query} > li`).remove()
    }
    tweets.statuses.forEach(tweet => {
      $(`.${query}`).append('<li>' + tweet.text + '</li>')
    });
  }

  getTweetsOnLoad()
  setInterval(getTweets, 50000)
}); // Ending document.ready();