import { CategoriaListItem } from "@modelTypes/categoria";

interface CategoriaRepository {
  getAll(): Promise<CategoriaListItem[]>;
}

export default CategoriaRepository;
