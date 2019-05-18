console.log("sanity check");

var board = document.getElementsByClassName("board")[0];
var playerTurn = 1;
var dotsRow = "";
var html = "";
var squaresRow = "";
var rows = 6;

for (var i = 0; i < rows; i++) {
    dotsRow += `<div class="dot"></div><div class="hl hl${i}"></div>`;
    squaresRow += '<div class="vl"></div><div class="square"></div>';
}
var completeRow = `<div class="row h${rows}">${dotsRow}<div class="dot"></div></div>`;

for (var j = 0; j < rows; j++) {
    html += `<div class="row h${j}">${dotsRow}<div class="dot"></div></div>`
     + `<div class="row v${j}">${squaresRow}<div class="vl"></div></div>`;
}
html += completeRow;

board.innerHTML = html;

board.addEventListener("click", function(e) {
    e.stopPropagation();
    var row = e.target.parentNode.classList[1];
    if (nonClicks(e.target)) { return; }

    console.log("this was clicked on", e.target);
    if (row[0] == "h") {
        horizontalCheck(e.target, row);
    } else {
        console.log("vertical check");
    }
    if (playerTurn === 1) {

    } else {

    }
    changeTurn();
});

function horizontalCheck(node, row) {
    var rowNum = row[1];
    var rowAbove = {};
    var rowBelow = {};
    var arrayToCheck;
    rowNum == 0 ? rowAbove.children = [] : rowAbove = node.parentNode.parentNode.children[rowNum*2 - 2];
    rowNum == rows ? rowBelow.children = [] : rowBelow = node.parentNode.parentNode.children[rowNum*2 + 2];
    rowNum == 0 ? arrayToCheck = rowBelow : arrayToCheck = rowAbove;
    var colNum = node.classList[1];
    for (var k = 0; k < arrayToCheck.children.length; k++) {
        if (colNum == arrayToCheck.children[k].classList[1]) {
            console.log("element above: ", rowAbove.children[k]);
            console.log("element clicked on: ", node);
            console.log("element below: ", rowBelow.children[k]);
        }
    }
}

function nonClicks(node) {
    if (node.classList[0] === "square" || node.classList[0] === "dot") {
        console.log("made it here");
        return true;
    }
}

function fillBoxWithPlayer(node) {
    if (playerTurn === 1) {
        node.classList.add('player' + playerTurn);
        node.innerHTML = "🦔";
    } else {
        node.classList.add('player' + playerTurn);
        node.innerHTML = "🐢";
    }
}


function changeTurn() {
    if (playerTurn === 1) {
        // p1.classList.remove('p1-active');
        // p2.classList.add('p2-active');
        playerTurn = 2;
    } else {
        // p2.classList.remove('p2-active');
        // p1.classList.add('p1-active');
        playerTurn = 1;
    }
}
