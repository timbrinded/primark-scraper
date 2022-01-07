const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const request = require("request-promise");

const URL = "https://www.primark.com/en/search/autocomplete/searchbox?term=";

app.listen(4000, () => {
  console.log("Server running on Port 4000");
});

app.get("/primark", async (req, res, next) => {
    const queryTerm = encodeURIComponent(req.query.term)
    const json = await request.get(URL + queryTerm);
    res.setHeader("Content-Type", "application/json");
    res.send(json);
});
