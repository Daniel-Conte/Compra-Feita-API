import express from "express";
import cors from "cors";
import { config } from "dotenv";

import authRouter from "./routes/auth";

config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);

export default app;
