import prismaClient from "@database/prismaClient";
import {
  CreatePessoaDTO,
  Pessoa,
  PessoaListItem,
  UpdatePessoaDTO,
} from "@modelTypes/pessoa";
import IPessoaRepository from "./IPessoaRepository";

class PessoaRepositoryPostgresSQL implements IPessoaRepository {
  async getAll(): Promise<PessoaListItem[]> {
    return prismaClient.pessoa.findMany({
      select: {
        codigo: true,
        nome: true,
        email: true,
        telefone: true,
        admin: true,
        criadoEm: true,
        atualizadoEm: true,
      },
    });
  }

  async getById(codigo: number): Promise<Pessoa | null> {
    return prismaClient.pessoa.findFirst({ where: { codigo } });
  }

  async getByEmail(email: string): Promise<Pessoa | null> {
    return prismaClient.pessoa.findFirst({ where: { email } });
  }

  async insert(pessoa: CreatePessoaDTO): Promise<void> {
    await prismaClient.pessoa.create({ data: pessoa });
  }

  async update(pessoa: UpdatePessoaDTO): Promise<void> {
    await prismaClient.pessoa.update({
      data: pessoa,
      where: { codigo: pessoa.codigo },
    });
  }

  async delete(codigo: number): Promise<void> {
    await prismaClient.pessoa.delete({ where: { codigo } });
  }
}

export default PessoaRepositoryPostgresSQL;
