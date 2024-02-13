const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

// app.use(cors({
//     origin: "*",
//     optionsSuccessStatus: 200,
// }))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://nasa-image.onrender.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("Backend is running baby");
});
app.get("/apod", (req, res) => {
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
  )
    .then((resObj) => resObj.json())
    .then((data) => res.json(data));
});
app.get("/api/:id", (req,res) => {
  const id = req.params.id
  res.json({a: "asdasd", b: "asdasd", c: id || "nf"})
})
app.listen(process.env.PORT , () => console.log("Backend is running", process.env.PORT));
