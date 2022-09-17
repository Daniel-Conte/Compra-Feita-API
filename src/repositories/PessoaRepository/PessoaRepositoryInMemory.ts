import { CreatePessoaDTO, Pessoa, UpdatePessoaDTO } from "@modelTypes/pessoa";
import IPessoaRepository from "./IPessoaRepository";

class PessoaRepositoryInMemory implements IPessoaRepository {
  private pessoas: Pessoa[] = [];

  async getAll(): Promise<Pessoa[]> {
    return this.pessoas;
  }

  async getById(codigo: number): Promise<Pessoa | null> {
    return this.pessoas.find((pessoa) => pessoa.codigo === codigo) || null;
  }

  async getByEmail(email: string): Promise<Pessoa | null> {
    return this.pessoas.find((pessoa) => pessoa.email === email) || null;
  }

  async insert(pessoa: CreatePessoaDTO): Promise<void> {
    const codigo = this.pessoas.length
      ? this.pessoas[this.pessoas.length - 1].codigo + 1
      : 1;

    this.pessoas.push({
      ...pessoa,
      codigo,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    });
  }

  async update(pessoa: UpdatePessoaDTO): Promise<void> {
    const index = this.pessoas.findIndex((it) => it.codigo === pessoa.codigo);
    const found = this.pessoas[index];
    const newPessoa = { ...found, ...pessoa };

    this.pessoas.splice(index, 1, newPessoa);
  }

  async delete(codigo: number): Promise<void> {
    this.pessoas = this.pessoas.filter((pessoa) => pessoa.codigo !== codigo);
  }
}

export default PessoaRepositoryInMemory;
