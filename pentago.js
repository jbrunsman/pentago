function populateBoard() {
    var board = [];
    for (var quad = 0; quad < 4; quad++) {
        board[quad] = [];
        for (var row = 0; row < 3; row++) {
            board[quad][row] = [];
            for (var col = 0; col < 3; col++) {
                board[quad][row][col] = 0;
            }
        }
    }
    return board;
}

var gameBoard = populateBoard();
var whiteTurn = true;
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
    for (var quad = 0; quad < gameBoard.length; quad++) {
        currentQuad = "quad" + quad;
        board = document.getElementById(currentQuad);
        for (var row = 0; row < gameBoard[quad].length; row++) {
            currentRow = "row" + row;
            workingRow = board.getElementById(currentRow);
            for (var col = 0; col < gameBoard[quad][row].length; col++) {
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

    for (var i = 0; i < gameBoard[quad].length; i++) {
        i2 = (gameBoard[quad].length - 1) - i;
        outputArray[i] = [];
        for (var n = 0; n < gameBoard[quad][i].length; n++) {
            n2 = (gameBoard[quad].length - 1) - n;
            if (direction) {
                outputArray[i].push(gameBoard[quad][n2][i]);
            } else {
                outputArray[i].push(gameBoard[quad][n][i2]);
            }
        }
    }
    
    for (var a = 0; a < gameBoard[quad].length; a++) {
        gameBoard[quad][a] = outputArray[a].slice();
    }
    whiteTurn = !whiteTurn;
    rotateTurn = false;
    refreshBoard();
    victoryCheck();
}

function flattenBoard() {
    var flat = [];
    var next;
    for (var quad = 0; quad < 3; quad += 2) {
        for (var row = 0; row < 3; row++) {
            for (col = 0; col < 6; col++) {
                if (col < 3) {
                    next = gameBoard[quad][row][col];
                } else {
                    next = gameBoard[quad+1][row][col-3];
                }
                flat.push(next);
            }
        }
    }
    return flat;
}

function victoryCheck() {
    var inspectionBoard = flattenBoard();
    var searchPoint, startPoint, startingCheckCount;
    var horizontal = true;

    for (var l = 0; l < 2; l++) {
        startPoint = 0;
        if (l == 1) {
            horizontal = false;
        }
        for (var i = 0; i < 12; i++) {
            var lastCheck = 0;
            if (i == 6 && horizontal == true) {
                startPoint = 1;
            }
            for (var n = 0; n < 5; n++) {
                if (horizontal == true) {
                    searchPoint = startPoint + n;
                } else {
                    searchPoint = startPoint + (n * 6);
                }
                if (inspectionBoard[searchPoint] == 0) {
                    break;
                }
                if (lastCheck != 0 && lastCheck != inspectionBoard[searchPoint]) {
                    break;
                }
                if (n == 4) {
                    victoryScreen(lastCheck);
                }
                lastCheck = inspectionBoard[searchPoint];
            }
            if (horizontal == true) {
                startPoint += 6;
            }else if (horizontal == false) {
                startPoint += 1;
            }
        }
    }
}

function victoryScreen(player) {
    if (player > 0) {
        console.log("White victory!")
    } else {
        console.log("Black victory!")
    }
}
