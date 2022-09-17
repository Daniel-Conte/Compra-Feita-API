import { Router } from "express";

import {
  deletePessoaController,
  getPessoaController,
  listPessoaController,
  updatePessoaController,
} from "@controllers/Pessoa";

const usuariosRouter = Router();

usuariosRouter
  .get("/", (req, res, next) => listPessoaController.handle(req, res, next))
  .put("/", (req, res, next) => updatePessoaController.handle(req, res, next))
  .get("/:id", (req, res, next) => getPessoaController.handle(req, res, next))
  .delete("/:id", (req, res, next) =>
    deletePessoaController.handle(req, res, next)
  );

export default usuariosRouter;
