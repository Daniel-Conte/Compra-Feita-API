import type { Categoria } from "./categoria";

export type Produto = {
  codigo: number;
  nome: string;
  descricao: string;
  precoUnitario: number;
  estoque: number;
  categoria: Omit<Categoria, "criadoEm" | "atualizadoEm">;
  imagens: string[];
  altura: number | null;
  comprimento: number | null;
  largura: number | null;
  marca: string | null;
  modelo: string | null;
  criadoEm: Date;
  atualizadoEm: Date;
};

export type ProdutoListItem = Pick<
  Produto,
  "codigo" | "nome" | "precoUnitario"
> & {
  imagem: string;
};

export type CreateProdutoDTO = Omit<
  Produto,
  "codigo" | "criadoEm" | "atualizadoEm" | "categoria" | "imagens"
> & {
  codigoCategoria: number;
  imagens?: {
    imagem: string;
  }[];
};

export type UpdateProdutoDTO = Omit<
  Produto,
  "criadoEm" | "atualizadoEm" | "categoria" | "imagens"
> & {
  codigoCategoria: number;
  imagens?: {
    codigo?: number;
    imagem: string;
  }[];
};
