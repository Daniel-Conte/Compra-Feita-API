import { Pessoa } from "@modelTypes/pessoa";

interface IPessoaRepository {
  getAll(): Promise<Pessoa[]>;
  getById(codigo: number): Promise<Pessoa | null>;
  getByEmail(email: string): Promise<Pessoa | null>;
  save(pessoa: Pessoa): Promise<void>;
  delete(codigo: number): Promise<void>;
}

export default IPessoaRepository;
