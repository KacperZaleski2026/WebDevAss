const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

const routes = require("./routes/routes");

// Serve static files from the 'static' directory
app.use(express.static(path.join(__dirname, "static")));

// Parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/", routes);

app.listen(port, () => {
	console.log(`Server is running at PORT no: ${port}`);
});
