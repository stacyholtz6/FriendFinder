// linking routes to the data sources
// these data sources hold the array of information from friends.js

const friendsData = require('../data/friends')

module.exports = function (app) {
  app.get('/api/friends', function (req, res) {
    // res.json(friendsData);
    res.send(friendsData);
  });

  app.post('/api/friends', function (req, res) {

    var newFriendScores = req.body.scores;
    var scoresArr = [];

    // loop through the friendsData array
    for (var j = 0; j < friendsData.length; j++) {
      var runningTotal = 0;
      // loop through newFriendsScores & friendsData scores
      for (var i = 0; i < newFriendScores.length; i++) {
        // find the absolute value of each array - compare the absolute values - looking for closest match
        var difference = Math.abs(parseInt(newFriendScores[i]) - parseInt(friendsData[j].scores[i]));
        runningTotal = runningTotal + difference;
      };
      // push to scores array
      scoresArr.push(runningTotal);
    };

    // return data - use spread because Math.min will take the array in as one argument
    var minVal = Math.min(...scoresArr);
    var bestFriendIndex = scoresArr.indexOf(minVal);
    res.json(friendsData[bestFriendIndex])
    friendsData.push(req.body);
  })
};