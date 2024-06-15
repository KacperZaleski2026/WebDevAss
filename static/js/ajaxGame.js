// Flag to keep track of game visibility
let gameLoaded = false;

function loadGame() {
	if (!gameLoaded) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.querySelector(".myGame-container").innerHTML =
					this.responseText;
				gameLoaded = true; // Update flag to indicate game is loaded
			}
		};
		xhttp.open("GET", "../html/game.html", true);
		xhttp.send();
	} else {
		// Game is already loaded, so hide it
		document.querySelector(".myGame-container").innerHTML = ""; // Clear the container
		gameLoaded = false; // Update flag to indicate game is unloaded
	}
}
