import { CreatePedidoDTO, Pedido, UpdatePedidoDTO } from "@modelTypes/pedido";
import IPedidoRepository from "./IPedidoRepository";

class PedidoRepositoryInMemory implements IPedidoRepository {
  private pedidos: Pedido[] = [];

  async getAll(): Promise<Pedido[]> {
    return this.pedidos;
  }

  async getById(codigo: number): Promise<Pedido | null> {
    return this.pedidos.find((pedido) => pedido.codigo === codigo) || null;
  }

  async insert(pedido: CreatePedidoDTO): Promise<void> {
    const codigo = this.pedidos.length
      ? this.pedidos[this.pedidos.length - 1].codigo + 1
      : 1;

    this.pedidos.push({
      ...pedido,
      codigo,
      data: new Date(),
      atualizadoEm: new Date(),
    });
  }

  async update(pedido: UpdatePedidoDTO): Promise<void> {
    const index = this.pedidos.findIndex((it) => it.codigo === pedido.codigo);
    const found = this.pedidos[index];
    const newPedido = { ...found, ...pedido };

    this.pedidos.splice(index, 1, newPedido);
  }

  async delete(codigo: number): Promise<void> {
    this.pedidos = this.pedidos.filter((pedido) => pedido.codigo !== codigo);
  }
}

export default PedidoRepositoryInMemory;
