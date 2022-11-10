import PedidoRepositoryPostgresSQL from "@repositories/PedidoRepository/PedidoRepositoryPostgresSQL";
import CreatePedidoController from "./CreatePedidoController";
import GetPedidoController from "./GetPedidoController";
import ListPedidoController from "./ListPedidoController";
import ListPedidoByUserController from "./ListPedidoByUserController";
import CancelarPedidoController from "./CancelarPedidoController";
import ConfirmarPedidoController from "./ConfirmarPedidoController";
import FinalizarPedidoController from "./FinalizarPedidoController";
import IniciarPedidoController from "./IniciarPedidoController";
import NegarPedidoController from "./NegarPedidoController";

const pedidoRepositoryPostgresSQL = new PedidoRepositoryPostgresSQL();

export const createPedidoController = new CreatePedidoController(
  pedidoRepositoryPostgresSQL
);
export const listPedidoController = new ListPedidoController(
  pedidoRepositoryPostgresSQL
);
export const listPedidoByUserController = new ListPedidoByUserController(
  pedidoRepositoryPostgresSQL
);
export const getPedidoController = new GetPedidoController(
  pedidoRepositoryPostgresSQL
);
export const cancelarPedidoController = new CancelarPedidoController(
  pedidoRepositoryPostgresSQL
);
export const confirmarPedidoController = new ConfirmarPedidoController(
  pedidoRepositoryPostgresSQL
);
export const finalizarPedidoController = new FinalizarPedidoController(
  pedidoRepositoryPostgresSQL
);
export const iniciarPedidoController = new IniciarPedidoController(
  pedidoRepositoryPostgresSQL
);
export const negarPedidoController = new NegarPedidoController(
  pedidoRepositoryPostgresSQL
);
