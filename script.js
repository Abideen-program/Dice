'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const current0 = document.querySelector('.current--0');
const current1 = document.querySelector('.current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal-text');
const closeModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');

let currentScore, activePlayer, scores, playing;

const intializingGame = () => {
  //starting game condition
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  //hide dice and set score to zero on UI
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  // setting total initial score color
  score0El.classList.add('score-init');
  score1El.classList.add('score-init');

  //remove total winning score color
  score0El.classList.remove('score-win');
  score1El.classList.remove('score-win');

  // setting current score initial color and background
  current0.classList.add('current-init');
  current1.classList.add('current-init');

  // removing curring winnig score color and background
  current0.classList.remove('current-win');
  current1.classList.remove('current-win');

  //remove player winner from both players
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  //add player active to player 1
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

intializingGame();

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
  if (scores[activePlayer] >= 100) {
    //change the playing condtion
    playing = false;

    //hide the dice roll
    diceEl.classList.add('hidden');

    //add the winning background color
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    // change the player and total score color
    document
      .getElementById(`score--${activePlayer}`)
      .classList.remove('score-init');

    document
      .getElementById(`score--${activePlayer}`)
      .classList.add('score-win');

    // change the current section background and color
    document
      .querySelector(`.current--${activePlayer}`)
      .classList.remove('current-init');

    document
      .querySelector(`.current--${activePlayer}`)
      .classList.add('current-win');

    //display modal & overlay
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    modalText.textContent = `Player ${activePlayer + 1} wins`;
  } else {
    // if not switch player
    switchPlayer();
  }
});

closeModal.addEventListener('click', function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});

btnNew.addEventListener('click', intializingGame);
