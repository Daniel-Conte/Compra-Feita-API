import { Router } from "express";

import authRouter from "./auth";
import usuariosRouter from "./usuarios";
import enderecoRouter from "./endereco";
import produtoRouter from "./produto";
import categoriaRouter from "./categoria";
import carrinhoComprasRouter from "./carrinhoCompras";
import pedidoRouter from "./pedido";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/usuarios", usuariosRouter);
routes.use("/endereco", enderecoRouter);
routes.use("/produto", produtoRouter);
routes.use("/categoria", categoriaRouter);
routes.use("/carrinho-compras", carrinhoComprasRouter);
routes.use("/pedido", pedidoRouter);

export default routes;
