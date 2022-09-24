export type Endereco = {
  codigo: number;
  nome: string;
  cep: string;
  cidade: string;
  uf: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento: string | null;
  criadoEm: Date;
  atualizadoEm: Date;
  codigoPessoa: number;
};

export type CreateEnderecoDTO = Omit<
  Endereco,
  "codigo" | "criadoEm" | "atualizadoEm"
>;

export type UpdateEnderecoDTO = Omit<
  Endereco,
  "criadoEm" | "atualizadoEm" | "codigoPessoa"
>;
