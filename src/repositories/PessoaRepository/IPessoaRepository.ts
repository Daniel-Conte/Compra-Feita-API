import {
  CreatePessoaDTO,
  Pessoa,
  PessoaListItem,
  UpdatePessoaDTO,
} from "@modelTypes/pessoa";

interface IPessoaRepository {
  getAll(): Promise<PessoaListItem[]>;
  getById(codigo: number): Promise<Pessoa | null>;
  getByEmail(email: string): Promise<Pessoa | null>;
  insert(pessoa: CreatePessoaDTO): Promise<void>;
  update(pessoa: UpdatePessoaDTO): Promise<void>;
  delete(codigo: number): Promise<void>;
}

export default IPessoaRepository;
