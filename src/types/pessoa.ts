export type Pessoa = {
  codigo: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  admin: number;
  criadoEm: Date;
  atualizadoEm: Date;
};

export type CreatePessoaDTO = Omit<
  Pessoa,
  "codigo" | "criadoEm" | "atualizadoEm"
>;

export type UpdatePessoaDTO = Omit<Pessoa, "criadoEm" | "atualizadoEm">;
