import { Router } from "express";

import { createPessoaController } from "@controllers/Pessoa";
import { loginController, validateTokenController } from "@controllers/Auth";
import jwtAuthenticator from "@middlewares/jwtAuthenticator";

const authRouter = Router();

authRouter
  .post("/registrar-se", (...args) => createPessoaController.handle(...args))
  .post("/login", (...args) => loginController.handle(...args))
  .use(jwtAuthenticator)
  .get("/validate-token", (...args) => validateTokenController.handle(...args));

export default authRouter;
