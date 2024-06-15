document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("contactForm");

	form.addEventListener("submit", function (event) {
		// Prevent form submission
		event.preventDefault();

		// Get form values
		const name = form.elements["name"].value;
		const phone = form.elements["number"].value;

		// Validate name (letters only, max 20 characters)
		const nameRegex = /^[a-zA-Z]{1,20}$/;
		if (!nameRegex.test(name)) {
			alert(
				"Name must contain only letters and be no more than 20 characters."
			);
			return;
		}

		// Validate phone number (digits only, 6 to 15 digits)
		const phoneRegex = /^\d{6,15}$/;
		if (!phoneRegex.test(phone)) {
			alert(
				"Phone number must contain only digits and be between 6 and 15 digits long."
			);
			return;
		}

		// FormData and Fetch logic
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		fetch("/api/contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				alert("Message sent successfully");
				// Clear the form after 5 seconds
				setTimeout(() => {
					form.reset();
				}, 3000);
			})
			.catch((error) => {
				console.error("Error:", error);
				alert("Error sending message");
			});
	});
});
