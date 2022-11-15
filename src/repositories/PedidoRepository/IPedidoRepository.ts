import { CreatePedidoDTO, Pedido, PedidoListItem } from "@modelTypes/pedido";

interface PedidoRepository {
  getAll(): Promise<PedidoListItem[]>;
  getByUser(pessoaCodigo: number): Promise<PedidoListItem[]>;
  getById(codigo: number): Promise<Pedido | null>;
  insert(pedido: CreatePedidoDTO): Promise<void>;
  confirmar(codigo: number): Promise<void>;
  iniciar(codigo: number): Promise<void>;
  cancelar(codigo: number, justificativa: string): Promise<void>;
  negar(codigo: number, justificativa: string): Promise<void>;
  entregar(codigo: number): Promise<void>;
  finalizar(codigo: number): Promise<void>;
}

export default PedidoRepository;
