document.addEventListener("DOMContentLoaded", () => {
	fetch("/api/main-stage")
		.then((response) => response.json())
		.then((data) => {
			const eventsContainer = document.getElementById("events");
			if (data && data.data) {
				data.data.forEach((event) => {
					const eventDiv = document.createElement("div");
					eventDiv.classList.add("event");
					eventDiv.innerHTML = `
                        <h2>${event.action}</h2>
                        <p>${event.description}</p>
                        <p><strong>Time:</strong> ${event.time}</p>
                    `;
					eventsContainer.appendChild(eventDiv);
				});
			} else {
				eventsContainer.innerHTML = "<p>No events found.</p>";
			}
		})
		.catch((error) => {
			console.error("Error fetching main stage events:", error);
		});
});
