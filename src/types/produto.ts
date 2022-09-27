export type Produto = {
  codigo: number;
  nome: string;
  descricao: string;
  precoUnitario: number;
  estoque: number;
  altura: number | null;
  comprimento: number | null;
  largura: number | null;
  marca: string | null;
  modelo: string | null;
  criadoEm: Date;
  atualizadoEm: Date;
  codigoCategoria: number;
};

export type CreateProdutoDTO = Omit<
  Produto,
  "codigo" | "criadoEm" | "atualizadoEm"
>;

export type UpdateProdutoDTO = Omit<Produto, "criadoEm" | "atualizadoEm">;
