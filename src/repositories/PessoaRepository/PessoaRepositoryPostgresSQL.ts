import { Pessoa } from "@modelTypes/pessoa";
import IPessoaRepository from "./IPessoaRepository";

class PessoaRepositoryPostgresSQL implements IPessoaRepository {
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

  async save(pessoa: Pessoa): Promise<void> {
    this.pessoas.push(pessoa);
  }

  async delete(codigo: number): Promise<void> {
    this.pessoas = this.pessoas.filter((pessoa) => pessoa.codigo !== codigo);
  }
}

export default PessoaRepositoryPostgresSQL;
