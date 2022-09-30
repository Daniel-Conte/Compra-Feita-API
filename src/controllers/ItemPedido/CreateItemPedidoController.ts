import { NextFunction, Request, Response } from "express";

import IItemPedidoRepository from "@repositories/ItemPedidoRepository/IItemPedidoRepository";
import IProdutoRepository from "@repositories/ProdutoRepository/IProdutoRepository";
import { CreateItemPedidoDTO } from "@modelTypes/itemPedido";
import { AuthTokenDecoded } from "@modelTypes/auth";

class CreateItemPedidoController {
  constructor(
    private itemPedidoRepository: IItemPedidoRepository,
    private produtoRepository: IProdutoRepository
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as AuthTokenDecoded;
      const created = await this.exec({
        ...req.body,
        codigoPessoa: user.codigo,
      });

      return res.status(201).json({ message: created });
    } catch (error) {
      next(error);
    }
  }

  async exec(data: Omit<CreateItemPedidoDTO, "nomeProduto" | "precoUnitario">) {
    if (!data.codigoProduto) throw new Error("Produto é obrigatório");
    if (!data.quantidade) throw new Error("Quantidade é obrigatória");
    if (!data.codigoPessoa) throw new Error("Usuário é obrigatório");

    const newItem = { ...data } as CreateItemPedidoDTO;
    const produto = await this.produtoRepository.getById(data.codigoProduto);

    if (!produto) throw new Error("Não foi possível localizar o produto");

    newItem.nomeProduto = produto.nome;
    newItem.precoUnitario = produto.precoUnitario;

    await this.itemPedidoRepository.insert(newItem);

    return "Produto adicionado ao carrinho de compras";
  }
}

export default CreateItemPedidoController;
