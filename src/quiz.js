// Model
(function (){
 
  // Public
  window.Quiz = {}
 
  Quiz.questions = [
    {
      id: 1,
      content: "What is your favorite thing?",
      answer: 2,
      options: [
        "Apple",
        "Bird",
        "Four"
      ]
    },
    {
      id: 2,
      content: "What is your other favorite thing?",
      answer: 0,
      options: [
        "What?",
        "Umm...",
        "I don't know"
      ]
    }
  ]

  Quiz.answers = [
      { id: 1, answer: 2 },
      { id: 2, answer: 0 }
    ]

  Quiz.loggedResults = [];

  Quiz.rankings = Quiz.loggedResults.sort(function (result) {
    return b["score"] - a["score"];
  })

  Quiz.calculateScore = function (userAnswers) {
    var score = 0;
    for ( var i = 0, x = Quiz.answers.length; i < x; i++ ) {
      if ( Quiz.answers[i].answer === userAnswers[i+1]) {
        score++;
      }
    }
    return score;
  }

  Quiz.logResult = function (result) {
    Quiz.loggedResults.push(result)
    Quiz.loggedResults.sort(function (a, b) {
    return b["score"] - a["score"];
  })
    return true
  }
 
 
})()