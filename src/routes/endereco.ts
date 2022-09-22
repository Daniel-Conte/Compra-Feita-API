import { Router } from "express";

import {
  createEnderecoController,
  deleteEnderecoController,
  getEnderecoController,
  listEnderecoController,
  updateEnderecoController,
} from "@controllers/Endereco";
import jwtAuthenticator from "@middlewares/jwtAuthenticator";

const enderecoRouter = Router();

enderecoRouter
  .get("/", jwtAuthenticator, (req, res, next) =>
    listEnderecoController.handle(req, res, next)
  )
  .post("/", jwtAuthenticator, (req, res, next) =>
    createEnderecoController.handle(req, res, next)
  )
  .put("/", jwtAuthenticator, (req, res, next) =>
    updateEnderecoController.handle(req, res, next)
  )
  .get("/:id", jwtAuthenticator, (req, res, next) =>
    getEnderecoController.handle(req, res, next)
  )
  .delete("/:id", jwtAuthenticator, (req, res, next) =>
    deleteEnderecoController.handle(req, res, next)
  );

export default enderecoRouter;
