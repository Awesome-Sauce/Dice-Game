/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Game Vars
let scores, roundScore, activePlayer, gamePlaying;

// DOM
let diceDOM = document.querySelector('.dice');
let currentScoreDOM = document.querySelector('#current-0');

// Initalize the game vars for a new game
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // Get Roll
        let diceRoll = Math.floor(Math.random() * 6) + 1;
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + diceRoll + '.png';
        
        // Only add diceRoll if the roll is not a 1
        if (diceRoll !== 1) {
            roundScore += diceRoll;
            currentScoreDOM.textContent = roundScore;
        } else {
            // Switch active player
            nextPlayer();
        }
    }    
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add points from current round and update UI
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        // Check if game is won (score >= 100), else next player turn
        if (scores[activePlayer] >= 100) {
            gamePlaying = false;
            document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
            diceDOM.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            nextPlayer();
        }
    }    
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    // Clear the current score and dice
    roundScore = 0;
    currentScoreDOM.textContent = 0;
    diceDOM.style.display = 'none';
    
    // Toggle the active player marker        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    // Switch active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    currentScoreDOM = document.querySelector('#current-' + activePlayer);
};

function init() {
    // Reset game vars
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    currentScoreDOM = document.querySelector('#current-0');

    // Clear dice roll
    document.querySelector('.dice').style.display = 'none';

    // Clear scores for new game
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Initalize Player names, set active player tag, and remove winner tag
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    // This is added after the removal because it could potentially put 2 tags on one player
    document.querySelector('.player-0-panel').classList.add('active');
}



