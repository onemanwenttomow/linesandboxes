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
    var markedSides = 0;
    var rows = document.getElementsByClassName("row"+row);
    console.log(rows);
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].parentNode.classList.contains("col" + col)) {
            console.log(`******************************

                         ******************************
                `);
            // console.log(rows[i -1], rows[i], rows[i + 1], rows[i].parentNode.children[Number(row) + 1], rows[i].parentNode.children[Number(row) - 1]);

            // checkTop(side, rows[i]) ? markedSides++ : markedSides += 0;
            // checking top
            checkTop(rows[i].parentNode.children[Number(row) + 1]) ? markedSides++ : markedSides += 0;
            checkTop(rows[i].parentNode.children[Number(row) - 1]) ? markedSides++ : markedSides += 0;
            // checking sides
            checkTop(rows[i]) ? markedSides++ : markedSides += 0;
            checkTop(rows[i - 1]) ? markedSides++ : markedSides += 0;
            checkTop(rows[i + 1]) ? markedSides++ : markedSides += 0;
            console.log("markedSides after all checks, ", markedSides);

            if (markedSides === 4) {
                if (playerTurn === 1) {
                    rows[i].classList.add('player' + playerTurn);
                    rows[i].innerHTML = "🦔";
                    changeTurn();
                } else {
                    rows[i].classList.add('player' + playerTurn);
                    rows[i].innerHTML = "🐢";
                    changeTurn();
                }
            }

        }
    }
}

function checkTop(node) {
    if (node.classList.contains("border-top") ||
        node.classList.contains("border-top-player2") ||
        node.classList.contains("border-left") ||
        node.classList.contains("border-left-player2")
    ) {
        console.log("true for in top: ", node);
        return true;
    }
    if (node.classList.contains("border-left") || node.classList.contains("border-left-player2")) {
        console.log("true for in left: ", node);
        return true;
    }
}
