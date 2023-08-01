const wordList = ["APPLE", "BANAN", "CHURR", "DUVET", "EAGLE", "FLAME", "GRANT", "HYENA", "INANE", "JOKER"];

let selectedWord = "";
let guessesRemaining = 6;
let guessedLetters = new Set();
let wordDisplayElement = document.getElementById("wordDisplay");
let keyboardElement = document.getElementById("keyboard");
let guessesRemainingElement = document.getElementById("guessesRemaining");
let messageElement = document.getElementById("message");

function pickRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function initializeGame() {
  selectedWord = pickRandomWord();
  guessedLetters.clear();
  guessesRemaining = 6;
  updateWordDisplay();
  updateKeyboard();
  guessesRemainingElement.textContent = `Guesses remaining: ${guessesRemaining}`;
  messageElement.textContent = "";
}

function updateWordDisplay() {
  wordDisplayElement.innerHTML = selectedWord
    .split('')
    .map((letter) => `<div class="letter ${guessedLetters.has(letter) ? "revealed" : ""}">${guessedLetters.has(letter) ? letter : ""}</div>`)
    .join('');
}

function updateKeyboard() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  keyboardElement.innerHTML = alphabet
    .split('')
    .map((letter) => `<div class="letter ${guessedLetters.has(letter) ? "guessed" : ""}" onclick="selectLetter('${letter}')">${letter}</div>`)
    .join('');
}

function selectLetter(letter) {
  if (!guessedLetters.has(letter)) {
    guessedLetters.add(letter);
    updateWordDisplay();
    updateKeyboard();
  }
}

function guessWord() {
  const guessedWord = [...guessedLetters].join('');
  if (guessedWord === selectedWord) {
    messageElement.textContent = "Congratulations! You've guessed the word!";
  } else {
    guessesRemaining--;
    guessesRemainingElement.textContent = `Guesses remaining: ${guessesRemaining}`;
    if (guessesRemaining === 0) {
      messageElement.textContent = `Game over! The word was "${selectedWord}".`;
    }
  }
}

function resetGame() {
  initializeGame();
}

initializeGame();
