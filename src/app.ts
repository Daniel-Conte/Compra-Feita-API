import express from "express";
import cors from "cors";
import passport from "passport";

import routes from "@routes/routes";
import errorHandler from "@middlewares/errorHandler";
import jwtStrategy from "@config/jwtStrategy";

const app = express();

app.use(cors());
passport.use(jwtStrategy);
app.use(express.json());
app.use(routes);
app.use(errorHandler);

export default app;
