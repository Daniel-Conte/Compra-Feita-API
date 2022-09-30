import prismaClient from "@database/prismaClient";
import {
  CreateItemPedidoDTO,
  ItemPedido,
  UpdateQuantidadeItemPedidoDTO,
} from "@modelTypes/itemPedido";
import IItemPedidoRepository from "./IItemPedidoRepository";

class ItemPedidoRepositoryPostgresSQL implements IItemPedidoRepository {
  async getAll(codigoPessoa: number): Promise<ItemPedido[]> {
    return prismaClient.itensPedido.findMany({ where: { codigoPessoa } });
  }

  async getCarrinhoCompras(codigoPessoa: number): Promise<ItemPedido[]> {
    return prismaClient.itensPedido.findMany({
      where: { codigoPessoa, AND: { codigoPedido: null } },
    });
  }

  async getById(codigo: number): Promise<ItemPedido | null> {
    return prismaClient.itensPedido.findFirst({ where: { codigo } });
  }

  async insert(itemPedido: CreateItemPedidoDTO): Promise<void> {
    const { codigoPessoa, codigoProduto, ...newItemPedido } = itemPedido;

    await prismaClient.itensPedido.create({
      data: {
        ...newItemPedido,
        pessoa: { connect: { codigo: codigoPessoa } },
        produto: { connect: { codigo: codigoProduto } },
      },
    });
  }

  async updateQuantidade(data: UpdateQuantidadeItemPedidoDTO): Promise<void> {
    const { codigo, quantidade } = data;

    await prismaClient.itensPedido.update({
      data: { quantidade },
      where: { codigo },
    });
  }

  async delete(codigo: number): Promise<void> {
    await prismaClient.itensPedido.delete({ where: { codigo } });
  }
}

export default ItemPedidoRepositoryPostgresSQL;
