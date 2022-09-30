import prismaClient from "@database/prismaClient";
import { Categoria } from "@modelTypes/categoria";
import ICategoriaRepository from "./ICategoriaRepository";

class CategoriaRepositoryPostgresSQL implements ICategoriaRepository {
  async getAll(): Promise<Categoria[]> {
    return prismaClient.categoria.findMany();
  }
}

export default CategoriaRepositoryPostgresSQL;
