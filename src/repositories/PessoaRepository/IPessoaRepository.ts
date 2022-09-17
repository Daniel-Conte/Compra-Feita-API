import { CreatePessoaDTO, Pessoa, UpdatePessoaDTO } from "@modelTypes/pessoa";

interface IPessoaRepository {
  getAll(): Promise<Pessoa[]>;
  getById(codigo: number): Promise<Pessoa | null>;
  getByEmail(email: string): Promise<Pessoa | null>;
  insert(pessoa: CreatePessoaDTO): Promise<void>;
  update(pessoa: UpdatePessoaDTO): Promise<void>;
  delete(codigo: number): Promise<void>;
}

export default IPessoaRepository;
