import prismaClient from "@database/prismaClient";
import {
  CreateProdutoDTO,
  Produto,
  UpdateProdutoDTO,
} from "@modelTypes/produto";
import IProdutoRepository from "./IProdutoRepository";

class ProdutoRepositoryPostgresSQL implements IProdutoRepository {
  async getAll(): Promise<Produto[]> {
    return prismaClient.produto.findMany();
  }

  async getById(codigo: number): Promise<Produto | null> {
    return prismaClient.produto.findFirst({ where: { codigo } });
  }

  async getByName(name: string): Promise<Produto | null> {
    return prismaClient.produto.findFirst({
      where: { nome: name },
    });
  }

  async insert(produto: CreateProdutoDTO): Promise<void> {
    const { codigoCategoria, ...newProduto } = produto;

    await prismaClient.produto.create({
      data: {
        ...newProduto,
        categoria: { connect: { codigo: codigoCategoria } },
      },
    });
  }

  async update(produto: UpdateProdutoDTO): Promise<void> {
    const { codigo, ...newProduto } = produto;

    await prismaClient.produto.update({
      data: { ...newProduto },
      where: { codigo },
    });
  }

  async delete(codigo: number): Promise<void> {
    await prismaClient.produto.delete({ where: { codigo } });
  }
}

export default ProdutoRepositoryPostgresSQL;
