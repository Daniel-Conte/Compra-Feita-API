import { CreatePedidoDTO, Pedido, UpdatePedidoDTO } from "@modelTypes/pedido";

interface PedidoRepository {
  getAll(): Promise<Pedido[]>;
  getById(codigo: number): Promise<Pedido | null>;
  insert(pedido: CreatePedidoDTO): Promise<void>;
  update(pedido: UpdatePedidoDTO): Promise<void>;
  delete(codigo: number): Promise<void>;
}

export default PedidoRepository;
