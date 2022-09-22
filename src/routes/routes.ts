import { Router } from "express";

import authRouter from "./auth";
import usuariosRouter from "./usuarios";
import enderecoRouter from "./endereco";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/usuarios", usuariosRouter);
routes.use("/endereco", enderecoRouter);

export default routes;
