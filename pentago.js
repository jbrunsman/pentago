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
*/

var quad = [
    ["a","b","c"],
    ["d","e","f"],
    ["g","h","i"]
]

var pent = quad;

function rotate(inputArray, direction) {
    // direction is Boolean: 0 is counter-clockwise, 1 is clockwise
    var n2;
    var outputArray = [];

    for (i = 0; i < inputArray.length; i++) {
        i2 = (inputArray.length - 1) - i;
        outputArray[i] = inputArray[i].slice();
        for (n = 0; n < inputArray[i].length; n++) {
            n2 = (inputArray[n].length - 1) - n;
            if (direction) {
                outputArray[i][n] = inputArray[n2][i];
            } else {
                outputArray[i][n] = inputArray[n][i2];
            }
        }
    }
    
    display(outputArray);
}

function display(inputArray) {
    for (i = 0; i < inputArray.length; i++) {
        var displayLine = inputArray[i].toString() + "\n"
        console.log(displayLine);
    }
}
