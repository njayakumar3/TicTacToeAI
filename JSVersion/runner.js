/* globals mouseX textSize mouseY createCanvas mouseIsPressed background noFill strokeWeight line text stroke ellipse colorMode HSB rect fill*/



// Project idea and starter code in Python 3 given by Harvard CS50: Intro to AI in Python
// Minimax algorithm implemented in Python 3 by Nithya Jayakumar previously 


let globalS, globalB, cnv, current_player, title, xpos, ypos, game_over, ai_turn, my_symb, ai_symb, width, height, user, current_board;

const cloneDeep = require('lodash.clonedeep');

/* tic-tac-toe game functions*/


function initial_State() {
  // Returns starting state of the board.
  return [["", "", ""], ["", "", ""], ["", "", ""]];
}


function player(board) {
//   Returns player who has the next turn on a board.
  
  let xs = 0;
  let os = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == "X"){
        xs++;
      }
      else if (board[i][j] == "O") {
        os++;
      }
    }
  }
  
  if (xs === os) {
    return "X";
  }
  return "O";
}

function actions(board) {
//   Returns set of all possible actions (i, j) available on the board in the form of an array.
  let possibles = [];
  
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if ((board[i][j] != "X") && (board[i][j] != "O"))  {
        let possible = [];
        possible.push(i);
        possible.push(j);
        possibles.push(possible);
      }
    }
}
  return possibles;
    
}

function result(board, action) {
//   Returns the board that results from making move (i, j) on the board.
  let new_board = [["", "", ""], ["", "", ""], ["", "", ""]];
  for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        new_board[i][j] = board[i][j];
      }
    }
  // if (actions(board).includes(action)) {
    
    new_board[action[0]][action[1]] = player(board);
    
    
  // }
  return new_board;
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
  return "None";
  
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
    return (-1);
  }
  return 0;
  
}

function minimax(board) {
//   Returns the optimal action for the current player on the board.
  if (terminal(board)) {
    return utility(board);
    
  }
  
  if (player(board) == "X") {
    let v = -100;
    let bestScore = -100;
    let bestAction = [];
    
    for (let i = 0; i < actions(board).length; i++) {
      v = min_value(result(board, actions(board)[i]));
      if (v > bestScore) {
        bestScore = v;
        bestAction = actions(board)[i];
      }
    }
    return bestAction;
    
  }
  
  else if (player(board) == "O") {
    let v = 100;
    let bestScore = 100;
    let bestAction = [];
    
    for (let i = 0; i < actions(board).length; i++) {
      v = max_value(result(board, actions(board)[i]));
      
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
  let v = -100;
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
  let v = 100;
  
  for (let i = 0; i < actions(board).length; i++) {
    v = Math.min(v, max_value(result(board, actions(board)[i])));
  }
  
  return v;
}
    









/*RUNNER*/



function setup() {
//   UI Setup
  width = 600;
  height = 400;
  cnv = createCanvas(width, height);
  colorMode(HSB, 360, 100, 100);
  background(95);
  globalS = 100;
  globalB = 50;
  




// Game Setup
  title = "";
  user = "";
  current_board = initial_State();
  ai_turn = false;
}

function draw() {
  
//   Let user choose a player
  if (user == "") {
    // Draw title
    stroke(0);
    textSize(30);
    text("Welcome to Tic-Tac-Toe", width/2.0 - 160, 50);
    
//     Draw Buttons
    rect(0, height - 50, 150, 50);
    text("Play as X", 10, height - 15);
    
    
    rect(width - 150, height - 50, 150, 50);
    text("Play as O", width - 140, height - 15);
    
//     Check if button clicked
    if ((mouseIsPressed) && (mouseX > 0) && (mouseX < 150)
        && (mouseY > height - 50) && (mouseY < height)) {
      user = "X";
      
    }
    if ((mouseIsPressed) && (mouseX > width - 150) && (mouseX < width)
        && (mouseY > height - 50) && (mouseY < height)) {
      user = "O";
      // ai_turn = true;
    }
  }
  
  else {
//     Draw game board
    stroke(0);
    background(95);
    line(width/2 - 40, height*0.6 - 120, width/2 - 40, height*0.6 + 120);
    line(width/2 + 40, height*0.6 - 120, width/2 + 40, height*0.6 + 120);
    line(width/2 - 120, height*0.6 - 40, width/2 + 120, height*0.6 - 40);
    line(width/2 - 120, height*0.6 + 40, width/2 + 120, height*0.6 + 40);
    
    let token_places = [[ [height*0.6 - 120, width/2 - 120], 
                          [height * 0.6 - 120, width/2 - 40],
                          [height * 0.6 - 120, width/2 + 40] ],
                        [ [height*0.6 - 40, width/2 - 120],
                          [height * 0.6 - 40, width/2 - 40],
                          [height*0.6 - 40, width/2 + 40]   ],
                        [ [height*0.6 + 40, width/2 - 120],
                          [height*0.6 + 40, width/2 - 40],
                          [height*0.6 + 40, width/2 + 40]    ]];
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        textSize(50);
        
        text(current_board[i][j], token_places[i][j][1] + 25, token_places[i][j][0] + 50);
      
      }
    }
    
    let game_over = terminal(current_board);
    let current_player = player(current_board);
    let game_winner = "";
    
//     Show Title
    if (game_over) {
      game_winner = winner(current_board);
      if ((game_winner != "X") && (game_winner != "O")) {
        fill(200, globalS, globalB);
        title = "Game Over: Tie";
        
      }
      else {
        fill(0, globalS, globalB);
        title = "Game Over: " + game_winner + " wins.";
        
      }
    }
    
    else if (user == current_player) {
      title = "Play as " + user;
      
    }
    else {
      title = "Computer thinking...";
    }
    textSize(30);
    text(title, width/2.0 - 160, 50);
    
    
//     Check for AI move
    if ((user != current_player) && !(game_over)) {
      if (ai_turn) {
        let move = minimax(current_board);
        current_board = result(current_board, move);
        ai_turn = false;
      }
      else {
        ai_turn = true;
      }
    }
    
//     Check for a User move
    if ((user == current_player) && !(game_over)) {
      if(mouseIsPressed){
    pressedActions();
    }
    
  }
    
  }

  
  
}


