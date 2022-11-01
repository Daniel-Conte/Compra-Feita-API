import prismaClient from "@database/prismaClient";
import { CategoriaListItem } from "@modelTypes/categoria";
import ICategoriaRepository from "./ICategoriaRepository";

class CategoriaRepositoryPostgresSQL implements ICategoriaRepository {
  async getAll(): Promise<CategoriaListItem[]> {
    return prismaClient.categoria.findMany({
      select: {
        codigo: true,
        nome: true,
        descricao: true,
        codigoCategoriaPai: true,
      },
    });
  }
}

export default CategoriaRepositoryPostgresSQL;
