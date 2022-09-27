import {
  CreateProdutoDTO,
  Produto,
  UpdateProdutoDTO,
} from "@modelTypes/produto";

interface ProdutoRepository {
  getAll(): Promise<Produto[]>;
  getById(codigo: number): Promise<Produto | null>;
  getByName(name: string): Promise<Produto | null>;
  insert(produto: CreateProdutoDTO): Promise<void>;
  update(produto: UpdateProdutoDTO): Promise<void>;
  delete(codigo: number): Promise<void>;
}

export default ProdutoRepository;
