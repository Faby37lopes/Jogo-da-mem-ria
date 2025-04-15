const emojis = ['🐶', '🐱', '🦊', '🐼', '🦁', '🐮', '🐵', '🐸'];
let cards = [...emojis, ...emojis];
let flippedCards = [];
let matchedCards = [];
let attemptCount = 0;

const gameContainer = document.querySelector('.game-container');
const winMessage = document.getElementById('win-message');
const attemptDisplay = document.getElementById('attemptCount');

// Embaralha as cartas
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Cria o tabuleiro
function createCards() {
  gameContainer.innerHTML = '';
  cards = shuffle(cards);
  cards.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.innerText = '';
    card.addEventListener('click', flipCard);
    gameContainer.appendChild(card);
  });
}

// Lógica para virar carta
function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('flipped')) return;

  this.classList.add('flipped');
  this.innerText = this.dataset.emoji;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    attemptCount++;
    attemptDisplay.innerText = attemptCount;
    checkMatch();
  }
}

// Verifica se as cartas são iguais
function checkMatch() {
  const [firstCard, secondCard] = flippedCards;
  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

  if (isMatch) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCards.push(firstCard, secondCard);
    flippedCards = [];
    checkWin();
  } else {
    setTimeout(() => {
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.innerText = '';
      });
      flippedCards = [];
    }, 1000);
  }
}

// Verifica se venceu
function checkWin() {
  if (matchedCards.length === cards.length) {
    winMessage.style.display = 'block';
  }
}

// Reinicia o jogo
function restartGame() {
  flippedCards = [];
  matchedCards = [];
  attemptCount = 0;
  attemptDisplay.innerText = 0;
  winMessage.style.display = 'none';
  createCards();
}

// Começa o jogo ao carregar a página
createCards();
