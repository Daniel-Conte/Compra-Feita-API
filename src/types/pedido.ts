export type Pedido = {
  codigo: number;
  metodoPagamento: number;
  data: Date;
  status: number;
  justificativaCancelamento: string | null;
  atualizadoEm: Date;
  pessoaCodigo: number;
  enderecoCodigo: number;
};

export type CreatePedidoDTO = Omit<Pedido, "codigo" | "atualizadoEm">;

export type UpdatePedidoDTO = Omit<Pedido, "atualizadoEm">;
