Questions = {}

Questions.model = function () {
  // Model code goes here
  
};

Questions.vm = {
  questions: m.prop([new Questions.model()])
}

Questions.controller = function () {
  // Controller code goes here
  var vm = Questions.vm
  var ctrl = this;
  
  ctrl.add = function () {
    var newModel = new Questions.model()
    vm.questions().push(newModel)
  }

}