import { Categoria } from "@modelTypes/categoria";
import ICategoriaRepository from "./ICategoriaRepository";

class CategoriaRepositoryInMemory implements ICategoriaRepository {
  private categorias: Categoria[] = [];

  async getAll(): Promise<Categoria[]> {
    return this.categorias;
  }
}

export default CategoriaRepositoryInMemory;
