var fs = require("fs");

function getRecordsFromFile(filename, cb) {
  fs.readFile(filename, "utf8", function(err, data) {
    if (err)  {
      console.log("---Error---");
      console.log(err);
      return;
    }
    var records = data.split("\n"); //Is this split on newlines to make it an array?
    // console.log(records);
    cb(records);
  });
}



function recordWord(record) {
  var recordWord = (record.split(" ")[2]).split("=")[1];

  return recordWord.toLowerCase();
}


function wordRating(record) {
  return ((record.split(" ")[5]).split("=")[1]);
  // var rating = (record.split(" ")[5]).split("=")[1];
  // if (rating === "positive") {
  //   return true;
  // }
  // return false;
}




function detectSentiment(filename, sentence, cb) {

  getRecordsFromFile(filename, function(records) {

    var sentenceWords = sentence.toLowerCase().split(" ");
    var score = 0;

    records.forEach(function(record) {
      // if (!record) {       //what is this part about
      //   return;
      // }

      var word = recordWord(record);
      var rating = wordRating(record);

      if (sentenceWords.indexOf(word) !== -1) {
        if (rating === "positive") {
            score += 1;
        } else if (rating === "negative") {
            score -=1;
        }
      }
    });


      cb(sentence, score);
  });

}


detectSentiment("sentimentDict.txt", "I love you", function(sentence, score) {
  console.log("~~~~Example 1~~~~");
  console.log(" ' " + sentence + " ' "  + " has a score of " + score + ".");
});

detectSentiment("sentimentDict.txt", "I LOVE you so much", function(sentence, score) {
  console.log("~~~~Example 2~~~~");
  console.log(" ' " + sentence + " ' "  + " has a score of " + score + ".");
});

detectSentiment("sentimentDict.txt", "You are a loveless fool", function(sentence, score) {
  console.log("~~~~Example 3~~~~");
  console.log(" ' " + sentence + " ' "  + " has a score of " + score + ".");
});

detectSentiment("sentimentDict.txt", "I cherish your smile", function(sentence, score) {
  console.log("~~~~Example 4~~~~");
  console.log(" ' " + sentence + " ' "  + " has a score of " + score + ".");
});

var sentence = "I despise your hateful attitude";
detectSentiment("sentimentDict.txt", sentence, function(sentence, score) {
  console.log("~~~~Example 5~~~~");
  console.log(" ' " + sentence + " ' "  + " has a score of " + score + ".");
});
