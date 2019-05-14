console.log("sanity check");

var board = document.getElementsByClassName("board")[0];
var rows = "";
var html = "";
var boardSize = 6;
var playerTurn = 1;

for (var i = 0; i < boardSize; i++) {
    rows += '<div class="row row' + i + '"></div>';
}

for (var j = 0; j < boardSize; j++) {
    html += '<div class="col col' + j + '">' + rows + "</div>";
}

board.innerHTML = html;

board.addEventListener("click", function(e) {
    e.stopPropagation();
    var row = e.target.classList[1].charAt(3);
    var col = e.target.parentNode.classList[1].charAt(3);
    console.log("row", row);
    console.log("col", col);

    if (e.offsetY < 10) {
        if (e.target.classList.contains("border-top")) { return; }
        playerTurn === 1
            ? e.target.classList.add("border-top")
            : e.target.classList.add("border-top-player2");
        checkForFill(row, col, "top");
        changeTurn();
    } else if (e.offsetX < 10) {
        if (e.target.classList.contains("border-left")) { return; }
        playerTurn === 1
            ? e.target.classList.add("border-left")
            : e.target.classList.add("border-left-player2");
        checkForFill(row, col, "left");
        changeTurn();
    }
});

function changeTurn() {
    playerTurn === 1 ? (playerTurn = 2) : (playerTurn = 1);
}

function checkForFill(row, col, side) {
    console.log("checking: ", row, col, side);

    console.log(document.getElementsByClassName("row"+row));
}
