// Presenter
(function () {
 
  window.QuizPresenter = {}
 
  var $form = $('#quiz-form')

  QuizPresenter.userAnswers = {};
 
  QuizPresenter.renderQuizzes = function () {
    $form.find('.questions').empty()
    var questionDivs = Quiz.questions.map(function (question) {
      return $('<div>').addClass('question').append(
        $('<h3>').text(question.content),
 
        question.options.map(function (option) {
          return $('<div>').addClass('option').attr('data-id', question.id).append(
            $('<input>').attr({ type: 'radio', name: 'question_'+question.id, checked: false }),
            $('<label>').text(option)
          )
        })
      )
    })
    $form.find('.questions').append(questionDivs)

    $('.leaders').empty()
    var $leaders = Quiz.loggedResults.map(function (leader) {
      return $('<p>').addClass("leader").attr( {name: leader.name, name: leader.score} ).text("Name: " + leader.name + "   " + "Score: " + leader.score)
    })
    $('.leaders').append($leaders);
  }

  QuizPresenter.renderQuizzes()

  $(document).on('click','#quiz-form input[type="radio"]', function (e) {
    console.log(this);
    var questionReference = $(this).attr("name").replace( /^\D+/g, '');
    console.log(questionReference);
    var answerSelected = $(this).next().text();
    $(this).prop('checked', true)
    QuizPresenter.userAnswers[parseInt(questionReference)] = Quiz.questions[parseInt(questionReference) - 1 ].options.indexOf(answerSelected)
    console.log(QuizPresenter.userAnswers)
    // QuizPresenter.userAnswers[$(this).attr("data_id")]
  })
 
  $form.on('submit', function (e) {
    e.preventDefault()
    $('score').empty()
    console.log("You submitted")
    // Read user inputs from the view
    // Update your quiz (score)
    $form.find("#quiz-form input[type='radio']:checked").map(function (idx, elem) {
      console.log(idx, $(elem).attr('data-id'))
    })
    
    var score = Quiz.calculateScore(QuizPresenter.userAnswers)
    var name = $('#name').val() 
    var result = {
      "name": name,
      "score": score
    };
    Quiz.logResult(result);
    $('.score').append('<p>').text("Your score for the previous game: " + score)
    // Show score to user
    $('#name').val("");
    QuizPresenter.renderQuizzes()
    return false
  })
 
 
})()

