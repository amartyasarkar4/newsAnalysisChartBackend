const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Amartya Express JAVASCRIPT  Server noly tjhjkashkjdsakls");
});

app.listen(port, () => {
  console.log(`[server]:Server is running on port: ${port}`);
});
