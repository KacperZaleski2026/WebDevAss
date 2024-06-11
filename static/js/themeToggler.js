// Add event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
	// Select the menu icon and the navbar
	let menu = document.querySelector("#menu-bars");
	let navbar = document.querySelector(".navbar");

	// If both the menu icon and the navbar are present
	if (menu && navbar) {
		// Add an onclick event to the menu icon
		menu.onclick = () => {
			// Toggle the "fa-times" class on the menu icon
			menu.classList.toggle("fa-times");
			// Toggle the "active" class on the navbar
			navbar.classList.toggle("active");
		};
	}

	// Select the theme toggler container and the toggle button
	let themeToggler = document.querySelector(".theme-toggler");
	let toggleBtn = document.querySelector(".toggle-btn");

	// If both the theme toggler container and the toggle button are present
	if (themeToggler && toggleBtn) {
		// Add an onclick event to the toggle button
		toggleBtn.onclick = () => {
			// Toggle the "active" class on the theme toggler container
			themeToggler.classList.toggle("active");
		};
	}

	// Add an event listener for when the window is scrolled
	window.onscroll = () => {
		// Remove the "fa-times" class from the menu icon if present
		if (menu) menu.classList.remove("fa-times");
		// Remove the "active" class from the navbar if present
		if (navbar) navbar.classList.remove("active");
		// Remove the "active" class from the theme toggler container if present
		if (themeToggler) themeToggler.classList.remove("active");
	};

	// Select all theme buttons within the theme toggler container
	document.querySelectorAll(".theme-toggler .theme-btn").forEach((btn) => {
		// Add an onclick event to each theme button
		btn.onclick = () => {
			// Get the background color of the clicked button
			let color = btn.style.background;
			// Set the CSS variable --main-color to the selected color
			document.querySelector(":root").style.setProperty("--main-color", color);
		};
	});
});
