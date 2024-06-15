const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 5000;

// Serve static files from the 'static' directory
app.use(express.static(path.join(__dirname, "static")));

// Route to serve the index.html file
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "static", "html", "index.html"));
});

// Route to get main stage events
app.get("/api/main-stage", (req, res) => {
	const dbPath = path.join(__dirname, "static", "db", "mainStage.db");
	const db = new sqlite3.Database(dbPath, (err) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
	});

	db.all("SELECT * FROM main_stage", (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json({ data: rows });
		db.close((err) => {
			if (err) {
				console.error(err.message);
			}
		});
	});
});

// Route to get 2nd stage events
app.get("/api/2nd-stage", (req, res) => {
	const dbPath = path.join(__dirname, "static", "db", "2ndStage.db");
	const db = new sqlite3.Database(dbPath, (err) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
	});

	db.all("SELECT * FROM second_stage", (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json({ data: rows });
		db.close((err) => {
			if (err) {
				console.error(err.message);
			}
		});
	});
});

app.listen(port, () => {
	console.log(`Server is running at PORT no: ${port}`);
});
