import prismaClient from "@database/prismaClient";
import type {
  CreatePessoaDTO,
  Pessoa,
  PessoaListItem,
  UpdatePessoaDTO,
} from "@modelTypes/pessoa";
import type IPessoaRepository from "./IPessoaRepository";

class PessoaRepositoryPostgresSQL implements IPessoaRepository {
  async getAll(): Promise<PessoaListItem[]> {
    return prismaClient.pessoa.findMany({
      select: {
        codigo: true,
        nome: true,
        email: true,
        telefone: true,
        admin: true,
        pushToken: true,
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

  async update(pessoa: UpdatePessoaDTO): Promise<Pessoa> {
    return await prismaClient.pessoa.update({
      data: pessoa,
      where: { codigo: pessoa.codigo },
    });
  }

  async updatePushToken(
    codigo: number,
    pushToken: string | null
  ): Promise<void> {
    await prismaClient.pessoa.update({
      data: { pushToken },
      where: { codigo },
    });
  }

  async delete(codigo: number): Promise<void> {
    await prismaClient.pessoa.delete({ where: { codigo } });
  }
}

export default PessoaRepositoryPostgresSQL;
