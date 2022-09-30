import { CreatePedidoDTO, Pedido } from "@modelTypes/pedido";

interface PedidoRepository {
  getAll(): Promise<Pedido[]>;
  getByUser(pessoaCodigo: number): Promise<Pedido[]>;
  getById(codigo: number): Promise<Pedido | null>;
  insert(pedido: CreatePedidoDTO): Promise<void>;
  confirmar(codigo: number): Promise<void>;
  iniciar(codigo: number): Promise<void>;
  cancelar(codigo: number, justificativa: string): Promise<void>;
  negar(codigo: number, justificativa: string): Promise<void>;
  finalizar(codigo: number): Promise<void>;
}

export default PedidoRepository;
