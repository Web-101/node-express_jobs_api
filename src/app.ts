import "dotenv/config";
import express from "express";

import * as db from "./db";

// constants
const app = express();
const port = process.env.PORT || 3000;

// routes
app.get("/", (req, res) => res.send("Hello World!"));

// start server
app.listen(port, () => console.log("Server is running on port " + port));

// start db connection
db.connect(process.env.DB_URI as string);