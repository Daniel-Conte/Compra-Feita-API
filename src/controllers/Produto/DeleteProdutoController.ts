import { NextFunction, Request, Response } from "express";

import IProdutoRepository from "@repositories/ProdutoRepository/IProdutoRepository";

class DeleteProdutoController {
  constructor(private produtoRepository: IProdutoRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await this.exec(Number(req.params.id));

      return res.status(200).json({ message: deleted });
    } catch (error) {
      next(error);
    }
  }

  async exec(codigo: number) {
    if (!codigo) throw new Error("Código é obrigatório");
    if (typeof codigo !== "number") throw new Error("Código inválido");

    const found = await this.produtoRepository.getById(codigo);

    if (!found) throw new Error("Produto não encontrado");

    await this.produtoRepository.delete(codigo);

    return "Produto excluído com sucesso";
  }
}

export default DeleteProdutoController;
