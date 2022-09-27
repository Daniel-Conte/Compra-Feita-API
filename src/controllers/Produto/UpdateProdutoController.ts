import { NextFunction, Request, Response } from "express";

import IProdutoRepository from "@repositories/ProdutoRepository/IProdutoRepository";
import { UpdateProdutoDTO } from "@modelTypes/produto";

class UpdateProdutoController {
  constructor(private produtoRepository: IProdutoRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await this.exec(req.body);

      return res.status(200).json({ message: updated });
    } catch (error) {
      next(error);
    }
  }

  async exec(data: UpdateProdutoDTO) {
    if (!data.codigo) throw new Error("Código é obrigatório");
    if (!data.nome) throw new Error("Nome é obrigatório");
    if (!data.codigoCategoria) throw new Error("Categoria é obrigatória");
    if (!data.descricao) throw new Error("Descrição é obrigatória");
    if (!data.estoque) throw new Error("Estoque é obrigatório");
    if (!data.precoUnitario) throw new Error("Preço é obrigatório");

    const found = await this.produtoRepository.getById(data.codigo);

    if (!found) throw new Error("Produto não encontrado");

    await this.produtoRepository.update(data);

    return "Produto alterado com sucesso";
  }
}

export default UpdateProdutoController;
