"""
Tic Tac Toe Player
"""

import math
import copy
import sys


X = "X"
O = "O"
EMPTY = None


def initial_state():
    """
    Returns starting state of the board.
    """
    return [[EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]]


def player(board):
    """
    Returns player who has the next turn on a board.
    """
    xs = 0
    os = 0
    for row in board:
        for cell in row:
            if cell == X:
                xs += 1
            elif cell == O:
                os += 1

    if xs == os:
        return X
    return O


def actions(board):
    """
    Returns set of all possible actions (i, j) available on the board.
    """
    possibles = set()
    for i in range(0, len(board)):
        for j in range(0, len(board[i])):
            if board[i][j] == EMPTY:
                possibles.add((i, j))
            
    return possibles


def result(board, action):
    """
    Returns the board that results from making move (i, j) on the board.
    """
    if action in actions(board):
        (i, j) = action
        playerTurn = player(board)
        new_board = copy.deepcopy(board)
        new_board[i][j] = playerTurn
        return new_board
    else:
        raise Exception


def winner(board):
    """
    Returns the winner of the game, if there is one.
    """

    #Check for complete rows
    for i in range(0, 3):
        if board[i][0] == X and board[i][1] == X and board[i][2] == X:
            return X
    for i in range(0, 3):
        if board[i][0] == O and board[i][1] == O and board[i][2] == O:
            return O

    #Check for complete columns
    for j in range(0, 3):
        if board[0][j] == X and board[1][j] == X and board[2][j] == X:
            return X
    for j in range(0, 3):
        if board[0][j] == O and board[1][j] == O and board[2][j] == O:
            return O

    #Check for complete diagonals
    if board[0][0] == X and board[1][1] == X and board[2][2] == X:
        return X
    if board[0][2] == X and board[1][1] == X and board[2][0] == X:
        return X

    if board[0][0] == O and board[1][1] == O and board[2][2] == O:
        return O
    if board[0][2] == O and board[1][1] == O and board[2][0] == O:
        return O

    return None


    


def terminal(board):
    """
    Returns True if game is over, False otherwise.
    """
    if winner(board) == X or winner(board) == O:
        return True
    if len(actions(board)) == 0:
        return True
    
    return False




def utility(board):
    """
    Returns 1 if X has won the game, -1 if O has won, 0 otherwise.
    """
    if winner(board) == X:
        return 1
    elif winner(board) == O:
        return -1
    return 0


def minimax(board):
    """
    Returns the optimal action for the current player on the board.
    """
    if terminal(board):
        return utility(board)

    if player(board) == X:
        v = -math.inf
        bestScore = -math.inf
        bestAction = None

        for action in actions(board):
            v = min_value(result(board, action))
            if v > bestScore:
                bestScore = v
                bestAction = action
        return bestAction


    
    elif player(board) == O:
        v = math.inf
        bestScore = math.inf
        bestAction = None

        for action in actions(board):
            v = max_value(result(board, action))
            if v < bestScore:
                bestScore = v
                bestAction = action
        return bestAction

def max_value(board):
    if terminal(board):
        return utility(board)
    v = -math.inf
    for action in actions(board):
        v = max(v, min_value(result(board, action)))
    return v

def min_value(board):
    if terminal(board):
        return utility(board)
    v = math.inf
    for action in actions(board):
        v = min(v, max_value(result(board, action)))

    return v