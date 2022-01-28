import "dotenv/config";
import express from "express";

// constants
const app = express();
const port = process.env.PORT || 3000;

// routes
app.get("/", (req, res) => res.send("Hello World!"));

// start serve
app.listen(port, () => console.log("Server is running on port " + port));
