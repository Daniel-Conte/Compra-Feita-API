import { Categoria } from "@modelTypes/categoria";

interface CategoriaRepository {
  getAll(): Promise<Categoria[]>;
}

export default CategoriaRepository;
