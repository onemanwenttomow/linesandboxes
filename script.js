console.log("sanity check");

var board = document.getElementsByClassName("board")[0];
var playerTurn = 1;
var dotsRow = "";
var html = "";
var squaresRow = "";
var rows = Math.floor(Math.random() * 5) + 3;

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
    console.log("nextSibling ", e.target.nextSibling );

    row[0] == "h" ? horizontalCheck(e.target, row) : verticalCheck(e.target, row);
    changeTurn();
});

function horizontalCheck(node, row) {
    var topScore = 0;
    var bottomScore = 0;
    var bottomSquare, topSquare;
    var col = node.classList[1][2];
    topScore += checkForCompletedSquare(node , row, 2, "top");
    topScore += checkForCompletedSquare(node , row, 1);
    bottomScore += checkForCompletedSquare(node , row, 2, "bottom");
    bottomScore += checkForCompletedSquare(node , row, -1);
    console.log("checking top");
    if (!node.parentNode.parentNode.children[Number(row[1]) * 2 + 1]) {
        bottomSquare = [];
    } else {
        bottomSquare = node.parentNode.parentNode.children[Number(row[1]) * 2 + 1].children[Number(col)  * 2 + 1];
    }
    if (!node.parentNode.parentNode.children[Number(row[1]) * 2  -1]) {
        topSquare = [];
    } else {
        topSquare = node.parentNode.parentNode.children[Number(row[1]) * 2 - 1].children[Number(col)  * 2 + 1];
    }
    bottomScore === 4 && fillBoxWithPlayer(bottomSquare);
    topScore === 4 && fillBoxWithPlayer(topSquare);
    topScore === 4 && changeTurn();
    bottomScore === 4 && changeTurn();
    bottomScore === 4 && topScore === 4 && changeTurn();
}

function verticalCheck(node, row) {
    var leftScore = checkForCompletedSquareVertical(node, row, "left");
    var rightScore = checkForCompletedSquareVertical(node, row, "right");
    leftScore === 4 && fillBoxWithPlayer(node.nextSibling);
    rightScore === 4 && fillBoxWithPlayer(node.previousSibling);
    leftScore === 4 && changeTurn();
    rightScore === 4 && changeTurn();
    rightScore === 4 && leftScore === 4 && changeTurn();

}

function checkForCompletedSquareVertical(node, row, leftOrRight) {
    console.log(node);
    var numberOfLines = 0;
    var colNum = node.classList[1][2];
    var rowAboveAndBelow = node.parentNode.parentNode.children;
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
    console.log("node", node, row, top, topOrBottom);
    var numberOfLines = 0;
    var rowNum = row[1];
    var rowAbove = {};
    var rowBelow = {};
    var arrayToCheck;
    rowNum == 0 ? rowAbove.children = [] : rowAbove = node.parentNode.parentNode.children[rowNum * 2 - top];
    rowNum == rows ? rowBelow.children = [] : rowBelow = node.parentNode.parentNode.children[rowNum * 2 + top];
    rowNum == 0 ? arrayToCheck = node.parentNode.parentNode.children[rowNum * 2 - top] : arrayToCheck = rowAbove;
    var colNum = node.classList[1];
    console.log("rowAbove: ", node.parentNode.parentNode.children[rowNum * 2 - top]);
    console.log("ARRAY TO CHECK", arrayToCheck);
    console.log("rows",rows, "rowNum", rowNum);
    console.log("rowBelow:" ,node.parentNode.parentNode.children[rowNum * 2 + top]);
    console.log("arrayToCheck", top, rowNum, arrayToCheck, rowBelow, rowAbove);
    if (!arrayToCheck) { return; }

    for (var k = 0; k < arrayToCheck.children.length; k++) {
        console.log("MADE IT");
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
        return true;
    }
}

function checkForPlayerLine(node) {
    if (!node) { return false; }
    if (node.classList[2] == "p1" || node.classList[2] == "p2") {
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
