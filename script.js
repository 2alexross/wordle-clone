// Wordle word list
const wordList = ["APPLE", "BANAN", "CHURR", "DUVET", "EAGLE", "FLAME", "GRANT", "HYENA", "INANE", "JOKER"];

let selectedWord = "";
let guessedLetters = new Set();
let guessesRemaining = 6;

function pickRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function initializeGame() {
  selectedWord = pickRandomWord();
  guessedLetters.clear();
  guessesRemaining = 6;
  updateWordDisplay();
  updateKeyboard();
  updateGuessesRemaining();
  showMessage("");
}

function updateWordDisplay() {
  const wordDisplayElement = document.getElementById("wordDisplay");
  wordDisplayElement.innerHTML = selectedWord
    .split('')
    .map((letter) => `<div class="letter ${guessedLetters.has(letter) ? "revealed" : ""}">${guessedLetters.has(letter) ? letter : ""}</div>`)
    .join('');
}

function updateKeyboard() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const keyboardElement = document.getElementById("keyboard");
  keyboardElement.innerHTML = alphabet
    .split('')
    .map((letter) => `<div class="letter ${guessedLetters.has(letter) ? "guessed" : ""}" onclick="selectLetter('${letter}')">${letter}</div>`)
    .join('');
}

function selectLetter(letter) {
  if (guessedLetters.size < 5) {
    guessedLetters.add(letter);
    updateWordDisplay();
    updateKeyboard();
  }
}

function guessWord() {
  const guessedWord = [...guessedLetters].join('');
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
