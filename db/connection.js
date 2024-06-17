const sqlite3 = require("sqlite3").verbose();

function handleDBError(err, res, db) {
	if (err) {
		console.error(err.message);
		if (res) res.status(500).json({ error: err.message });
		if (db) db.close();
		return true;
	}
	return false;
}

function getDBConnection(dbPath, res) {
	const db = new sqlite3.Database(dbPath, (err) => {
		if (handleDBError(err, res)) return null;
	});
	return db;
}

function run(dbPath, query, params, res) {
	const db = getDBConnection(dbPath, res);
	if (!db) return;

	db.run(query, params, function (err) {
		if (handleDBError(err, res, db)) return;
		res.json({
			success: true,
			message: "Operation successful",
			lastID: this.lastID,
		});
		db.close((err) => handleDBError(err));
	});
}

function all(dbPath, query, params, res) {
	const db = getDBConnection(dbPath, res);
	if (!db) return;

	db.all(query, params, (err, rows) => {
		if (handleDBError(err, res, db)) return;
		res.json({ data: rows });
		db.close((err) => handleDBError(err));
	});
}

module.exports = { run, all };
