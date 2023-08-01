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
  const guessedLetters = new Set(guessedWord);
  const correctLetters = new Set();
  const incorrectLetters = new Set();

  for (const [index, letter] of selectedWord.split('').entries()) {
    if (guessedLetters.has(letter)) {
      if (guessedWord[index] === letter) {
        correctLetters.add(letter);
      } else {
        incorrectLetters.add(letter);
      }
    }
  }

  updateWordDisplay();

  if (correctLetters.size === 5) {
    showMessage("Congratulations! You've guessed the word!");
  } else if (guessesRemaining === 0) {
    showMessage(`Game over! The word was "${selectedWord}".`);
  } else {
    showMessage(`Correct letters: ${[...correctLetters].join(' ')}, Incorrect letters: ${[...incorrectLetters].join(' ')}, Guesses remaining: ${guessesRemaining}`);
  }
}

function resetGame() {
  initializeGame();
}

function showMessage(message) {
  document.getElementById("message").textContent = message;
}

initializeGame();
