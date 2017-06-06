/*
var gameBoard = {
    start : function() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        var boardSize = 0.9;
        if (w > h) {
            $("#board").width = h * boardSize;
        } else {
            $("#board").width = w * boardSize;
        }
        $("#board").height = $("#board").width;
    }
}

var quadrant = {
        
}

var gamePiece = {
    var placement,
    place(opt) {
        if (!placement) {
            placement = opt
        }
    ,}
}



var three = [
    ["a","b","c"],
    ["d","e","f"],
    ["g","h","i"]
]

var four = [
    ["a","b","c","d"],
    ["e","f","g","h"],
    ["i","j","k","l"],
    ["m","n","o","p"]
]

function rotate(inputArray, direction) {
    // direction is Boolean: 0 is counter-clockwise, 1 is clockwise
    var n2;
    var i2;
    var outputArray = [];

    for (i = 0; i < inputArray.length; i++) {
        i2 = (inputArray.length - 1) - i;
        outputArray[i] = [];
        for (n = 0; n < inputArray[i].length; n++) {
            n2 = (inputArray.length - 1) - n;
            if (direction) {
                outputArray[i].push(inputArray[n2][i]);
            } else {
                outputArray[i].push(inputArray[n][i2]);
            }
        }
    }
    
    for (a = 0; a < inputArray.length; a++) {
        inputArray[a] = outputArray[a].slice();
    }
    display(inputArray);
}

function display(inputArray) {
    for (i = 0; i < inputArray.length; i++) {
        var displayLine = inputArray[i].toString() + "\n"
        console.log(displayLine);
    }
}


var gamePieces = document.getElementsByClassName("piece");

gamePieces.forEach(function(element) {
    element.addEventListener(onclick, place())
}, this);

function place() {
    this.fill = "white";
}

for (var i = 0; i < 4; i++) {
    var quad = function() {
        if (i = 0) {
            return "nw";
        } else if (i = 1) {
            return "ne";
        } else if (i = 2) {
            return "sw";
        } else {
            return "se";
        }
    }
    for (var n = 0; n < gamePieces.length; n++) {
        
    }
}

for (var i = 0; i < gamePieces.length; i++)
    var quad = function() {
        if i 
    }
    */
var whiteTurn = true;

function pieceClick(target) {
    //if (target.fill == "crimson") {

        if (whiteTurn) {
            target.setAttribute("fill", "white");
            whiteTurn = false;
        } else {
            target.setAttribute("fill", "black");
            whiteTurn = true;
        }
    //}
}
