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
  .use(jwtAuthenticator)
  .get("/", (...args) => listEnderecoController.handle(...args))
  .get("/:id", (...args) => getEnderecoController.handle(...args))
  .post("/", (...args) => createEnderecoController.handle(...args))
  .put("/", (...args) => updateEnderecoController.handle(...args))
  .delete("/:id", (...args) => deleteEnderecoController.handle(...args));

export default enderecoRouter;
