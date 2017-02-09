var fs = require("fs");

function getRecordsFromFile(filename, cb) {
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) {
      console.log("---Error---");
      console.log(err);
      return;
    }

    var records = data.split("\n");

    cb(records);
  })
}

function parseWord(record) {
  var wordRecord = record.split(" ")[2];
  return wordRecord.split("=")[1];
}

function parseSentiment(record) {
  var sentimentRecord = record.split(" ")[5];
  return sentimentRecord.split("=")[1];
}

function detectSentiment(filename, sentence, cb) {
  getRecordsFromFile(filename, function(records) {
    var score = 0;
    var splitSentence = sentence.toLowerCase().split(" ");

    records.forEach(function(record) {
      if (!record) {
        return;
      }

      var word = parseWord(record).toLowerCase();
      var sentiment = parseSentiment(record);

      if (splitSentence.indexOf(word) !== -1) {
        if (sentiment === "negative") {
          score -= 1;
        } else if (sentiment === "positive") {
          score += 1;
        }
      }
    });

    cb(sentence, score);
  });
}

detectSentiment("sentimentDict.txt", "I love you", function(sentence, score) {
  console.log("~~~~Example 1~~~~")
  console.log("'" + sentence + "' has a score of " + score + ".");
});

detectSentiment("sentimentDict.txt", "I LOVE you so much", function(sentence, score) {
  console.log("~~~~Example 2~~~~")
  console.log("'" + sentence + "' has a score of " + score + ".");
});

detectSentiment("sentimentDict.txt", "You are a loveless fool", function(sentence, score) {
  console.log("~~~~Example 3~~~~")
  console.log("'" + sentence + "' has a score of " + score + ".");
});

detectSentiment("sentimentDict.txt", "I cherish your smile", function(sentence, score) {
  console.log("~~~~Example 4~~~~")
  console.log("'" + sentence + "' has a score of " + score + ".");
});

var sentence = "I despise your hateful attitude";
detectSentiment("sentimentDict.txt", sentence, function(sentence, score) {
  console.log("~~~~Example 5~~~~")
  console.log("'" + sentence + "' has a score of " + score + ".");
});
