import "dotenv/config";
import express from "express";

import * as db from "./db";
import jobsRoute from "./routes/jobs_route";
import authRoute from "./routes/auth_route";

// constants
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes
app.use("/api/v1/jobs", jobsRoute);
app.use("/api/v1/auth", authRoute);

// start server
app.listen(port, () => console.log("Server is running on port " + port));

// start db connection
db.connect(process.env.DB_URI as string);