function pressedActions() {

  //       Top left
      if ((mouseX > width/2 - 120) && (mouseX < width/2 - 40)
         && (mouseY > height*0.6 - 120) && (mouseY < height*0.6 - 40)) {
        let j = 0;
        let i = 0;
        if ((current_board[i][j] != "X") && (current_board[i][j] != "O")) {
          current_board = result(current_board, [i, j]);
        }
      }
//       Top Middle
      if ((mouseX > width/2 - 40) && (mouseX < width/2 + 40)
         && (mouseY > height*0.6 - 120) && (mouseY < height*0.6 - 40)) {
        let j = 1;
        let i = 0;
        if ((current_board[i][j] != "X") && (current_board[i][j] != "O")) {
          current_board = result(current_board, [i, j]);
        }
      }
//       Top Right
      if ((mouseX > width/2 + 40) && (mouseX < width/2 + 120)
         && (mouseY > height*0.6 - 120) && (mouseY < height*0.6 - 40)) {
        let j = 2;
        let i = 0;
        if ((current_board[i][j] != "X") && (current_board[i][j] != "O")) {
          current_board = result(current_board, [i, j]);
        }
      }
//       Middle Left
      if ((mouseX > width/2 - 120) && (mouseX < width/2 - 40)
         && (mouseY > height*0.6 - 40) && (mouseY < height*0.6 + 40)) {
        let j = 0;
        let i = 1;
        if ((current_board[i][j] != "X") && (current_board[i][j] != "O")) {
          current_board = result(current_board, [i, j]);
        }
      }
//       Middle Middle
      if ((mouseX > width/2 - 40) && (mouseX < width/2 + 40)
         && (mouseY > height*0.6 - 40) && (mouseY < height*0.6 + 40)) {
        let j = 1;
        let i = 1;
        if ((current_board[i][j] != "X") && (current_board[i][j] != "O"))  {
          current_board = result(current_board, [i, j]);
        }
      }
//       Middle Right
      if ((mouseX > width/2 + 40) && (mouseX < width/2 + 120)
         && (mouseY > height*0.6 - 40) && (mouseY < height*0.6 + 40)) {
        let j = 2;
        let i = 1;
        if ((current_board[i][j] != "X") && (current_board[i][j] != "O"))  {
          current_board = result(current_board, [i, j]);
        }
      }
      
//       Bottom Left
        if ((mouseX > width/2 - 120) && (mouseX < width/2 - 40)
         && (mouseY > height*0.6 + 40) && (mouseY < height*0.6 + 120)) {
        let j = 0;
        let i = 2;
        if ((current_board[i][j] != "X") && (current_board[i][j] != "O")) {
          current_board = result(current_board, [i, j]);
        }
      }
//       Bottom Middle
        if ((mouseX > width/2 - 40) && (mouseX < width/2 + 40)
         && (mouseY > height*0.6 + 40) && (mouseY < height*0.6 + 120)) {
        let j = 1;
        let i = 2;
        if ((current_board[i][j] != "X") && (current_board[i][j] != "O")) {
          current_board = result(current_board, [i, j]);
        }
      }
//       Bottom Right
        if ((mouseX > width/2 + 40) && (mouseX < width/2 + 120)
         && (mouseY > height*0.6 + 40) && (mouseY < height*0.6 + 120)) {
        let j = 2;
        let i = 2;
        if ((current_board[i][j] != "X") && (current_board[i][j] != "O")) {
          current_board = result(current_board, [i, j]);
        }
      }
    
}


