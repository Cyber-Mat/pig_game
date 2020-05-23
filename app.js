/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


let scores, roundScore, activePlayer;

/*scores = [0,0];
roundScore = 0;
activePlayer = 0;*/

//Set all default values to zero

backToBase ();

function backToBase () {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

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
function roll () {
    // 1. Generate random number for each dice roll
    let dice = Math.floor(Math.random() * 6) + 1; 
    
    //2. Display dice with generated number
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.setAttribute('src', 'dice-' + dice + '.png');
    
    //3. Update total score if dice roll > 1
    if (dice !== 1) {
        roundScore+=dice;
        //Display updated score
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    
    //4. Change player if dice roll = 1
    } else {        
        changePlayer();
    };
};

//Hold funtion
function hold () {
    //1. Update total scores
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //2. Check if player won
    if (scores[activePlayer] >= 10) {
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.dice').style.display = 'none'; 
    } else {
        //3. Change active player
        changePlayer();
    }
};

document.querySelector('.btn-roll').addEventListener('click', roll);
document.querySelector('.btn-hold').addEventListener('click', hold);

function changePlayer () {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;

    activePlayer === 0 ? activePlayer++ : activePlayer--;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';    
};

//New game
document.querySelector('.btn-new').addEventListener('click', backToBase);