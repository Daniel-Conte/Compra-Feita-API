export type ItemPedido = {
  codigo: number;
  quantidade: number;
  nomeProduto: string;
  precoUnitario: number;
  criadoEm: Date;
  atualizadoEm: Date;
  codigoProduto: number;
  codigoPessoa: number;
  codigoPedido: number | null;
};

export type CreateItemPedidoDTO = Omit<
  ItemPedido,
  "codigo" | "criadoEm" | "atualizadoEm" | "codigoPedido"
>;

export type UpdateQuantidadeItemPedidoDTO = Pick<
  ItemPedido,
  "codigo" | "quantidade"
>;
