/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


let scores, totalScore, activePlayer;

scores = [0,0];
totalScore = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none';

function btn () {
    // 1. Generate random number for each dice roll
    let dice = Math.floor(Math.random() * 6) + 1; 
    document.querySelector('#current-' + activePlayer).textContent = dice;
    
    //2. Display generated dice number
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.setAttribute('src', 'dice-' + dice + '.png');
    
    //3. Update total score if dice roll > 1
    if (dice>1) {
        document.querySelector('#score-' + activePlayer).textContent = totalScore + dice;
    } else {
        document.querySelector('#score-' + activePlayer).textContent = totalScore;
    }
    
} 

document.querySelector('.btn-roll').addEventListener('click', btn);