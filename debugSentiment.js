// function detectSentiment(filename, sentence, callback) {
//
//   getRecordsFromFile(filename, function(records) {
//
//     var score = 0;
//     var sentenceWord = sentence.split(" ");
//
//     records.forEach(function(record) {
//       // var wordEntry = records.split(" ");
//
//       var result = record.indexOf("positive");
//
//       if (result !== -1) {
//         score += 1;
//       } else if (result === -1) {
//         score -= 1;
//       }
//
//     });
//       // return score;
//       callback(sentence, score);
//   });
//
// }
// ---
// function detectSentiment(filename, sentence, cb) {
//
//   getRecordsFromFile(filename, function(records) {
//
//     var score = 0;
//     var sentenceWords = sentence.split(" ");
//
//
//     records.forEach(function(record) {
//       var recordArray = record.split(" ");
//
//       for (var i = 0; i < sentenceWords.length; i++) {
//         var recordWord = recordArray[2].split("");
//
//         if (recordWord.slice(6) === sentenceWords[i]) {
//           var result = (record.indexOf("positive") !== -1);
//
//           if (result === true) {
//             score += 1;
//           }
//           score -=1;
//         }
//       }
//       return score;
//   });
//
//       // return score;
//       cb(sentence, score);
//   });
//
// }
//
// ---
//
// function detectSentiment(filename, sentence, cb) {
//
//   getRecordsFromFile(filename, function(records) {
//
//     var score = 0;
//     var sentenceWords = sentence.split(" ");
//
//     records.forEach(function(record) {
//       var recordWord = (record.split("=")[3]).slice(0, -4);
//       var posOrNeg = record.split("=")[6];
//
//       sentenceWords.forEach(function(word) {
//         if ((recordWord === word) && (posOrNeg === "positive")) {
//           score += 1;
//         }
//         if ((recordWord === word) && (posOrNeg === "negative")){
//             score -= 1;
//         }
//
//       });
//       return score;
//   });
//
//       // return score;
//       cb(sentence, score);
//   });
//
// }
// --
//

var fs = require("fs");

function getRecordsFromFile(filename, cb) {
  fs.readFile(filename, "utf8", function(err, data) {
    if (err)  {
      console.log("---Error---");
      console.log(err);
      return;
    }
    var records = data.split("\n");
    // console.log(records);
    cb(records);
  });
}

function recordWord(record) {
  var recordWord = (record.split(" ")[2]).split("=")[1];

  return recordWord.toLowerCase();
}


function wordRating(record) {
  var rating = (record.split(" ")[5]).split("=")[1];

  if (rating === "positive") {
    return true;
  }
  if (rating === "negative") {
    return false;
  }

}


function detectSentiment(filename, sentence, cb) {

  getRecordsFromFile(filename, function(records) {

    var sentenceWords = sentence.toLowerCase().split(" ");
    var score = 0;

    records.forEach(function(record) {
      console.log(record);
      if (!record) {       //what is this part about
        return;
      }

      var word = recordWord(record);

      if (sentenceWords.indexOf(word) !== -1) {
        if (wordRating(record) === true) {
            score += 1;
        }
        if (wordRating(record) === false) {
          score -= 1;
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
