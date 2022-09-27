import ProdutoRepositoryPostgresSQL from "@repositories/ProdutoRepository/ProdutoRepositoryPostgresSQL";
import CreateProdutoController from "./CreateProdutoController";
import DeleteProdutoController from "./DeleteProdutoController";
import GetProdutoController from "./GetProdutoController";
import ListProdutoController from "./ListProdutoController";
import UpdateProdutoController from "./UpdateProdutoController";

const produtoRepositoryPostgresSQL = new ProdutoRepositoryPostgresSQL();

export const createProdutoController = new CreateProdutoController(
  produtoRepositoryPostgresSQL
);
export const listProdutoController = new ListProdutoController(
  produtoRepositoryPostgresSQL
);
export const updateProdutoController = new UpdateProdutoController(
  produtoRepositoryPostgresSQL
);
export const getProdutoController = new GetProdutoController(
  produtoRepositoryPostgresSQL
);
export const deleteProdutoController = new DeleteProdutoController(
  produtoRepositoryPostgresSQL
);
