// @ts-check
const express = require("express");
const { binLookup } = require("@arnabxd/bin-lookup");

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/bin/:bin", async (req, res) => {
  let data = await binLookup(req.params.bin, "bins.ws");
  res.set("Cache-Control", "public, max-age=86400");
  res.type("application/json");
  res.send(data);
});

app.use(async (_, res) => {
  res.redirect(301, "example.com");
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Listening on port ${PORT}`);
  });
}

module.exports = app;
