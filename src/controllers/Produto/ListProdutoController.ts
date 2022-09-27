import { NextFunction, Request, Response } from "express";

import IProdutoRepository from "@repositories/ProdutoRepository/IProdutoRepository";

class ListProdutoController {
  constructor(private produtoRepository: IProdutoRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const produtoList = await this.exec();

      return res.status(200).json({ data: produtoList });
    } catch (error) {
      next(error);
    }
  }

  async exec() {
    const produtoList = await this.produtoRepository.getAll();

    return produtoList;
  }
}

export default ListProdutoController;
