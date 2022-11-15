export type Pessoa = {
  codigo: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  admin: number;
  pushToken: string | null;
  criadoEm: Date;
  atualizadoEm: Date;
};

export type PessoaListItem = Omit<Pessoa, "senha">;

export type CreatePessoaDTO = Omit<
  Pessoa,
  "codigo" | "criadoEm" | "atualizadoEm"
>;

export type UpdatePessoaDTO = Omit<
  Pessoa,
  "criadoEm" | "atualizadoEm" | "senha"
>;
