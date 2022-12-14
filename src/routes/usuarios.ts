import { Router } from "express";

import {
  deletePessoaController,
  getPessoaController,
  listPessoaController,
  updatePessoaController,
  updatePessoaPushTokenController,
} from "@controllers/Pessoa";
import jwtAuthenticator from "@middlewares/jwtAuthenticator";

const usuariosRouter = Router();

usuariosRouter
  .use(jwtAuthenticator)
  .get("/", (...args) => listPessoaController.handle(...args))
  .put("/", (...args) => updatePessoaController.handle(...args))
  .put("/push-token", (...args) =>
    updatePessoaPushTokenController.handle(...args)
  )
  .get("/:id", (...args) => getPessoaController.handle(...args))
  .delete("/:id", (...args) => deletePessoaController.handle(...args));

export default usuariosRouter;
