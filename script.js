const wordList = ["APPLE", "BANAN", "CHURR", "DUVET", "EAGLE", "FLAME", "GRANT", "HYENA", "INANE", "JOKER"];

let selectedWord = "";
let guessedLetters = new Array(5).fill(null);
let guessesRemaining = 6;

function pickRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function initializeGame() {
  selectedWord = pickRandomWord();
  guessedLetters = new Array(5).fill(null);
  guessesRemaining = 6;
  updateWordDisplay();
  updateKeyboard();
  updateGuessesRemaining();
  showMessage("");
}

function updateWordDisplay() {
  const wordDisplayElement = document.getElementById("wordDisplay");
  wordDisplayElement.innerHTML = guessedLetters
    .map((letter, index) => `<div class="letter ${letter ? (letter === selectedWord[index] ? "correct" : "incorrect") : ""}">${letter || ""}</div>`)
    .join('');
}

function updateKeyboard() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const keyboardElement = document.getElementById("keyboard");
  keyboardElement.innerHTML = alphabet
    .split('')
    .map((letter) => `<div class="letter" onclick="selectLetter('${letter}')">${letter}</div>`)
    .join('');
}

function selectLetter(letter) {
  if (!guessedLetters.includes(letter)) {
    const emptySlotIndex = guessedLetters.indexOf(null);
    if (emptySlotIndex !== -1) {
      guessedLetters[emptySlotIndex] = letter;
      updateWordDisplay();
    }
  }
}

function checkWord() {
  const guessedWord = guessedLetters.join('');
  if (guessedWord === selectedWord) {
    showMessage("Congratulations! You've guessed the word!");
  } else {
    guessesRemaining--;
    updateGuessesRemaining();
    if (guessesRemaining === 0) {
      showMessage(`Game over! The word was "${selectedWord}".`);
    }
  }
}

function resetGame() {
  initializeGame();
}

function updateGuessesRemaining() {
  const guessesRemainingElement = document.getElementById("guessesRemaining");
  guessesRemainingElement.textContent = `Guesses remaining: ${guessesRemaining}`;
}

function showMessage(message) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
}

initializeGame();
