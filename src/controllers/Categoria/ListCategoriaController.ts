import { NextFunction, Request, Response } from "express";

import ICategoriaRepository from "@repositories/CategoriaRepository/ICategoriaRepository";

class ListCategoriaController {
  constructor(private categoriaRepository: ICategoriaRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const categoriaList = await this.exec();

      return res.status(200).json({ data: categoriaList });
    } catch (error) {
      next(error);
    }
  }

  async exec() {
    const categoriaList = await this.categoriaRepository.getAll();

    return categoriaList;
  }
}

export default ListCategoriaController;
