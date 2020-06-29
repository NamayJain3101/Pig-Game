/*

GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls 2 dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player's either dice rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach target points on GLOBAL score wins the game (Default target score is 100)

*/

function rules() {
    var div = $(event.target).text();
    if (div === "Rules") {
        document.querySelector('.wrapper').style.display = "none";
        document.querySelector('.detailed-rules').style.display = "block";
    }
    if (div === "Back To Game") {
        document.querySelector('.wrapper').style.display = "block";
        document.querySelector('.detailed-rules').style.display = "none";
    }
}

var scores, roundScore, activePlayer, gamePlaying, lastDice;

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('#dice1').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';

    document.getElementById('score-0').innerHTML = "0";
    document.getElementById('score-1').innerHTML = "0";
    document.getElementById('current-0').innerHTML = "0";
    document.getElementById('current-1').innerHTML = "0";

    document.querySelector('#name-0').innerHTML = "Player 1";
    document.querySelector('#name-1').innerHTML = "Player 2";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //Display result
        document.querySelector('#dice1').style.display = 'block';
        document.querySelector('#dice2').style.display = 'block';
        document.querySelector('#dice1').src = 'Images/dice-' + dice1 + '.png';
        document.querySelector('#dice2').src = 'Images/dice-' + dice2 + '.png';

        //Update round score
        if (dice1 !== 1 && dice2 !== 1) {
            //Add Score
            roundScore += (dice1 + dice2);
            document.getElementById('current-' + activePlayer).innerHTML = roundScore;
        } else {
            //Next Player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.getElementById('score-' + activePlayer).innerHTML = scores[activePlayer];

        var input = document.querySelector('.final-score').value;

        if (!input) {
            document.querySelector('.final-score').value = 100;
            input = 100;
        }

        //Check if player won the game
        if (scores[activePlayer] >= input) {
            document.querySelector('#name-' + activePlayer).innerHTML = "Winner !!";
            document.querySelector('#dice1').style.display = 'none';
            document.querySelector('#dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    if (activePlayer === 0)
        activePlayer = 1;
    else
        activePlayer = 0;

    roundScore = 0;
    document.getElementById('current-0').innerHTML = "0";
    document.getElementById('current-1').innerHTML = "0";

    document.querySelector(".player-0-panel").classList.toggle('active');
    document.querySelector(".player-1-panel").classList.toggle('active');

    document.querySelector('#dice1').style.display = 'block';
    document.querySelector('#dice2').style.display = 'block';
}

document.querySelector('.btn-new').addEventListener('click', init);