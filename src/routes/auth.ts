import { Router } from "express";
import { pessoaCreateController } from "../useCases/PessoaCreate";
import { pessoaListController } from "../useCases/PessoaList";

const authRouter = Router();

authRouter.get("/auth/usuarios", (req, res) =>
  pessoaListController.handle(req, res)
);

authRouter.post("/auth/usuarios", (req, res) =>
  pessoaCreateController.handle(req, res)
);

export default authRouter;
