const lastName = "Zaleski";
const maxAttempts = 4;
let attempts = 0;
let hints = "";

// Function to get a hint based on the number of attempts
function getHint() {
	return lastName.substring(0, attempts);
}

// Function to check the user's guess
function checkGuess() {
	const guessInput = document.getElementById("guess-input");
	const guess = guessInput.value;
	attempts++;

	if (guess.toLowerCase() === lastName.toLowerCase()) {
		document.getElementById("message").innerText =
			"Congratulations! You guessed it right.";
		guessInput.disabled = true;
		document.getElementById("play-again").style.display = "block";
	} else {
		if (attempts < maxAttempts) {
			hints = getHint();
			document.getElementById(
				"hint"
			).innerText = `Incorrect guess. Here's a hint: ${hints}`;
		} else {
			document.getElementById(
				"message"
			).innerText = `Sorry, you've used all your attempts. The correct answer was ${lastName}.`;
			guessInput.disabled = true;
			document.getElementById("play-again").style.display = "block";
		}
	}
}

// Function to start the game
function startGame() {
	attempts = 0;
	hints = "";
	document.getElementById("guess-input").value = "";
	document.getElementById("hint").innerText = "";
	document.getElementById("message").innerText = "";
	document.getElementById("guess-input").disabled = false;
	document.getElementById("play-again").style.display = "none";
}

window.onload = startGame;
