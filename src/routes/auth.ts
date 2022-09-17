import { Router } from "express";

import { createPessoaController } from "@controllers/Pessoa";
import { loginController } from "@controllers/Auth";

const authRouter = Router();

authRouter.post("/registrar-se", (req, res, next) =>
  createPessoaController.handle(req, res, next)
);

authRouter.post("/login", (req, res, next) =>
  loginController.handle(req, res, next)
);

export default authRouter;
