import { Router } from "express";

import { listCategoriaController } from "@controllers/Categoria";
import jwtAuthenticator from "@middlewares/jwtAuthenticator";

const categoriaRouter = Router();

categoriaRouter
  .use(jwtAuthenticator)
  .get("/", (...args) => listCategoriaController.handle(...args));

export default categoriaRouter;
