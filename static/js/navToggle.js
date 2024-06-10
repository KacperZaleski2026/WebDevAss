document.addEventListener("DOMContentLoaded", () => {
	let menu = document.querySelector("#menu-bars");
	let navbar = document.querySelector(".navbar");

	if (menu && navbar) {
		menu.onclick = () => {
			menu.classList.toggle("fa-times");
			navbar.classList.toggle("active");
		};
	}

	let themeToggler = document.querySelector(".theme-toggler");
	let toggleBtn = document.querySelector(".toggle-btn");

	if (themeToggler && toggleBtn) {
		toggleBtn.onclick = () => {
			themeToggler.classList.toggle("active");
		};
	}

	window.onscroll = () => {
		if (menu) menu.classList.remove("fa-times");
		if (navbar) navbar.classList.remove("active");
		if (themeToggler) themeToggler.classList.remove("active");
	};

	document.querySelectorAll(".theme-toggler .theme-btn").forEach((btn) => {
		btn.onclick = () => {
			let color = btn.style.background;
			document.querySelector(":root").style.setProperty("--main-color", color);
		};
	});
});
