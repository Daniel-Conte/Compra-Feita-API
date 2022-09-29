import { Router } from "express";

import {
  createProdutoController,
  deleteProdutoController,
  getProdutoController,
  listProdutoController,
  updateProdutoController,
} from "@controllers/Produto";
import jwtAuthenticator from "@middlewares/jwtAuthenticator";
import adminValidator from "@middlewares/adminValidator";

const produtoRouter = Router();

produtoRouter
  .get("/", (...args) => listProdutoController.handle(...args))
  .get("/:id", (...args) => getProdutoController.handle(...args))
  .use(jwtAuthenticator)
  .use(adminValidator)
  .post("/", (...args) => createProdutoController.handle(...args))
  .put("/", (...args) => updateProdutoController.handle(...args))
  .delete("/:id", (...args) => deleteProdutoController.handle(...args));

export default produtoRouter;
