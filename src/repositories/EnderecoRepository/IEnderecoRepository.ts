import {
  CreateEnderecoDTO,
  Endereco,
  UpdateEnderecoDTO,
} from "@modelTypes/endereco";

interface IEnderecoRepository {
  getAll(codigoPessoa: number): Promise<Endereco[]>;
  getById(codigo: number): Promise<Endereco | null>;
  getByName(name: string, codigoPessoa: number): Promise<Endereco | null>;
  insert(endereco: CreateEnderecoDTO): Promise<void>;
  update(endereco: UpdateEnderecoDTO): Promise<void>;
  delete(codigo: number): Promise<void>;
}

export default IEnderecoRepository;
