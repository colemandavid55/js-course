// Presenter

(function () {

  window.Quizpresenter = {}

  // TODO: REMOVE
  Quiz.addQuestion("Which bear is best?",
    [
    "Black Bear",
    "Bears are all terrible",
    "Cats and Dogs FTW"
    ]
  )
  Quiz.addQuestion("Why is the meaning of the universe?",
    [
    "Therefore",
    "Nevermore",
    "Futhermore"
    ]
  )
  Quiz.addQuestion("What is your favorite thing?",
    [
    "People",
    "Events",
    "Ideas"
    ]
  )
  Quiz.addQuestion("Why do good things happen to bad people?",
    [
    "Define 'good'",
    "Define 'bad'",
    "Dude, whatever."
    ]
  )
  Quiz.addQuestion("How do you feel about this quiz?",
    [
    "Good",
    "Bad",
    "There is no measurable level of interest"
    ]
  )
  // ^^^^^^^^^^^^^^

  // Task.forEach(function (task) {
  //   var li = $('<li>').append(
  //     $('<input type="checkbox">').prop("checked", task.completed),
  //     $('<span>').addClass('name').text(task.name)
  //   )

  //   $('#task-list').append(li)

  // })
   // var answersKey = {
   //              100: "Bears are all terrible",
   //              101: "Nevermore",
   //              102: "Ideas",
   //              103: "Dude, whatever.",
   //              104: "Bad"
   //              };


  renderQuiz()

  var userAnswers = {};


  function renderQuiz () {
    userAnswers = {};
    $('#quiz').empty()
    var questionForms = Quiz.questions.map(function (question) {
      console.log(question)
      console.log(question["answers"])
      var answer = this.value
      var answerMenu = $('<select id="' + question.id + '">')
      answerMenu.on('change', function (e) {
        userAnswers[question.id] = answer
        console.log(userAnswers)
      })
      return $('<form>').append(
        $('<label id="question">')
        .attr('data-id', question.id)
        .text(question.content)
        .append(answerMenu),
        answerMenu.append(question.answers.map(function (answer) {
          return $('<option id="answer">')
            .attr('data-id', answer.id)
            .text(answer)

          }) 
        )
      )
    })
    $('#quiz').append(questionForms)


      
    var button = $('<button type="submit">').text("Submit For Judgement!")
    var nameHere = $('<input type="text" id="name">')
    var label = $('<label type="text">').text("Type Name Here")
    label.append(nameHere)
    $('#quiz').append(label, '<br>', '<br>', button)
  }

    //List to the view
    // $('#task-list').on('click', 'input[type=checkbox]', function (e) {
    //   // ON click, update model
    //   var taskId = $(this).attr('data-id');
    //   var isChecked = $(this).prop('checked');
    //   console.log("Checked?", isChecked, taskId)

    //   Task.markComplete(parseInt(taskId, 10), isChecked)
    // })

  $(document).on('click', 'button', function(e) {
    e.preventDefault();
    // var answersSubmitted = {
    //   id: $('')
    // }
    //Register answers to questions
    var name = $('#name').val()


    var score = Quiz.gradeQuiz(userAnswers);
    Quiz.logResult(name, score)
    $('form#quiz').empty()
    $('.score').empty()
    $('.leaders').empty()

    // console.log("click received")
    // for (var qId in userAnswers) {
    //   if (userAnswers[qId] === answersKey[qId]) {
    //     score++
    //   }
    // }

    var div = $('<div>').addClass("score").append('<h3>').text("Your score on the quiz: " + score)
    $('body').append(div)

    var leaders = Quiz.highScores()
    var leaderDiv = $('.leaders')
    var sortedLeaders = leaders.sort(function (leaderA, leaderB) {
      return leaderB["score"] - leaderA["score"];
    })
    var $sortedLeaders = sortedLeaders.map(function (leader) {
      return $('<p>').text("Name: " + leader["name"] + ": " + leader["score"])
    })
    // var unsortedLeaders = leaders.map(function (leader) {
    //   console.log(leader);
    //   var leaderName = leader["name"]
      
    // })
    // console.log(unsortedLeaders)
    // var sortedLeaders = unsortedLeaders.sort(function (a, b) {
    //   return b["score"] - a["score"];
    // })
    leaderDiv.append($sortedLeaders);
    renderQuiz();
  })


})()