console.log("sanity check");

var board = document.getElementsByClassName('board')[0];
var rows = '';
var html = '';
var boardSize = 6;
var playerTurn = 1;

for (var i = 0; i < boardSize; i++) {
    rows += '<div class="row row' + i + '"></div>';
}

for (var j = 0; j < boardSize; j++) {
    html += '<div class="col col'+ j + '">'+ rows + '</div>';
}

board.innerHTML = html;

board.addEventListener('click', function(e){
    e.stopPropagation();
    // console.log(e.target.classList);
    // console.log(e);
    if (e.offsetY < 10) {
        if (e.target.classList.contains('border-top')) {
            return;
        }
        playerTurn === 1 ? e.target.classList.add('border-top') : e.target.classList.add('border-top-player2');
        playerTurn === 1 ? playerTurn = 2 : playerTurn = 1;
    } else if (e.offsetX < 10) {
        if (e.target.classList.contains('border-left')) {
            return;
        }
        playerTurn === 1 ? e.target.classList.add('border-left') : e.target.classList.add('border-left-player2');
        playerTurn === 1 ? playerTurn = 2 : playerTurn = 1;
    }
});
