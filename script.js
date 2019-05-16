console.log("sanity check");

var board = document.getElementsByClassName("board")[0];
var playerTurn = 1;
var html = "";
var rows = 7;

for (var i = 0; i < rows*rows; i++) {
    html += "<div class='square'><div class='inner-square'></div></div>";
}

board.innerHTML = html;

board.addEventListener("click", function(e) {
    e.stopPropagation();
    if (playerTurn === 1) {
        e.target.classList.add('btp1');
        e.target.classList.add('bbp1');
        e.target.classList.add('blp1');
        e.target.classList.add('brp1');
    } else {
        e.target.classList.add('blp2');
        e.target.classList.add('brp2');
        e.target.classList.add('btp2');
        e.target.classList.add('bbp2');
    }
    changeTurn();
});



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
