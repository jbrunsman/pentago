


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

