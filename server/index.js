const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

app.use(cors({
    origin: ["localhost:5173", "https://nasa-image.onrender.com/", "https://65c667d8f5c4b823ab7febc8--elegant-gaufre-f57a38.netlify.app/"],
    // optionsSuccessStatus: 200,
    default: "https://nasa-image.onrender.com/",
}))

app.all('*', function(req, res, next) {
  const origin = cors.origin.includes(req.header('origin').toLowerCase()) ? req.headers.origin : cors.default;
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
