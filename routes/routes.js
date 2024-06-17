const express = require("express");
const path = require("path");
const router = express.Router();
const db = require("../db/connection");

// Route to serve the index.html file
router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "static", "html", "index.html"));
});

// Route to redirect to external website
router.get("/redirect", (req, res) => {
	res.redirect("https://www.grandivy.com/");
});

// Route to get main stage events
router.get("/api/main-stage", (req, res) => {
	const dbPath = path.join(__dirname, "..", "static", "db", "mainStage.db");
	const query = "SELECT * FROM main_stage";

	db.all(dbPath, query, [], res);
});

// Route to get 2nd stage events
router.get("/api/2nd-stage", (req, res) => {
	const dbPath = path.join(__dirname, "..", "static", "db", "2ndStage.db");
	const query = "SELECT * FROM second_stage";

	db.all(dbPath, query, [], res);
});

// Route to handle contact form submission
router.post("/api/contact", (req, res) => {
	const { name, email, number, subject, message } = req.body;
	if (!name || !email || !number || !subject || !message) {
		return res.status(400).json({ error: "All fields are required" });
	}

	const dbPath = path.join(__dirname, "..", "static", "db", "contactForm.db");
	const query = `INSERT INTO contacts (name, email, number, subject, message) VALUES (?, ?, ?, ?, ?)`;
	const params = [name, email, number, subject, message];

	db.run(dbPath, query, params, res);
});

// Route to get lineup data for a specific year
router.get("/api/lineup/:year", (req, res) => {
	const year = req.params.year;
	const dbPath = path.join(__dirname, "..", "static", "db", "lineup.db");
	const query =
		"SELECT * FROM lineup WHERE year = ? ORDER BY year, stage, time";

	db.all(dbPath, query, [year], res);
});

module.exports = router;
