'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
//starting game condition
diceEl.classList.add('hidden');
score0El.textContent = 0;
score1El.textContent = 0;

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

const switchPlayer = () => {
  // else change current score of active player to 0 and display it
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  // check the active player and swith to the next player
  activePlayer = activePlayer === 0 ? 1 : 0;

  //change the background of the new player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  // display the new player score
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

btnRoll.addEventListener('click', function () {
  //check if the playing condition is true;
  if (playing) {
    // generate random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //display dice roll
    diceEl.src = `images/dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    // check if dice is not equal to 1. If it is > 1 add to the current score.
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//holding dice function

btnHold.addEventListener('click', function () {
  // Add current score to total score and display
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  //if score is >= 100 the player wins
  if (scores[activePlayer] >= 20) {
    //change the playing condtion
    playing = false;

    //hide the dice roll
    diceEl.classList.add('hidden');

    //add the winning background color
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    // change the player and total score color
    document.getElementById(`score--${activePlayer}`).style.color = `#fff`;
    document.getElementById(`name--${activePlayer}`).style.color = `#fff`;

    // change the current section background and color
    document.querySelector(`.win-current--${activePlayer}`).style.color = `#60b347`
    document.querySelector(`.win-current--${activePlayer}`).style.backgroundColor = `#fff`
  } else {
    // if not switch player
    switchPlayer();
  }
});
