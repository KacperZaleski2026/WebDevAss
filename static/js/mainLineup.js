document.addEventListener("DOMContentLoaded", function () {
	const yearSelect = document.getElementById("year-select");
	const container = document.getElementById("lineup-container");

	function fetchLineup(year) {
		fetch(`/api/lineup/${year}`)
			.then((response) => response.json())
			.then((data) => {
				container.innerHTML = "";
				data.data.forEach((artist) => {
					const artistElement = document.createElement("div");
					artistElement.className = "lineup-item";
					artistElement.innerHTML = `
                        <img src="${artist.picture_url}" alt="${artist.artist_name}">
                        <h2>${artist.artist_name}</h2>
                        <p>Stage: ${artist.stage}</p>
                        <p>Time: ${artist.time}</p>
                    `;
					container.appendChild(artistElement);
				});
			})
			.catch((error) => console.error("Error fetching lineup data:", error));
	}

	yearSelect.addEventListener("change", (event) => {
		fetchLineup(event.target.value);
	});

	// Fetch the default lineup for 2024 on initial load
	fetchLineup(2024);
});
