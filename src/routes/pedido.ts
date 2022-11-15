import { Router } from "express";

import {
  createPedidoController,
  getPedidoController,
  listPedidoByUserController,
  listPedidoController,
  cancelarPedidoController,
  confirmarPedidoController,
  entregarPedidoController,
  finalizarPedidoController,
  iniciarPedidoController,
  negarPedidoController,
} from "@controllers/Pedido";
import jwtAuthenticator from "@middlewares/jwtAuthenticator";
import adminValidator from "@middlewares/adminValidator";

const pedidoRouter = Router();

pedidoRouter
  .use(jwtAuthenticator)
  .post("/", (...args) => createPedidoController.handle(...args))
  .get("/usuario", (...args) => listPedidoByUserController.handle(...args))
  .get("/:id", (...args) => getPedidoController.handle(...args))
  .put("/cancelar/:id", (...args) => cancelarPedidoController.handle(...args))
  .use(adminValidator)
  .get("/", (...args) => listPedidoController.handle(...args))
  .put("/confirmar/:id", (...args) => confirmarPedidoController.handle(...args))
  .put("/entregar/:id", (...args) => entregarPedidoController.handle(...args))
  .put("/finalizar/:id", (...args) => finalizarPedidoController.handle(...args))
  .put("/iniciar/:id", (...args) => iniciarPedidoController.handle(...args))
  .put("/negar/:id", (...args) => negarPedidoController.handle(...args));

export default pedidoRouter;
