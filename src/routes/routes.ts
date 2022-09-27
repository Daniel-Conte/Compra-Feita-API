import { Router } from "express";

import authRouter from "./auth";
import usuariosRouter from "./usuarios";
import enderecoRouter from "./endereco";
import produtoRouter from "./produto";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/usuarios", usuariosRouter);
routes.use("/endereco", enderecoRouter);
routes.use("/produto", produtoRouter);

export default routes;
