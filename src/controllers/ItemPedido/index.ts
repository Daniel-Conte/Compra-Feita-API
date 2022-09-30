import ItemPedidoRepositoryPostgresSQL from "@repositories/ItemPedidoRepository/ItemPedidoRepositoryPostgresSQL";
import ProdutoRepositoryPostgresSQL from "@repositories/ProdutoRepository/ProdutoRepositoryPostgresSQL";
import CreateItemPedidoController from "./CreateItemPedidoController";
import DeleteItemPedidoController from "./DeleteItemPedidoController";
import GetItemPedidoController from "./GetItemPedidoController";
import GetCarrinhoComprasController from "./GetCarrinhoComprasController";
import UpdateItemPedidoController from "./UpdateQuantidadeItemPedidoController";

const itemPedidoRepositoryPostgresSQL = new ItemPedidoRepositoryPostgresSQL();
const produtoRepositoryPostgresSQL = new ProdutoRepositoryPostgresSQL();

export const createItemPedidoController = new CreateItemPedidoController(
  itemPedidoRepositoryPostgresSQL,
  produtoRepositoryPostgresSQL
);
export const getCarrinhoComprasController = new GetCarrinhoComprasController(
  itemPedidoRepositoryPostgresSQL
);
export const updateItemPedidoController = new UpdateItemPedidoController(
  itemPedidoRepositoryPostgresSQL
);
export const getItemPedidoController = new GetItemPedidoController(
  itemPedidoRepositoryPostgresSQL
);
export const deleteItemPedidoController = new DeleteItemPedidoController(
  itemPedidoRepositoryPostgresSQL
);
