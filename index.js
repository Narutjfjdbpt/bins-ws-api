const express = require("express");
const { binLookup } = require("@arnabxd/bin-lookup");

const app = express();
const port = process.env.PORT || 4000;

// Route for the root
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route for /api/:bin
app.get("/api/:bin", async (req, res) => {
  let data = await binLookup(req.params.bin, "bins.ws");
  res.set("Cache-Control", "public, max-age=86400");
  res.type("application/json");
  res.send(data);
});

// Redirect any other route to the GitHub repository
app.use((_, res) => {
  res.redirect(301, "https://github.com/ArnabXD/bins-ws-api");
});

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
