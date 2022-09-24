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

  async getByName(
    name: string,
    codigoPessoa: number
  ): Promise<Endereco | null> {
    return prismaClient.endereco.findFirst({
      where: { codigoPessoa, AND: { nome: name } },
    });
  }

  async insert(endereco: CreateEnderecoDTO): Promise<void> {
    const { codigoPessoa, ...newEndereco } = endereco;

    await prismaClient.endereco.create({
      data: {
        ...newEndereco,
        pessoa: { connect: { codigo: codigoPessoa } },
      },
    });
  }

  async update(endereco: UpdateEnderecoDTO): Promise<void> {
    const { codigo, ...newEndereco } = endereco;

    await prismaClient.endereco.update({
      data: { ...newEndereco },
      where: { codigo },
    });
  }

  async delete(codigo: number): Promise<void> {
    await prismaClient.endereco.delete({ where: { codigo } });
  }
}

export default EnderecoRepositoryPostgresSQL;
