import { Router } from "express";
import { pessoaCreateController } from "../useCases/PessoaCreate";
import { pessoaListController } from "../useCases/PessoaList";

const authRouter = Router();

authRouter
  .get("/usuarios", (req, res) => pessoaListController.handle(req, res))
  .post("/usuarios", (req, res) => pessoaCreateController.handle(req, res));

export default authRouter;
