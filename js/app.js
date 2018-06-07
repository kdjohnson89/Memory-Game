/*
 * Create a list that holds all of your cards
 */

/*
Tutorial provided by Mike Wales via https://www.youtube.com/watch?reload=9&reload=9&v=_rUH-sEs68Y&app=desktop 
*/

const cards = ['fa-diamond', 'fa-diamond',
             'fa-paper-plane-o', 'fa-paper-plane-o',
             'fa-anchor', 'fa-anchor',
             'fa-bolt', 'fa-bolt',
             'fa-cube', 'fa-cube',
             'fa-leaf', 'fa-leaf',
             'fa-bicycle', 'fa-bicycle',
             'fa-bomb', 'fa-bomb'];

//Function that returns HTML for each card
function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  } 

  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//Passing in each card and turning it into an HTML string

function initGame() {
  startTimer();
  let deck = document.querySelector('.deck');
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
 
  deck.innerHTML = cardHTML.join('');
  
  let allCards = document.querySelectorAll('.card');
  let openCards = [];  
  
allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {
    
    if (
      !card.classList.contains('open') &&
      !card.classList.contains('show') &&
      !card.classList.contains('match')
    ) {
      openCards.push(card);
      card.classList.add('open', 'show');
      
      if (openCards.length == 2) {
        moveCount();
        //If cards match, leave facing up
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
          openCards[0].classList.add('match');
          openCards[0].classList.add('open');
          openCards[0].classList.add('show');
          
          openCards[1].classList.add('match');
          openCards[1].classList.add('open');
          openCards[1].classList.add('show');
          
          openCards = [];
          
          winGame();
        } else {
          //If cards do not match, flip cards back over
          setTimeout(function() {
            openCards.forEach(function(card) {
              card.classList.remove('open', 'show');
            });
            openCards = [];
          }, 1000);
        } 
      }
    }
  });
});
// Timer that resets with restart/play again buttons
let timer = document.querySelector('.timer');
var timing; 
let second = 0; 

function startTimer() {
    timing = window.setInterval(function () {
          timer.innerHTML = second + " secs";
            second++;
        }, 1000);
}
  
function resetTimer() {
  clearInterval(timing);
}

document.querySelector('.restart').addEventListener('click', resetTimer);  

//Move counter
let moves = 0;
let moveCounter = document.querySelector('.moves');
let stars = document.querySelector('.stars');
let one = document.querySelector('.one');
let two = document.querySelector('.two');
  
function moveCount() {
  moves++;
  moveCounter.innerHTML = moves;
//Begin removing stars based on move count  
  if (moves > 12 && moves < 15) {
    one.style.visibility = 'hidden';
  }
  else if (moves > 17) {
    two.style.visibility = 'hidden';
  } 
}
  
/*
Modal- tutorial from https://www.w3schools.com/howto/howto_css_modals.asp
*/
//When all cards match, change modal css so that modal is shown
let matchedCards = document.getElementsByClassName('match');
let modal = document.querySelector('.modal');
let finalTime = document.querySelector('.finalTime');
let finalRating = document.querySelector('.finalRating');
let finalMoves = document.querySelector('.finalMoves');

function winGame() {  
  if (matchedCards.length === 16) {
    modal.style.display = "block";
    finalRating.innerHTML = stars.innerHTML;
    finalMoves.innerHTML = moveCounter.innerHTML;
    finalTime.innerHTML = timer.innerHTML;
  }
}
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
//Play again button will clear modal and reset timer
document.querySelector('.button').addEventListener('click', playAgain);
document.querySelector('.button').addEventListener('click', resetTimer);
document.querySelector('.restart').addEventListener('click', playAgain);

function playAgain() {
  modal.style.display = "none";
  moveCounter.innerHTML = 0;
  one.style.visibility = 'visible';
  two.style.visibility = 'visible';
}  
  
}

initGame();



