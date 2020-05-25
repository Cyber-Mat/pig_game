/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 or  custom set points on GLOBAL score wins the game
- If a player rolls double 6 twice consecutive times, the player loses all scores 

*/


let scores, roundScore, activePlayer, gamePlaying, currentScore, currentScore2, winningScore;

//Set all default values to zero
backToBase();

function backToBase() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    currentScore = [];
    currentScore2 = [];



    //State variable
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //document.querySelector('.dice').style.display = 'none';
    //document.querySelector('.dice2').style.display = 'none';
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

        let dice2 = Math.floor(Math.random() * 6) + 1;
        currentScore2.push(dice2);

        let dices = dice + dice2;

        // Display dice with generated number
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.setAttribute('src', 'dice-' + dice + '.png');

        let diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.setAttribute('src', 'dice-' + dice2 + '.png');

        // Change player if dice roll = 1
        if (dice === 1 || dice2 === 1) {
            changePlayer();

        } else if (dice === 6 && dice2 === 6) {
            // If player rolls double 6 twice consecutively
            roundScore += dices;
            document.getElementById('current-' + activePlayer).textContent = roundScore;

            let previousTotal = currentScore[currentScore.length - 1] + currentScore[currentScore.length - 2];
            let previousTotal2 = currentScore2[currentScore2.length - 1] + currentScore2[currentScore2.length - 2];
            if (previousTotal === 12 && previousTotal2 === 12) {
                roundScore = 0;
                scores[activePlayer] = 0;
                document.getElementById('current-' + activePlayer).textContent = roundScore;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

                changePlayer();
            }
            // Update total score if dice roll > 1
        } else {
            roundScore += dices;
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
        winningScore = document.querySelector('.set-winner').value;
        winningScore ? winningScore : winningScore = 100;

        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';

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
    document.querySelector('.dice2').style.display = 'none';
};

//Listeners
document.querySelector('.btn-roll').addEventListener('click', roll);
document.querySelector('.btn-hold').addEventListener('click', hold);
//New game
document.querySelector('.btn-new').addEventListener('click', backToBase);