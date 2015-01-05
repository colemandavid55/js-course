var board, currentPlayer;

var resetBoard = function () {
  board = [
    [' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht'],
    ['wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X '],
    [' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht'],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X '],
    [' X ', 'red', ' X ', 'red', ' X ', 'red', ' X ', 'red'],
    ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X ']
  ];

<<<<<<< HEAD
  currentPlayer = 'wht';

  $(document).trigger('boardChange');
};

var selectSquare = function(row, col) {
  if (board[row][col] === ' X ') {
    $(document).trigger('invalidMove', "You selected an empty spot.");
  }
=======
  currentPlayer = 'wht'
  $(document).trigger('boardChange', board);
>>>>>>> fbfd030c5260a5f810f87c48b5adc2903f39d139
};

var attemptMove = function(row1, col1, row2, col2) {
  if ( board[row1][col1] == 'wht' && currentPlayer == 'wht') {
    //player selects to move traditionally, one diagonally space at a time
    if ( (row2 == row1 + 1) && ((col2 == col1 - 1)||(col2 == col1 + 1)) ) {
      //if they want to land on an untaken space
      if ( board[row2][col2] == ' X ') {
        makeMove(row1, col1, row2, col2);
        return true;
      }
    }
    //player selects to jump, moving two spaces diagonally at a time
    if ( (row2 == row1 + 2) && ((col2 == col1 - 2)||(col2 == col1 + 2)) ) {
      //if they are planning to jump a piece of the opposite color
      if ( board[row1+1][col1-1] == 'red') {
        removePiece(row1+1, col1-1);
        makeMove(row1, col1, row2, col2);
        return true;
      }
      if ( board[row1+1][col1+1] == 'red') {
        removePiece(row1+1, col1+1);
        makeMove(row1, col1, row2, col2);
        return true;
      }
    } 
  } else if ( board[row1][col1] == 'red' && currentPlayer == 'red') {
    if ( (row2 == row1 - 1) && ((col2 == col1 - 1)||(col2 == col1 + 1)) ){
      //if they want to land on an untaken space
      if ( board[row2][col2] == ' X ') {
        makeMove(row1, col1, row2, col2);
        return true;
      }
    }
    //player selects to jump, moving two spaces diagonally at a time
    if ( (row2 == row1 - 2) && ((col2 == col1 - 2)||(col2 == col1 + 2)) ) {
      //if they are planning to jump a piece of the opposite color
      if ( board[row1-1][col1-1] == 'wht') {
        removePiece(row1-1, col1-1);
        makeMove(row1, col1, row2, col2);
        return true;
      }
      if ( board[row1-1][col1+1] == 'wht') {
        removePiece(row1-1, col1+1);
        makeMove(row1, col1, row2, col2);
        return true;
      }
    }
  } else {
    $(document).trigger('invalidMove', "That move is invalid");
    return false;

  }
  
};

var makeMove = function(row1, col1, row2, col2) {
  board[row2][col2] = board[row1][col1];
  board[row1][col1] = ' X ';
  if (currentPlayer == "wht") {
    currentPlayer = 'red';
  } else {
    currentPlayer = 'wht';
  }
  $(document).trigger('boardChange', board);
  $(document).trigger('moveMade', moveCount);
};

var removePiece = function(row, col) {
  var record = board[row][col]
  var element = 
  board[row][col] = ' X ';
  $(document).trigger('boardChange', board);
  $(document).trigger('pieceTaken', taunt, takenPieceCounter);
};


