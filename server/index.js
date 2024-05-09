const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const compression = require('compression');

app.use(compression());

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.ORIGIN_URL
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("Backend is running baby");
});

app.get("/apod", (req, res) => {
  const origin = req.get("Origin");
  if (origin !== process.env.ORIGIN_URL) {
    res.status(403).json({error: "Forbidden Access"});
    return;
  } else {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
      .then((resObj) => resObj.json())
      .then((data) => res.json(data));
  }
});

app.get("/recent", (req, res) => {
  const origin = req.get("Origin");
  if (origin !== process.env.ORIGIN_URL) {
    res.status(403).json({error: "Forbidden Access"});
    return;
  } else {
    fetch("https://images-assets.nasa.gov/recent.json")
      .then((resObj) => resObj.json())
      .then((data) => res.json(data));
  }
});

app.get("/popular", (req, res) => {
  const origin = req.get("Origin");
  if (origin !== process.env.ORIGIN_URL) {
    res.status(403).json({error: "Forbidden Access"});
    return;
  } else {
    fetch("https://images-assets.nasa.gov/popular.json")
      .then((resObj) => resObj.json())
      .then((data) => res.json(data));
  }
});

app.get("/search", (req, res) => {
  const origin = req.get("Origin");
  const { q, page, media_type } = req.query;
  if (origin !== process.env.ORIGIN_URL) {
    res.status(403).json({error: "Forbidden Access"});
    return;
  } else {
    fetch(`https://images-api.nasa.gov/search?q=${q}&page=${page}&media_type=${media_type}`)
      .then((resObj) => resObj.json())
      .then((data) => res.json(data));
  }
});

app.get("/details/:nasa_id", (req, res) => {
  const origin = req.get("Origin");
  // const { nasa_id } = req.query;
  const nasa_id = req.params.nasa_id;
  if (origin !== process.env.ORIGIN_URL) {
    res.status(403).json({error: "Forbidden Access"});
    return;
  } else {
    fetch(`https://images-api.nasa.gov/metadata/${nasa_id}`)
      .then((resObj) => resObj.json())
      .then((data) => res.json(data));
  }
});

app.get("/api/:id", (req, res) => {
  const id = req.params.id;
  res.json({ a: "asdasd", b: "asdasd", c: id || "nf" });
});
app.listen(process.env.PORT, () =>
  console.log("Backend is running", process.env.PORT)
);
