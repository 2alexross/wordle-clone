const wordList = ["APPLE", "BANAN", "CHURR", "DUVET", "EAGLE", "FLAME", "GRANT", "HYENA", "INANE", "JOKER"];

let selectedWord = "";
let guessesRemaining = 6;

function pickRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function initializeGame() {
  selectedWord = pickRandomWord();
  guessesRemaining = 6;
  updateWordDisplay();
  document.getElementById("guessInput").value = "";
  document.getElementById("message").textContent = "";
}

function updateWordDisplay() {
  const wordDisplayElement = document.getElementById("wordDisplay");
  wordDisplayElement.textContent = selectedWord
    .split('')
    .map((letter) => guessedLetters.has(letter) ? letter : "•")
    .join('');
}

function guessWord() {
  const guessInput = document.getElementById("guessInput");
  const guessedWord = guessInput.value.toUpperCase();
  guessInput.value = "";

  if (guessedWord.length !== 5 || !/^[A-Z]+$/.test(guessedWord)) {
    showMessage("Please enter a valid 5-letter word.");
    return;
  }

  guessesRemaining--;
  const guessedLetters = new Set(guessedWord); // Fix the variable name to guessedLetters
  updateWordDisplay();

  // The rest of the code remains the same as in the previous response
  // ...
}

function resetGame() {
  initializeGame();
}

function showMessage(message) {
  document.getElementById("message").textContent = message;
}

initializeGame();
