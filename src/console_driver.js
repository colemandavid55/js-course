var numToChar = ["a", "b", "c", "d", "e", "f", "g", "h"];
var charToNum = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7
}

var displayError = function(e, error) {
  console.log(error);
};

var count = 0;

var moveCount = function () {
  count += 1;
  console.log("Turn count: " + count)

}

var play = function () {
  resetBoard();

  while (true) {
    var move = getMove();
    if (move.quit) {
      break;
    }
    attemptMove(move.startRow, move.startCol, move.endRow, move.endCol);
  }
}

var displayBoard = function () {
  var column = [0, 1, 2, 3, 4, 5, 6, 7];
  console.log("  | " + column.join("   "));
  console.log("-----------------------------------");
  for (var i = 0; i < board.length; i++) {
    console.log(numToChar[i] + " |" + board[i].join(" "));
  }
};

var getMove = function() {
  var start = prompt("Current Player: " + currentPlayer + "\nPick starting piece position (example: c5)");
  if (start[0] == "q") {
    return {
      quit: true
    }
  }
  var end = prompt("Pick ending position");

  startArr = start.split("")
  endArr = end.split("")

  var moveObject = {
    startRow: charToNum[startArr[0]],
    startCol: Number(startArr[1]),
    endRow: charToNum[endArr[0]],
    endCol: Number(endArr[1])
  };
  return moveObject;
};

var taunt = function () {
  console.log("You want to keep your pieces, not give them away...");
}

// $(document).on('ready', function() {
  $(document).on('invalidMove', displayError);
  $(document).on('boardChange', displayBoard);
  $(document).on('pieceTaken', taunt);
  $(document).on('moveMade', moveCount);
// })