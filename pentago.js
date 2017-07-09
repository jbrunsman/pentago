/*
This game uses these sounds from freesound:
Cartoon Pop by unfa ( http://freesound.org/people/unfa/sounds/245645/ )
Pop! by kwahmah ( http://freesound.org/people/kwahmah_02/sounds/260614/ )
Bamboo Swing C1 by InspectorJ ( http://freesound.org/people/InspectorJ/sounds/394452/ )
Bamboo Swing B9 by InspectorJ ( http://freesound.org/people/InspectorJ/sounds/394453/ )
Spacey 1up by GameAudio ( http://freesound.org/people/GameAudio/sounds/220173/ )
*/

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

// turn variables
var whiteTurn = true;
var rotateTurn = false;
var gameOver = false;

// rotation variables
var dragging = false;
var currentQuad;
var box;
var boxCenter = {}; // change this later to use stuff passed by "box" instead
var startMouseCoords = {};

function refreshBoard() {
    // visibile board reflects the internal board
    for (var quad = 0; quad < gameBoard.length; quad++) {
        currentQuad = "quad" + quad;
        board = document.getElementById(currentQuad);
        for (var row = 0; row < gameBoard[quad].length; row++) {
            currentRow = "row" + row;
            workingRow = board.getElementsByClassName(currentRow);
            for (var col = 0; col < gameBoard[quad][row].length; col++) {
                var piece = workingRow[col];
                if (gameBoard[quad][row][col] === 1) {
                    piece.setAttribute("fill", "white");
                } else if (gameBoard[quad][row][col] === -1) {
                    piece.setAttribute("fill", "black");
                } else {
                    piece.setAttribute("fill", "crimson");
                }
            }
        }
    }
}

function rotateQuad(quad, direction) {
    // direction is Boolean: 0 is counter-clockwise, 1 is clockwise

    if (rotateTurn === false) {
        return;
    }

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

    if (whiteTurn) {
        var rotatewhite = new Audio('sound/rotate_white.wav');
        rotatewhite.play();
    } else {
        var rotateblack = new Audio('sound/rotate_black.wav');
        rotateblack.play();
    }

    refreshBoard();
    checkPhase();
}

function checkPhase() {
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

    var inspectionBoard = flattenBoard();

    function victoryCheck(startIncr, checkIncr, winCombos, shelf) {
        var searchPoint;
        var lastCheck;
        var tail = checkIncr === 5 ? 4 : 0; // shortcut for right diagonals
        var startPoint = 0 + tail;
        for (var i = 0; i < winCombos; i++) {
            lastCheck = 0;
            if (i === winCombos / 2) {
                startPoint = shelf + tail;
            }
            for (var n = 0; n < 5; n++) {
                searchPoint = startPoint + (n * checkIncr);
                if (inspectionBoard[searchPoint] == 0) {
                    break;
                }
                if (lastCheck != 0 && lastCheck != inspectionBoard[searchPoint]) {
                    break;
                }
                if (n === 4) {
                    victoryScreen(lastCheck);
                }
                lastCheck = inspectionBoard[searchPoint];
            }
            startPoint += startIncr;
        }
    }

    victoryCheck(6, 1, 12, 1); // horizontal
    victoryCheck(1, 6, 12, 6); // vertical
    victoryCheck(1, 7, 4, 6); // diagonal from left
    victoryCheck(1, 5, 4, 6); // diagonal from right

    if (rotateTurn && !gameOver) {
        turnPhase();
    } else {
        rotateTurn = true;
    }
}

function turnPhase() {
    whiteTurn = !whiteTurn;
    rotateTurn = false;
    if (whiteTurn) {
        changeColor("black");
    } else {
        changeColor("white");
    }
}

function pieceClick(target, quad, row, col) {
    if (gameBoard[quad][row][col] == 0 && rotateTurn === false && gameOver === false) {
        if (whiteTurn) {
            gameBoard[quad][row][col] = 1;
            var popwhite = new Audio('sound/pop_white.wav');
            popwhite.play();
            refreshBoard();
        } else {
            gameBoard[quad][row][col] = -1;
            var popblack = new Audio('sound/pop_black.wav');
            popblack.play();
            refreshBoard();
        }
    checkPhase();
    }
}

function addQuadClickListener(list) {
    for (var i = 0; i < list.length; i++) {
        list[i].addEventListener("mousedown", function(ev) {
            if (rotateTurn === true && gameOver === false) {
                dragging = true;
                if (ev.preventDefault) { // prevent firefox image dragging
                    ev.preventDefault();
                }

                box = ev.target.parentElement;

                // to elevate selected quadrant while spinning
                // good enough for now, but look into this more later
                var pieceList = ev.target.getElementsByTagName("*");
                for (var i = 0; i < pieceList.length; i++) {
                    pieceList[i].appendChild(ev.target);
                }

                var field = box.getBoundingClientRect();
                boxCenter = {
                    x: (box.getAttribute("width") / 2) + field.left,
                    y: (box.getAttribute("height") / 2) + field.top
                }
                // get starting mouse coordinates on click
                startMouseCoords = {
                        x: ev.clientX,
                        y: ev.clientY
                }
            }
        });
    }
}

document.addEventListener("mousemove", function(ev) {
    if (dragging) {
        // get current mouse coordinates on drag
        var field = box.getBoundingClientRect();
        var currentMouseCoords = {
            x: ev.clientX,
            y: ev.clientY
        }

        var finalDegree;
        if ( currentMouseCoords.x !== startMouseCoords.x || currentMouseCoords.y !== startMouseCoords.y ) {
            var startDegree = Math.atan2( currentMouseCoords.y - boxCenter.y, currentMouseCoords.x - boxCenter.x );
            startDegree -= Math.atan2( startMouseCoords.y - boxCenter.y, startMouseCoords.x - boxCenter.x );
            finalDegree = (startDegree * (360 / (2 * Math.PI)));
        }
        
        if (finalDegree > 90 && finalDegree < 180) {
            finalDegree = 0;
            endingSnap(1);
        }
        if (finalDegree < 270 && finalDegree > 180 ) {
            finalDegree = 0;
            endingSnap(0);
        }
        
        if (finalDegree < -90 && finalDegree > -180) {
            finalDegree = 0;
            endingSnap(0);
        }
        if (finalDegree > -270 && finalDegree < -180 ) {
            finalDegree = 0;
            endingSnap(1);
        }

        box.style.transform = "rotate(" + finalDegree + "deg)";
    }
});

document.addEventListener("mouseup", function() {
    if (dragging) {
        dragging = false;
        box.style.transform = "rotate(0deg)"; 
    }
});

function endingSnap(rotateDirection) {
    dragging = false;
    var targetQuad = parseInt(box.id.slice(-1));
    rotateQuad(targetQuad,rotateDirection);
}

function victoryScreen(lastCheck) {
    gameOver = true;
    alert = document.getElementById("alert");
    alert.style.visibility = "visible";
    if (lastCheck >= 1) {
        changeColor("black");
        alert.innerHTML = "White victory!";
    } else if (lastCheck <= -1) {
        changeColor("white");
        alert.innerHTML = "Black victory!";
    }
    var victory = new Audio('sound/victory.wav');
    victory.play();
}

function changeColor(color) {
    // argument color is color of text
    wordsList = document.getElementsByClassName("words");
    for (var i = 0; i < wordsList.length; i++) {
        wordsList[i].style.color = color;
    }
    if (color === "white") {
        document.body.style.background = "black";
    } else if (color === "black") {
        document.body.style.background = "white";
    }
}

addQuadClickListener(document.getElementsByClassName("quad"));
