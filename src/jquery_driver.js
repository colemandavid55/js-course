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
};

var move,
  gameCount = 0,
  moveCount = 0,
  errorCount = 0,
  takenPieceCountRed = 0,
  takenPieceCountWht = 0;

var gameCounter = function() {
  gameCount++;
  console.log(gameCount);
  $('.game_count').empty().append(gameCount);
};

var moveCounter = function() {
  moveCount++;
  $('.move_count').empty().append(moveCount);
};

var errorCounter = function() {
  errorCount++;
};

var takenPieceCounter = function() {
  if (currentPlayer === 'red') {
    takenPieceCountWht++;
  } else {
    takenPieceCountRed++;
  }
  $('.red_count').empty().append(takenPieceCountRed);
  $('.wht_count').empty().append(takenPieceCountWht);
};

var getMove = function() {
  move = {
    startRow: null,
    startCol: null,
    endRow: null,
    endCol: null
  };
};

var updateMove = function(e) {
  var piece = $(e.currentTarget);
  var row = $('.row').index(piece.parent());
  var col = piece.parent().children().index(piece);
  console.log("column" + col)
  console.log("row" + row)
  if (move.startRow == null || move.startCol == null) {
    move.startRow = row;
    move.startCol = col;
  } else {
    move.endRow = row;
    move.endCol = col;
    attemptMove(move.startRow, move.startCol, move.endRow, move.endCol)
    getMove();
  }
};

var play = function() {
  moveCount = 0;
  takenPieceCountWht = 0;
  takenPieceCountRed = 0;
  $('.move_count').empty()
  resetBoard();
  getMove();
}

var displayBoard = function() {
	for (var rowIndex = 0; rowIndex < board.length; rowIndex++ ) {
    var row = board[rowIndex];
    for (var colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
      var rowKey = numToChar[Number(rowIndex)];
      var element = $(".row-" + rowKey).find(".col-" + colIndex);
      displayPiece(element, row[colIndex]);
    }
  }
};

var displayPiece = function(element, piece) {
  element.empty();
  if (piece == 'red') {
    element.append("<span class='red piece'></span>");
  } else if (piece == 'wht') {
    element.append("<span class='white piece'></span>");
  }
};

var taunt = function () {
  console.log("You want to keep your pieces, not give them away...");
}



$(document).on('ready', function() {
  $(document).on('boardChange', displayBoard);
  $(document).on('boardChange', getMove);
  $('.col').on('click', updateMove);
  $('.start').on('click', play); 
  $('.start').on('click', gameCounter);
  // $(document).on('moveMade', moveCounter);
  // $(document).on('pieceTaken', taunt, takenPieceCounter);
})

var displayError = function(e, error) {
  $('.error').empty().append(error);
};

$(document).on('invalidMove', displayError);
$(document).on('moveMade', moveCounter);
$(document).on('pieceTaken', taunt, takenPieceCounter);
