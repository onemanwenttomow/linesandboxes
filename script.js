console.log("sanity check");

var board = document.getElementsByClassName("board")[0];
var playerTurn = 1;
var dotsRow = "";
var html = "";
var squaresRow = "";
var rows = 6;

for (var i = 0; i < rows; i++) {
    dotsRow += `<div class="dot"></div><div class="hl hl${i}"></div>`;
    squaresRow += `<div class="vl vl${i}"></div><div class="square"></div>`;
}
var completeRow = `<div class="row h${rows}">${dotsRow}<div class="dot"></div></div>`;

for (var j = 0; j < rows; j++) {
    html += `<div class="row h${j}">${dotsRow}<div class="dot"></div></div>`
     + `<div class="row v${j}">${squaresRow}<div class="vl vl${rows}"></div></div>`;
}
html += completeRow;

board.innerHTML = html;

board.addEventListener("click", function(e) {
    e.stopPropagation();
    var row = e.target.parentNode.classList[1];
    if (nonClicks(e.target)) { return; }
    if (e.target.classList[2] == "p1" || e.target.classList[2] == "p1" ) {
        return;
    }
    e.target.classList.add("p" + playerTurn);

    row[0] == "h" ? horizontalCheck(e.target, row) : verticalCheck(e.target, row);


    changeTurn();
});

function horizontalCheck(node, row) {
    var topScore = 0;
    var bottomScore = 0;
    topScore += checkForCompletedSquare(node , row, 2, "top");
    topScore += checkForCompletedSquare(node , row, 1);

    console.log("topScore", topScore);
    bottomScore += checkForCompletedSquare(node , row, 2, "bottom");
    bottomScore += checkForCompletedSquare(node , row, -1);

    console.log("bottomScore", bottomScore);
}

function verticalCheck(node, row) {
    var leftScore = checkForCompletedSquareVertical(node, row, "left");
    var rightScore = checkForCompletedSquareVertical(node, row, "right");
    console.log("rightScore", rightScore, node);
    console.log("leftScore", leftScore, node);

}

function checkForCompletedSquareVertical(node, row, leftOrRight) {
    var numberOfLines = 0;
    var colNum = node.classList[1][2];
    var rowAboveAndBelow = node.parentNode.parentNode.children;
    console.log(node);
    checkForPlayerLine(node) && numberOfLines++;
    if (leftOrRight == "left") {
        node.classList[1] && checkForPlayerLine(node.parentNode.children[node.classList[1][2] * 2 + 2]) && numberOfLines++;
        checkForPlayerLine(rowAboveAndBelow[Number(row[1]) * 2].children[colNum * 2 + 1]) && numberOfLines++;
        checkForPlayerLine(rowAboveAndBelow[Number(row[1]) * 2 + 2].children[colNum * 2 + 1]) && numberOfLines++;

    } else {
        node.classList[1] && checkForPlayerLine(node.parentNode.children[node.classList[1][2] * 2 - 2]) && numberOfLines++;
        checkForPlayerLine(rowAboveAndBelow[Number(row[1]) * 2].children[colNum * 2 - 1], row) && numberOfLines++;
        checkForPlayerLine(rowAboveAndBelow[Number(row[1]) * 2 + 2].children[colNum * 2 - 1], row) && numberOfLines++;
    }
    return numberOfLines;
}

function checkForCompletedSquare(node, row, top, topOrBottom) {
    var numberOfLines = 0;
    var rowNum = row[1];
    var rowAbove = {};
    var rowBelow = {};
    var arrayToCheck;
    rowNum == 0 ? rowAbove.children = [] : rowAbove = node.parentNode.parentNode.children[rowNum*2 - top];
    rowNum == rows ? rowBelow.children = [] : rowBelow = node.parentNode.parentNode.children[rowNum*2 + top];
    rowNum == 0 ? arrayToCheck = rowBelow : arrayToCheck = rowAbove;
    var colNum = node.classList[1];

    if (!arrayToCheck) { return; }

    for (var k = 0; k < arrayToCheck.children.length; k++) {
        if (top === 2) {
            if (colNum == arrayToCheck.children[k].classList[1]) {
                checkForPlayerLine(node) && numberOfLines ++;
                topOrBottom == "top" && checkForPlayerLine(rowAbove.children[k]) && numberOfLines ++;
                topOrBottom == "bottom" && checkForPlayerLine(rowBelow.children[k]) && numberOfLines ++;

            }
        } else {
            var vertLineToCheck = arrayToCheck.children[k];
            vertLineToCheck.classList[1] &&
            vertLineToCheck.classList[1][2] == colNum[2] &&
                checkForPlayerLine(vertLineToCheck) && numberOfLines ++;
            vertLineToCheck.classList[1] &&
            vertLineToCheck.classList[1][2] == Number(colNum[2]) + 1  &&
                checkForPlayerLine(vertLineToCheck) && numberOfLines ++;
        }
    }
    return numberOfLines;
}

function nonClicks(node) {
    if (node.classList[0] === "square" || node.classList[0] === "dot") {
        console.log("made it here");
        return true;
    }
}

function checkForPlayerLine(node) {
    if (!node) { return false; }
    console.log(node);
    if (node.classList[2] == "p" + playerTurn) {
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
