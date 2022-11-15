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
  valorTotal: number;
  atualizadoEm: Date;
  pessoa: Pick<Pessoa, "codigo" | "nome" | "email" | "telefone">;
  endereco: Pick<
    Endereco,
    "rua" | "numero" | "bairro" | "cidade" | "complemento"
  >;
  itensPedido: ItemPedido[];
};

export type PedidoListItem = Pick<
  Pedido,
  "codigo" | "data" | "status" | "valorTotal"
>;

// 0 -> Realizado;
// 1 -> Confirmado;
// 2 -> Negado
// 3 -> Cancelado
// 4 -> Iniciado
// 5 -> Saiu para entrega
// 6 -> Finalizado
export type PedidoStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6;

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
