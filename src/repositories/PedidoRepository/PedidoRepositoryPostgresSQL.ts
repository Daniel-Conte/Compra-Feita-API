import prismaClient from "@database/prismaClient";
import type {
  CreatePedidoDTO,
  Pedido,
  PedidoListItem,
} from "@modelTypes/pedido";
import type IPedidoRepository from "./IPedidoRepository";

class PedidoRepositoryPostgresSQL implements IPedidoRepository {
  async getAll(): Promise<PedidoListItem[]> {
    const pedidos = await prismaClient.pedido.findMany({
      select: {
        codigo: true,
        data: true,
        status: true,
        itensPedido: true,
      },
      orderBy: { codigo: "desc" },
    });

    const newPedidos = pedidos.map(({ itensPedido, ...pedido }) => ({
      ...pedido,
      valorTotal: itensPedido.reduce(
        (total, curr) => (total += curr.precoUnitario * curr.quantidade),
        0
      ),
    })) as PedidoListItem[];

    return newPedidos;
  }

  async getByUser(pessoaCodigo: number): Promise<PedidoListItem[]> {
    const pedidos = await prismaClient.pedido.findMany({
      select: {
        codigo: true,
        data: true,
        status: true,
        itensPedido: true,
      },
      orderBy: { codigo: "desc" },
      where: { pessoaCodigo },
    });

    const newPedidos = pedidos.map(({ itensPedido, ...pedido }) => ({
      ...pedido,
      valorTotal: itensPedido.reduce(
        (total, curr) => (total += curr.precoUnitario * curr.quantidade),
        0
      ),
    })) as PedidoListItem[];

    return newPedidos;
  }

  async getById(codigo: number): Promise<Pedido | null> {
    const pedido = await prismaClient.pedido.findUnique({
      select: {
        codigo: true,
        data: true,
        atualizadoEm: true,
        enderecoCodigo: true,
        itensPedido: true,
        justificativaCancelamento: true,
        metodoPagamento: true,
        pagamentoDinheiro: true,
        pessoaCodigo: true,
        status: true,
        endereco: {
          select: {
            rua: true,
            numero: true,
            bairro: true,
            cidade: true,
            complemento: true,
          },
        },
        pessoa: {
          select: { codigo: true, nome: true, email: true, telefone: true },
        },
      },
      where: { codigo },
    });

    const valorTotal =
      pedido?.itensPedido.reduce(
        (total, curr) => (total += curr.precoUnitario * curr.quantidade),
        0
      ) || 0;

    const newPedido = pedido ? { ...pedido, valorTotal } : null;

    return newPedido as Pedido;
  }

  async insert(pedido: CreatePedidoDTO): Promise<void> {
    const {
      pessoaCodigo,
      enderecoCodigo,
      metodoPagamento,
      pagamentoDinheiro,
      itens,
    } = pedido;

    await prismaClient.pedido.create({
      data: {
        metodoPagamento,
        pagamentoDinheiro,
        endereco: { connect: { codigo: enderecoCodigo } },
        pessoa: { connect: { codigo: pessoaCodigo } },
        itensPedido: {
          connect: itens.map((codigo) => ({ codigo: codigo })),
        },
      },
    });
  }

  async confirmar(codigo: number): Promise<void> {
    const itensPedido = await prismaClient.itensPedido.findMany({
      select: {
        quantidade: true,
        produto: { select: { codigo: true, estoque: true, nome: true } },
      },
      where: { codigoPedido: codigo },
    });

    itensPedido.forEach((item) => {
      if (item.quantidade > item.produto.estoque) {
        throw new Error(`Estoque insuficiente para ${item.produto.nome}`);
      }
    });

    await prismaClient.pedido.update({
      data: { status: 1 },
      where: { codigo },
    });

    await Promise.all(
      itensPedido.map(async (item) =>
        prismaClient.produto.update({
          data: { estoque: { decrement: item.quantidade } },
          where: { codigo: item.produto.codigo },
        })
      )
    );
  }

  async negar(codigo: number, justificativa: string): Promise<void> {
    await prismaClient.pedido.update({
      data: { status: 2, justificativaCancelamento: justificativa },
      where: { codigo },
    });
  }

  async cancelar(codigo: number, justificativa: string): Promise<void> {
    const itensPedido = await prismaClient.itensPedido.findMany({
      select: {
        quantidade: true,
        produto: { select: { codigo: true } },
        pedido: { select: { status: true } },
      },
      where: { codigoPedido: codigo },
    });

    await prismaClient.pedido.update({
      data: { status: 3, justificativaCancelamento: justificativa },
      where: { codigo },
    });

    await Promise.all(
      itensPedido.map(async (item) =>
        prismaClient.produto.update({
          data: {
            estoque: [1, 4].includes(item.pedido!.status)
              ? { increment: item.quantidade }
              : undefined,
          },
          where: { codigo: item.produto.codigo },
        })
      )
    );
  }

  async iniciar(codigo: number): Promise<void> {
    await prismaClient.pedido.update({
      data: { status: 4 },
      where: { codigo },
    });
  }

  async entregar(codigo: number): Promise<void> {
    await prismaClient.pedido.update({
      data: { status: 5 },
      where: { codigo },
    });
  }

  async finalizar(codigo: number): Promise<void> {
    await prismaClient.pedido.update({
      data: { status: 6 },
      where: { codigo },
    });
  }
}

export default PedidoRepositoryPostgresSQL;
