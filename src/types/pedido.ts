import { ItemPedido } from "./itemPedido";

export type Pedido = {
  codigo: number;
  metodoPagamento: number; // 1 -> Cartão; 2 -> Dinheiro
  data: Date;
  status: number; // 0 -> Realizado; 1 -> Confirmado; 2 -> Negado; 3 -> Cancelado; 4 -> Iniciado; 5 -> Finalizado
  justificativaCancelamento: string | null;
  atualizadoEm: Date;
  pessoaCodigo: number;
  enderecoCodigo: number;
};

export type PedidoFull = Pedido & {
  itensPedido: ItemPedido[];
};

export type CreatePedidoDTO = Pick<
  Pedido,
  "enderecoCodigo" | "metodoPagamento" | "pessoaCodigo"
> & {
  itens: number[];
};
