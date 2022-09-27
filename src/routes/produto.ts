import { Router } from "express";

import {
  createProdutoController,
  deleteProdutoController,
  getProdutoController,
  listProdutoController,
  updateProdutoController,
} from "@controllers/Produto";
import jwtAuthenticator from "@middlewares/jwtAuthenticator";

const produtoRouter = Router();

produtoRouter
  .get("/", (req, res, next) => listProdutoController.handle(req, res, next))
  .post("/", jwtAuthenticator, (req, res, next) =>
    createProdutoController.handle(req, res, next)
  )
  .put("/", jwtAuthenticator, (req, res, next) =>
    updateProdutoController.handle(req, res, next)
  )
  .get("/:id", (req, res, next) => getProdutoController.handle(req, res, next))
  .delete("/:id", jwtAuthenticator, (req, res, next) =>
    deleteProdutoController.handle(req, res, next)
  );

export default produtoRouter;
