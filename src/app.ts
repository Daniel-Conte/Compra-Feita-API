import express from "express";
import cors from "cors";
import { config } from "dotenv";

import routes from "@routes/routes";
import errorHandler from "@middlewares/errorHandler";

config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

export default app;
