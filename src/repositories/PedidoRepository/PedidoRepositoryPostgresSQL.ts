import prismaClient from "@database/prismaClient";
import { CreatePedidoDTO, Pedido, UpdatePedidoDTO } from "@modelTypes/pedido";
import IPedidoRepository from "./IPedidoRepository";

class PedidoRepositoryPostgresSQL implements IPedidoRepository {
  async getAll(): Promise<Pedido[]> {
    return prismaClient.pedido.findMany();
  }

  async getById(codigo: number): Promise<Pedido | null> {
    return prismaClient.pedido.findFirst({ where: { codigo } });
  }

  async insert(pedido: CreatePedidoDTO): Promise<void> {
    const { pessoaCodigo, enderecoCodigo, ...newPedido } = pedido;

    await prismaClient.pedido.create({
      data: {
        ...newPedido,
        endereco: { connect: { codigo: enderecoCodigo } },
        pessoa: { connect: { codigo: pessoaCodigo } },
      },
    });
  }

  async update(pedido: UpdatePedidoDTO): Promise<void> {
    const { codigo, enderecoCodigo, pessoaCodigo, ...newPedido } = pedido;

    await prismaClient.pedido.update({
      data: { ...newPedido, endereco: { connect: { codigo: enderecoCodigo } } },
      where: { codigo },
    });
  }

  async delete(codigo: number): Promise<void> {
    await prismaClient.pedido.delete({ where: { codigo } });
  }
}

export default PedidoRepositoryPostgresSQL;
