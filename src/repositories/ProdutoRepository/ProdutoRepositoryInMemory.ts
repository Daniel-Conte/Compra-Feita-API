import type {
  CreateProdutoDTO,
  Produto,
  ProdutoListItem,
  UpdateProdutoDTO,
} from "@modelTypes/produto";
import IProdutoRepository from "./IProdutoRepository";

class ProdutoRepositoryInMemory implements IProdutoRepository {
  private produtos: Produto[] = [];

  async getAll(): Promise<ProdutoListItem[]> {
    return this.produtos.map((produto) => ({ ...produto, imagem: "" }));
  }

  async getById(codigo: number): Promise<Produto | null> {
    return this.produtos.find((produto) => produto.codigo === codigo) || null;
  }

  async getByName(name: string): Promise<Produto | null> {
    return this.produtos.find((produto) => produto.nome === name) || null;
  }

  async insert(produto: CreateProdutoDTO): Promise<void> {
    const codigo = this.produtos.length
      ? this.produtos[this.produtos.length - 1].codigo + 1
      : 1;

    this.produtos.push({
      ...produto,
      codigo,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    });
  }

  async update(produto: UpdateProdutoDTO): Promise<void> {
    const index = this.produtos.findIndex((it) => it.codigo === produto.codigo);
    const found = this.produtos[index];
    const newProduto = { ...found, ...produto };

    this.produtos.splice(index, 1, newProduto);
  }

  async delete(codigo: number): Promise<void> {
    this.produtos = this.produtos.filter(
      (produto) => produto.codigo !== codigo
    );
  }
}

export default ProdutoRepositoryInMemory;
