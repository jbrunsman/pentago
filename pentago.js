function populateBoard() {
    var board = [];
    for (quad = 0; quad < 4; quad++) {
        board[quad] = [];
        for (row = 0; row < 3; row++) {
            board[quad][row] = [];
            for (col = 0; col < 3; col++) {
                board[quad][row][col] = 0;
            }
        }
    }
    return board;
}

var gameBoard = populateBoard();
var whiteTurn = false;
var rotateTurn = false;

function pieceClick(target, quad, row, col) {

    if (gameBoard[quad][row][col] == 0 && rotateTurn === false) {

        if (whiteTurn) {
            gameBoard[quad][row][col] = 1;
            refreshBoard();
        } else {
            gameBoard[quad][row][col] = -1;
            refreshBoard();
        }
    rotateTurn = true;
    }
}

function refreshBoard() {
    for (quad = 0; quad < gameBoard.length; quad++) {
        currentQuad = "quad" + quad;
        board = document.getElementById(currentQuad);
        for (row = 0; row < gameBoard[quad].length; row++) {
            currentRow = "row" + row;
            workingRow = board.getElementById(currentRow);
            for (col = 0; col < gameBoard[quad][row].length; col++) {
                pieces = workingRow.getElementsByClassName("piece");
                if (gameBoard[quad][row][col] === 1) {
                    pieces[col].setAttribute("fill", "white");
                } else if (gameBoard[quad][row][col] === -1) {
                    pieces[col].setAttribute("fill", "black");
                } else {
                    pieces[col].setAttribute("fill", "crimson");
                }
            }
        }
    }
}

function rotateQuad(quad, direction) {
    if (rotateTurn === false) {
        return;
    }

    // direction is Boolean: 0 is counter-clockwise, 1 is clockwise
    var n2;
    var i2;
    var outputArray = [];

    for (i = 0; i < gameBoard[quad].length; i++) {
        i2 = (gameBoard[quad].length - 1) - i;
        outputArray[i] = [];
        for (n = 0; n < gameBoard[quad][i].length; n++) {
            n2 = (gameBoard[quad].length - 1) - n;
            if (direction) {
                outputArray[i].push(gameBoard[quad][n2][i]);
            } else {
                outputArray[i].push(gameBoard[quad][n][i2]);
            }
        }
    }
    
    for (a = 0; a < gameBoard[quad].length; a++) {
        gameBoard[quad][a] = outputArray[a].slice();
    }
    whiteTurn = !whiteTurn;
    rotateTurn = false;
    refreshBoard();
}