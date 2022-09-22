import prismaClient from "@database/prismaClient";
import {
  CreateEnderecoDTO,
  Endereco,
  UpdateEnderecoDTO,
} from "@modelTypes/endereco";
import IEnderecoRepository from "./IEnderecoRepository";

class EnderecoRepositoryPostgresSQL implements IEnderecoRepository {
  async getAll(codigoPessoa: number): Promise<Endereco[]> {
    return prismaClient.endereco.findMany({ where: { codigoPessoa } });
  }

  async getById(codigo: number): Promise<Endereco | null> {
    return prismaClient.endereco.findFirst({ where: { codigo } });
  }

  async insert(endereco: CreateEnderecoDTO): Promise<void> {
    await prismaClient.endereco.create({ data: endereco });
  }

  async update(endereco: UpdateEnderecoDTO): Promise<void> {
    await prismaClient.endereco.update({
      data: endereco,
      where: { codigo: endereco.codigo },
    });
  }

  async delete(codigo: number): Promise<void> {
    await prismaClient.endereco.delete({ where: { codigo } });
  }
}

export default EnderecoRepositoryPostgresSQL;
