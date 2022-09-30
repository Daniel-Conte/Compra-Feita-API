import { Router } from "express";

import {
  createItemPedidoController,
  deleteItemPedidoController,
  getItemPedidoController,
  getCarrinhoComprasController,
  updateItemPedidoController,
} from "@controllers/ItemPedido";
import jwtAuthenticator from "@middlewares/jwtAuthenticator";

const carrinhoComprasRouter = Router();

carrinhoComprasRouter
  .use(jwtAuthenticator)
  .get("/", (...args) => getCarrinhoComprasController.handle(...args))
  .get("/:id", (...args) => getItemPedidoController.handle(...args))
  .post("/", (...args) => createItemPedidoController.handle(...args))
  .delete("/:id", (...args) => deleteItemPedidoController.handle(...args))
  .put("/alterar-quantidade", (...args) =>
    updateItemPedidoController.handle(...args)
  );

export default carrinhoComprasRouter;
