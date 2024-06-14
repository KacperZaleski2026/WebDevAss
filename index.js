const express = require("express");
const path = require("path");

const app = express();
const port = 5000;

// Serve static files from the 'static' directory
app.use(express.static(path.join(__dirname, "static")));

// Route to serve the index.html file
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "static", "html", "index.html"));
});

app.listen(port, () => {
	console.log(`Server is running at PORT no: ${port}`);
});
