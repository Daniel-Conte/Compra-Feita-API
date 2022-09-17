import { Router } from "express";

import {
  deletePessoaController,
  getPessoaController,
  listPessoaController,
  updatePessoaController,
} from "@controllers/Pessoa";
import jwtAuthenticator from "@middlewares/jwtAuthenticator";

const usuariosRouter = Router();

usuariosRouter
  .get("/", jwtAuthenticator, (req, res, next) =>
    listPessoaController.handle(req, res, next)
  )
  .put("/", jwtAuthenticator, (req, res, next) =>
    updatePessoaController.handle(req, res, next)
  )
  .get("/:id", jwtAuthenticator, (req, res, next) =>
    getPessoaController.handle(req, res, next)
  )
  .delete("/:id", jwtAuthenticator, (req, res, next) =>
    deletePessoaController.handle(req, res, next)
  );

export default usuariosRouter;
