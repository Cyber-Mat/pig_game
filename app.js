/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 (or set) points on GLOBAL score wins the game
- If a player rolls 6 two consecutive times, the player loses all scores 

*/


let scores, roundScore, activePlayer, gamePlaying, currentScore, winningScore;

//Set all default values to zero
backToBase();

function backToBase() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    currentScore = [];



    //State variable
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};


//Roll function
function roll() {
    if (gamePlaying) {
        // Generate random number for each dice roll
        let dice = Math.floor(Math.random() * 6) + 1;
        currentScore.push(dice);

        // Display dice with generated number
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.setAttribute('src', 'dice-' + dice + '.png');

        // Change player if dice roll = 1
        if (dice === 1) {
            changePlayer();

        } else if (dice === 6) {
            // If player rolls two 6 consecutively
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;

            let previousTotal = currentScore[currentScore.length - 1] + currentScore[currentScore.length - 2];
            if (previousTotal === 12) {
                roundScore = 0;
                scores[activePlayer] = 0;
                document.getElementById('current-' + activePlayer).textContent = roundScore;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

                changePlayer();
            }
            // Update total score if dice roll > 1
        } else {
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        };
    };
};

//Hold funtion
function hold() {
    if (gamePlaying) {
        //1. Update total scores
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //2. Check if player won
        let winningDOM = document.querySelector('.set-winner').value;
        winningDOM === '' ? winningDOM = 100 : winningDOM;
        winningScore = winningDOM;

        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';

            //State variable
            gamePlaying = false;
        } else {
            //3. Change active player
            changePlayer();
        };
    };
};

function changePlayer() {
    roundScore = 0;
    currentScore = [];
    document.getElementById('current-' + activePlayer).textContent = roundScore;

    activePlayer === 0 ? activePlayer++ : activePlayer--;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
};

//Listeners
document.querySelector('.btn-roll').addEventListener('click', roll);
document.querySelector('.btn-hold').addEventListener('click', hold);
//New game
document.querySelector('.btn-new').addEventListener('click', backToBase);