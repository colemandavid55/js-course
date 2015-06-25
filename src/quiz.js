
(function (){

  window.Quiz = {}
  window.NameInput = {}
  window.Score = {}
  window.Leader = {}
  window.Average = {}

  Quiz.vm = {
    questions: m.prop([]),
    answers : m.prop([]),
    userAnswers: m.prop({
      "Question_100": {},
      "Question_101": {}
    }) 
    
  }

  NameInput.vm = {
    result: m.prop({name: "Enter Name"})
  }

  Score.vm = {
    score: m.prop({})
  }

  Leader.vm = {
    list: m.prop([])
  }

  Average.vm = {
    averages: m.prop([
      {
        "question": "Question_100",
        "attempted": [],
        "average": 0
      },
      {
        "question": "Question_101",
        "attempted": [],
        "average": 0
      }
    ])
  }

  Quiz.controller = function () {
    var ctrl = {}

    ctrl.selectUserAnswer = function (questionId, answerId) {
      var userAnswer = {}
      userAnswer["questionId"] = questionId;
      userAnswer["answerId"] = answerId;
      console.log("Question Id: " + questionId + " Answer Id: " + answerId)
      return userAnswer
    }

    ctrl.selectAnswer = function (questionId, answerId) {

      var userAnswer = ctrl.selectUserAnswer.bind(null, questionId, answerId)

      var questionIdString = "Question_" + questionId
      
      Quiz.vm.userAnswers()[questionIdString] = userAnswer()
  

      console.log(Quiz.vm.userAnswers())
    }

    ctrl.grader = function (answers, userAnswers) {
      var score = 0;
      for (var i = 0, x = Quiz.vm.questions().length; i < x; i++) {
        var questionRight = 0,
        questionId = 100 + i,
        answerKey = answers["Question_" + questionId]["answerId"],
        answerGiven = userAnswers["Question_" + questionId]["answerId"];
        if (answerKey === answerGiven) {
          score++
          questionRight++
        }
      var avg = Average.vm.averages()[i];
      avg["attempted"].push(questionRight)
      var answeredRight = avg["attempted"].filter(function (idx) {
        if (idx === 1) {
          return idx
        }
      }).length
      avg["average"] = answeredRight/(avg["attempted"].length)
      questionRight = 0;

      }

      return score
    }

    ctrl.submit = function () {
      var userAnswers = Quiz.vm.userAnswers()
      var answers = Quiz.vm.answers()

      NameInput.vm.result().score = ctrl.grader(answers, userAnswers)

      Score.vm.score( NameInput.vm.result())
      Leader.vm.list().push(Score.vm.score())

      Quiz.vm.userAnswers({
      "Question_100": {},
      "Question_101": {}
      })
      NameInput.vm.result( {name: "Enter Name"} )




      function gradeQuiz (answers, userAnswers) {
        var score = ctrl.grader.bind(null, answers, userAnswers);

        return score()

      } 
    }

    ctrl.checkStatus = function (questionId, idx) {
      var userAnswerStatus = Quiz.vm.userAnswers()["Question_" + questionId] 

      if ( userAnswerStatus && (userAnswerStatus["answerId"] === idx)) { 
        return true
      } else {
        return false
      }
    }


    
    return ctrl
  }

  Quiz.view = function (ctrl) {

    return m('.questions', [
      Quiz.vm.questions().map(questionView),
      m('button', { onclick: ctrl.submit }, "Submit Your Quiz For Grading")
      ]
    )

    function questionView (question) {
      return m('.question', [
        m('label[type=text', question.content),
        question.answers.map(answerView.bind(null, question.id ))
      ])
    }
    function answerView (questionId, answer, idx) {

      return m('ul.answer', [
        m('label[type=text', answer),
        m('input[type=radio]', {
          name: "Question " + questionId + " answer",
          onclick: ctrl.selectAnswer.bind(null, questionId, idx),
          id: "q_" + idx,
          checked: ctrl.checkStatus(questionId, idx)

        })
      ])
    }
  }

  NameInput.controller = function () {
    var ctrl = {}

    ctrl.setName = function (name) {
      NameInput.vm.result().name = name
    }

    return ctrl
  }

  NameInput.view = function (ctrl) {
    return [
      m('label[type=text]', "Name: "),
      m('input[type=text]', {
        id: "name",
        value: NameInput.vm.result().name,
        onchange: function(e) {
          NameInput.vm.result().name = e.currentTarget.value
        }
      })
    ]

  }

  Score.controller = function () {
    var ctrl = {}

    ctrl.setResult = function () {
      if (Score.vm.score().name && Score.vm.score().score) {
        return Score.vm.score().name + "'s score => " + Score.vm.score().score;
      } else {
        return ""
      }
    }

    return ctrl
  }

  Score.view = function (ctrl) {
    return [
      m('.score', {
        id: "score",
      },
      ctrl.setResult()
      )
    ]
  }

  Leader.controller = function () {
    var ctrl = {}

    ctrl.listLeaders = function () {
      if (Leader.vm.list()) {
        return Leader.vm.list().map(function (leader) {
          return m('div', leader.name + ": " + leader.score)
        })
      } else {
        return ""
      }
    }

    return ctrl
  }

  Leader.view = function (ctrl) {
    return [
      m('.leader', {
        id: "leader",
      },
      ctrl.listLeaders()
      )
    ]

  }

  Average.controller = function () {
    var ctrl = {}

    ctrl.listAverages = function () {
      return Average.vm.averages().map(function (average) {
        return m('div', average.question + ": " + average.average)
      })
    }

    return ctrl
  }

  Average.view = function (ctrl) {
    return [
      m('.average', {
        id: "average"
      },
      ctrl.listAverages()
    )]
  }
 
})()
