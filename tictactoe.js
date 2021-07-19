/* globals createCanvas background noFill strokeWeight stroke ellipse rect fill*/

// Content behind double slashes is a comment. Use it for plain English notes,
// or for code that you want to temporarily disable.

const cloneDeep = require('lodash.clonedeep');

/* tic-tac-toe game functions*/


function initial_State() {
  // Returns starting state of the board.
  // return [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
  return [[null, null, null], [null, null, null], [null, null, null]];
}


function player(board) {
//   Returns player who has the next turn on a board.
  
  let xs = 0;
  let os = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == "X"){
        xs += 1;
      }
      else if (board[i][j] == "O") {
        os += 1;
      }
    }
  }
  
  if (xs == os) {
    return "X";
  }
  return "O";
}

function actions(board) {
//   Returns set of all possible actions (i, j) available on the board.
  
  let possibles = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === null) {
        possibles.push([i, j]);
      }
    }
}
  return possibles;
    
}

function result(board, action) {
//   Returns the board that results from making move (i, j) on the board.
  
  if (actions(board).includes(action)) {
    let temp = action;
    let playerTurn = player(board);
    let new_board = cloneDeep(board);
    new_board[temp[0]][temp[1]] = playerTurn;
    
    return new_board;
    
  }
  else {
//     CHANGE THIS TO RAISING AN EXCEPTION (NOT SURE HOW TO IN JS)
    return null;
  }
}

function winner(board) {
//   Returns the winner of the game, if there is one.
  
//   Check for complete rows
  for (let i = 0; i < 3; i++) {
    if ((board[i][0] == "X") && (board[i][1] == "X") && (board[i][2] == "X")) {
      return "X";
    }
  }
  for (let i = 0; i < 3; i++) {
    if ((board[i][0] == "O") && (board[i][1] == "O") && (board[i][2] == "O")) {
      return "O";
    }
  }
  
//   Check for complete columns
  for (let j = 0; j < 3; j++) {
    if ((board[0][j] == "X") && (board[1][j] == "X") && (board[2][j] == "X")) {
      return "X";
    }
  }
  for (let j = 0; j < 3; j++) {
    if ((board[0][j] == "O") && (board[1][j] == "O") && (board[2][j] == "O")) {
      return "O";
    }
  }
  
//   Check for complete diagonals
    if ((board[0][0] == "X") && (board[1][1] == "X") && (board[2][2] == "X")) {
        return "X";
    }
    if ((board[0][2] == "X") && (board[1][1] == "X") && (board[2][0] == "X")){
        return "X";
    }

    if ((board[0][0] == "O") && (board[1][1] == "O") && (board[2][2] == "O")) {
        return "O";
    }
    if ((board[0][2] == "O") && (board[1][1] == "O") && (board[2][0] == "O")){
        return "O";
    }
  return null;
  
}

function terminal(board) {
//   Returns true if game is over, false otherwise.
  if ((winner(board) == "X") || (winner(board) == "O")) {
    return true;
    
  }
  if (actions(board).length == 0) {
    return true;
  }
  return false;
  
}

function utility(board) {
//   Returns 1 if X has won the game, -1 if O has won, 0 otherwise.
  if(winner(board) == "X") {
    return 1;
  }
  else if (winner(board) == "O") {
    return -1;
  }
  return 0;
  
}

function minimax(board) {
//   Returns the optimal action for the current player on the board.
  if (terminal(board)) {
    return utility(board);
    
  }
  
  if (player(board) == "X") {
    let v = Number.NEGATIVE_INFINITY;
    let bestScore = Number.NEGATIVE_INFINITY;
    let bestAction;
    
    for (let i = 0; i < actions(board).length; i++) {
      v = max_value(result(board, actions(board)[i]));
      if (v > bestScore) {
        bestScore = v;
        bestAction = actions(board[i]);
      }
    }
    return bestAction;
    
  }
  
  else if (player(board) == "O") {
    let v = Number.POSITIVE_INFINITY;
    let bestScore = Number.POSITIVE_INFINITY;
    let bestAction;
    
    for (let i = 0; i < actions(board).length; i++) {
      v = min_value(result(board, actions(board)[i]));
      
      if (v < bestScore) {
        bestScore = v;
        bestAction = actions(board)[i];
      }
    }
    return bestAction;
  }
  
  
}

function max_value(board) {
//   Recursive aid to minimax function.
  if (terminal(board)) {
    return utility(board);
  }
  let v = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < actions(board).length; i++) {
    v = Math.max(v, min_value(result(board, actions(board)[i])));
  }
  
  return v;
}

function min_value(board) {
//   Recursive aid to minimax function.
  if (terminal(board)) {
    return utility(board);
  }
  let v = Number.POSITIVE_INFINITY;
  
  for (let i = 0; i < actions(board).length; i++) {
    v = Math.min(v, max_value(result(board, actions(board)[i])));
  }
  
  return v;
}
    











export {initial_State, player, actions, result, winner, 
  terminal, utility, minimax, max_value, min_value };
