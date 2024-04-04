const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
import { connectDB } from "./src/utils/features";
import { MyData } from "./src/models/jsonData";
import apiRouter from "./src/router/apiRouter";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const mongoURI = process.env.ATLAS_URI || "";

connectDB(mongoURI);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

require("./models/jsonData");

app.get("/getDb", async (req, res) => {
  console.log("enterrrrrrr");
  try {
    const movie = await MyData.find();
    console.log("here is your movie dat", movie);
    res.send(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("ghgjh");
  }
});

app.use("/api/v1/amartya", apiRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
