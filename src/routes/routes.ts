import { Router } from "express";

import authRouter from "./auth";
import usuariosRouter from "./usuarios";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/usuarios", usuariosRouter);

export default routes;
