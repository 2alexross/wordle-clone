<script>
  const wordList = ["APPLE", "BANAN", "CHURR", "DUVET", "EAGLE", "FLAME", "GRANT", "HYENA", "INANE", "JOKER"];

  let selectedWord = "";
  let guessedLetters = new Set();
  let guessesRemaining = 6;

  function pickRandomWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
  }

  function initializeGame() {
    selectedWord = pickRandomWord();
    guessedLetters = new Set();
    guessesRemaining = 6;
    updateWordDisplay();
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
    guessedLetters = new Set(guessedWord);

    let correctLettersCount = 0;
    for (const letter of selectedWord) {
      if (guessedLetters.has(letter)) {
        correctLettersCount++;
        guessedLetters.delete(letter);
      }
    }

    updateWordDisplay();

    if (correctLettersCount === 5) {
      showMessage("Congratulations! You've guessed the word!");
    } else if (guessesRemaining === 0) {
      showMessage(`Game over! The word was "${selectedWord}".`);
    } else {
      showMessage(`Correct letters: ${correctLettersCount}, Guesses remaining: ${guessesRemaining}`);
    }
  }

  function resetGame() {
    initializeGame();
  }

  function showMessage(message) {
    document.getElementById("message").textContent = message;
  }

  initializeGame();
</script>
