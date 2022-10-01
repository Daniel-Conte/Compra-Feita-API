import prismaClient from "@database/prismaClient";
import { CreatePedidoDTO, Pedido, PedidoFull } from "@modelTypes/pedido";
import IPedidoRepository from "./IPedidoRepository";

class PedidoRepositoryPostgresSQL implements IPedidoRepository {
  async getAll(): Promise<Pedido[]> {
    return prismaClient.pedido.findMany();
  }

  async getByUser(pessoaCodigo: number): Promise<Pedido[]> {
    return prismaClient.pedido.findMany({ where: { pessoaCodigo } });
  }

  async getById(codigo: number): Promise<PedidoFull | null> {
    return prismaClient.pedido.findUnique({
      select: {
        codigo: true,
        data: true,
        atualizadoEm: true,
        enderecoCodigo: true,
        itensPedido: true,
        justificativaCancelamento: true,
        metodoPagamento: true,
        pessoaCodigo: true,
        status: true,
      },
      where: { codigo },
    });
  }

  async insert(pedido: CreatePedidoDTO): Promise<void> {
    const { pessoaCodigo, enderecoCodigo, metodoPagamento, itens } = pedido;

    await prismaClient.pedido.create({
      data: {
        metodoPagamento,
        endereco: { connect: { codigo: enderecoCodigo } },
        pessoa: { connect: { codigo: pessoaCodigo } },
        itensPedido: {
          connect: itens.map((codigo) => ({ codigo: codigo })),
        },
      },
    });
  }

  async confirmar(codigo: number): Promise<void> {
    await prismaClient.pedido.update({
      data: { status: 1 },
      where: { codigo },
    });
  }

  async negar(codigo: number, justificativa: string): Promise<void> {
    await prismaClient.pedido.update({
      data: { status: 2, justificativaCancelamento: justificativa },
      where: { codigo },
    });
  }

  async cancelar(codigo: number, justificativa: string): Promise<void> {
    await prismaClient.pedido.update({
      data: { status: 3, justificativaCancelamento: justificativa },
      where: { codigo },
    });
  }

  async iniciar(codigo: number): Promise<void> {
    await prismaClient.pedido.update({
      data: { status: 4 },
      where: { codigo },
    });
  }

  async finalizar(codigo: number): Promise<void> {
    await prismaClient.pedido.update({
      data: { status: 5 },
      where: { codigo },
    });
  }
}

export default PedidoRepositoryPostgresSQL;