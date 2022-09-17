import { Router } from "express";

import { createPessoaController } from "@controllers/Pessoa";

const authRouter = Router();

authRouter.post("/registrar-se", (req, res, next) =>
  createPessoaController.handle(req, res, next)
);

export default authRouter;
