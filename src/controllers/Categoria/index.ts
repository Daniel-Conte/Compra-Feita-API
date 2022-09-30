import CategoriaRepositoryPostgresSQL from "@repositories/CategoriaRepository/CategoriaRepositoryPostgresSQL";
import ListCategoriaController from "./ListCategoriaController";

const categoriaRepositoryPostgresSQL = new CategoriaRepositoryPostgresSQL();

export const listCategoriaController = new ListCategoriaController(
  categoriaRepositoryPostgresSQL
);
