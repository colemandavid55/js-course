(function () {
	//Code!
  //Private
  // Quiz.questions = []
  var idCounter = 100
  var answersKey = {
                100: "Bears are all terrible",
                101: "Nevermore",
                102: "Ideas",
                103: "Dude, whatever.",
                104: "Bad"
                };

  //Public
  window.Quiz = {}

  Quiz.questions = []
  Quiz.leaderBoard = []
  Quiz.results = []
  Quiz.answerFrequency ={}
  //  { 100: {

  // }}


 // "Black Bear",
 //    "Bears are all terrible",
 //    "Cats and Dogs FTW"

  Quiz.gradeQuiz = function (userAnswers) {
    // Maniuplate score
    // Return true or false
    var score = 0;
    for (var answer in userAnswers) {
      if (answer[question.id] === answersKey[answer[question.id]]) {
        score++
      }
    }
    console.log(score);
    idCounter = 100;
    return score;
  }

  // Transaction Script
  Quiz.addQuestion = function (content, answers) {
    // TODO: Add validation (ensure name is at least X characters, ...)
    if (! content) {
      return { error: 'content_required' }
    }
    var question = {
      id: idCounter,
      content: content,
      answers: answers,
      completed: false
    }

    Quiz.questions.push(question)
    idCounter += 1

    // Publish
    // Observer Pattern

    //Publish Event
    //Open-Closed principle (solid)
    // $(document).trigger('new-task')

    return { success: true }
  }

  // Task.find = function (id) {
  //   for (var i=0; i < tasks.length; i++) {
  //     if (tasks[i].id === id) {
  //       return tasks[i]
  //     }
  //   }
  // }

  // Task.markComplete = function (taskId, isComplete) {
  //   var task = Task.find(taskId)
  //   if (task) {
  //     task.completed = !!isComplete
  //   }
  // }

  Quiz.forEach = function (callback) {
    for (var i = 0; i < questions.length; i++ ) {
      callback( extend({}, questions[i]) )
    }
  }

  Quiz.logResult = function (name, score) {
    Quiz.results.push({"name": name, "score": score})
    return true
  }

  Quiz.highScores = function() {
    return Quiz.results.filter(function (entry) {
      if ( entry["score"] >= 3 ) {
        return entry;
      }
    })
    // if ( ! Quiz.leaderBoard[name] ) {
    //   Quiz.leaderBoard[name] = score;
    // } else {
    //   Quiz.leaderBoard[name] = (Quiz.leaderBoard[name] >= score) ? Quiz.leaderBoard[name] : score;
    // }
    // return Quiz.leaderBoard
  }

  // Quiz.countAnswers = function(userAnswers) {
  //   if (Quiz.answerFrequency[question.id] === userAnswers[question.id] ) {
  //     Quiz.answerFrequency[question.id] = QuizanswerFrequency[question.id] || 1
  //   }
  // }

  // //Meanwhile...
  // Task.forEach(function (task) {
  //   console.log("I have a task: ", task.name)
  //   $('<div class="task">').text(task.name)
  // })

})()