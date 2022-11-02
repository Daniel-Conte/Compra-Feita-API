import type {
  CreateItemPedidoDTO,
  ItemPedido,
  ItemPedidoListItem,
  UpdateQuantidadeItemPedidoDTO,
} from "@modelTypes/itemPedido";

interface IItemPedidoRepository {
  getAll(codigoPessoa: number): Promise<ItemPedido[]>;
  getCarrinhoCompras(codigoPessoa: number): Promise<ItemPedidoListItem[]>;
  getById(codigo: number): Promise<ItemPedido | null>;
  insert(itemPedido: CreateItemPedidoDTO): Promise<void>;
  updateQuantidade(data: UpdateQuantidadeItemPedidoDTO): Promise<void>;
  delete(codigo: number): Promise<void>;
}

export default IItemPedidoRepository;
