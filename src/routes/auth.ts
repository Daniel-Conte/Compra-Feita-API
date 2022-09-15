import { Router } from "express";

import {
  createPessoaController,
  listPessoaController,
} from "@controllers/Pessoa";

const authRouter = Router();

authRouter
  .get("/usuarios", (req, res) => listPessoaController.handle(req, res))
  .post("/usuarios", (req, res, next) =>
    createPessoaController.handle(req, res, next)
  );

export default authRouter;
