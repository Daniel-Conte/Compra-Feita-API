import { Categoria, CategoriaListItem } from "@modelTypes/categoria";
import ICategoriaRepository from "./ICategoriaRepository";

class CategoriaRepositoryInMemory implements ICategoriaRepository {
  private categorias: Categoria[] = [];

  async getAll(): Promise<CategoriaListItem[]> {
    return this.categorias;
  }
}

export default CategoriaRepositoryInMemory;
