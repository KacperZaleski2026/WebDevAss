const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 5000;

// Serve static files from the 'static' directory
app.use(express.static(path.join(__dirname, "static")));

// Parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Route to handle contact form submission
app.post("/api/contact", (req, res) => {
	const { name, email, number, subject, message } = req.body;
	if (!name || !email || !number || !subject || !message) {
		return res.status(400).json({ error: "All fields are required" });
	}

	const dbPath = path.join(__dirname, "static", "db", "contactForm.db");
	const db = new sqlite3.Database(dbPath, (err) => {
		if (err) {
			console.error("Database connection error:", err.message);
			return res.status(500).json({ error: "Database connection error" });
		}
	});

	const query = `INSERT INTO contacts (name, email, number, subject, message) VALUES (?, ?, ?, ?, ?)`;
	const params = [name, email, number, subject, message];

	try {
		db.run(query, params, function (err) {
			if (err) {
				console.error("Database query error:", err.message);
				return res.status(500).json({ error: "Database query error" });
			}
			res.json({
				success: true,
				message: "Contact information saved successfully",
			});
			db.close((err) => {
				if (err) {
					console.error("Database close error:", err.message);
				}
			});
		});
	} catch (error) {
		console.error("Server error:", error.message);
		res.status(500).json({ error: "Server error" });
	}
});

app.listen(port, () => {
	console.log(`Server is running at PORT no: ${port}`);
});
