import { NextFunction, Request, Response } from "express";

import IProdutoRepository from "@repositories/ProdutoRepository/IProdutoRepository";
import { CreateProdutoDTO } from "@modelTypes/produto";

class CreateProdutoController {
  constructor(private produtoRepository: IProdutoRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const created = await this.exec({
        ...req.body,
      });

      return res.status(201).json({ message: created });
    } catch (error) {
      next(error);
    }
  }

  async exec(data: CreateProdutoDTO) {
    if (!data.nome) throw new Error("Nome é obrigatório");
    if (!data.codigoCategoria) throw new Error("Categoria é obrigatória");
    if (!data.descricao) throw new Error("Descrição é obrigatória");
    if (!data.estoque) throw new Error("Estoque é obrigatório");
    if (!data.precoUnitario) throw new Error("Preço é obrigatório");

    const alreadyExists = await this.produtoRepository.getByName(data.nome);

    if (alreadyExists) throw new Error("Este produto já está cadastrado");

    await this.produtoRepository.insert(data);

    return "Produto cadastrado com sucesso";
  }
}

export default CreateProdutoController;
