import {
  CreateEnderecoDTO,
  Endereco,
  UpdateEnderecoDTO,
} from "@modelTypes/endereco";
import IEnderecoRepository from "./IEnderecoRepository";

class EnderecoRepositoryInMemory implements IEnderecoRepository {
  private enderecos: Endereco[] = [];

  async getAll(codigoPessoa: number): Promise<Endereco[]> {
    return this.enderecos.filter(
      (endereco) => endereco.codigoPessoa === codigoPessoa
    );
  }

  async getById(codigo: number): Promise<Endereco | null> {
    return (
      this.enderecos.find((endereco) => endereco.codigo === codigo) || null
    );
  }

  async getByName(
    name: string,
    codigoPessoa: number
  ): Promise<Endereco | null> {
    return (
      this.enderecos.find(
        (endereco) =>
          endereco.codigoPessoa === codigoPessoa && endereco.nome === name
      ) || null
    );
  }

  async insert(endereco: CreateEnderecoDTO): Promise<void> {
    const codigo = this.enderecos.length
      ? this.enderecos[this.enderecos.length - 1].codigo + 1
      : 1;

    this.enderecos.push({
      ...endereco,
      codigo,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    });
  }

  async update(endereco: UpdateEnderecoDTO): Promise<void> {
    const index = this.enderecos.findIndex(
      (it) => it.codigo === endereco.codigo
    );
    const found = this.enderecos[index];
    const newEndereco = { ...found, ...endereco };

    this.enderecos.splice(index, 1, newEndereco);
  }

  async delete(codigo: number): Promise<void> {
    this.enderecos = this.enderecos.filter(
      (endereco) => endereco.codigo !== codigo
    );
  }
}

export default EnderecoRepositoryInMemory;
