import type { Endereco } from "./endereco";
import type { ItemPedido } from "./itemPedido";
import type { Pessoa } from "./pessoa";

export type Pedido = {
  codigo: number;
  metodoPagamento: PedidoMetodoPagamento;
  pagamentoDinheiro?: number;
  data: Date;
  status: PedidoStatus;
  justificativaCancelamento?: string;
  atualizadoEm: Date;
  pessoa: Pick<Pessoa, "codigo" | "nome">;
  endereco: Pick<Endereco, "codigo" | "rua" | "numero" | "bairro" | "cidade">;
  itensPedido: ItemPedido[];
};

export type PedidoListItem = Pick<Pedido, "codigo" | "data" | "status"> & {
  valorTotal: number;
};

// 0 -> Realizado;
// 1 -> Confirmado;
// 2 -> Negado
// 3 -> Cancelado
// 4 -> Iniciado
// 5 -> Finalizado
export type PedidoStatus = 0 | 1 | 2 | 3 | 4 | 5;

// 1 -> Cartão
// 2 -> Dinheiro
export type PedidoMetodoPagamento = 1 | 2;

export type CreatePedidoDTO = Pick<
  Pedido,
  "metodoPagamento" | "pagamentoDinheiro"
> & {
  pessoaCodigo: number;
  enderecoCodigo: number;
  itens: number[];
};
