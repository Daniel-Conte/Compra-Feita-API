export type Categoria = {
  codigo: number;
  nome: string;
  descricao: string | null;
  codigoCategoriaPai: number | null;
  criadoEm: Date;
  atualizadoEm: Date;
};
