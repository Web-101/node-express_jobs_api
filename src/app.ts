import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";


import * as db from "./db";
import jobsRoute from "./routes/jobs_route";
import authRoute from "./routes/auth_route";
import ensureAuthenticate from "./middlewares/authentication";

// constants
const app = express();
const port = process.env.PORT || 3000;
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 50 // limit each IP to 50 requests per windowMs
});

// middleware
app.set("trust proxy", 1);

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);

// routes
app.use("/api/v1/jobs", ensureAuthenticate, jobsRoute);
app.use("/api/v1/auth", authRoute);

// start server
app.listen(port, () => console.log("Server is running on port " + port));

// start db connection
db.connect(process.env.DB_URI as string);
