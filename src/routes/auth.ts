import { Router } from "express";

import { createPessoaController } from "@controllers/Pessoa";
import { loginController } from "@controllers/Auth";

const authRouter = Router();

authRouter
  .post("/registrar-se", (...args) => createPessoaController.handle(...args))
  .post("/login", (...args) => loginController.handle(...args));

export default authRouter;
