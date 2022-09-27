import { NextFunction, Request, Response } from "express";

import IProdutoRepository from "@repositories/ProdutoRepository/IProdutoRepository";

class GetProdutoController {
  constructor(private produtoRepository: IProdutoRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const produto = await this.exec(Number(req.params.id));

      return res.status(200).json({ data: produto });
    } catch (error) {
      next(error);
    }
  }

  async exec(codigo: number) {
    if (!codigo) throw new Error("Código é obrigatório");
    if (typeof codigo !== "number") throw new Error("Código inválido");

    const produto = await this.produtoRepository.getById(codigo);

    if (!produto) throw new Error("Produto não encontrado");

    return produto;
  }
}

export default GetProdutoController;
