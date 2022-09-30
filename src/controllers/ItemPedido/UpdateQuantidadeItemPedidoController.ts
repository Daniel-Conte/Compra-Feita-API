import { NextFunction, Request, Response } from "express";

import IItemPedidoRepository from "@repositories/ItemPedidoRepository/IItemPedidoRepository";
import { UpdateQuantidadeItemPedidoDTO } from "@modelTypes/itemPedido";

class UpdateItemPedidoController {
  constructor(private itemPedidoRepository: IItemPedidoRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await this.exec(req.body);

      return res.status(200).json({ message: updated });
    } catch (error) {
      next(error);
    }
  }

  async exec(data: UpdateQuantidadeItemPedidoDTO) {
    if (!data.codigo) throw new Error("Código é obrigatório");
    if (!data.quantidade) throw new Error("Quantidade é obrigatória");

    const found = await this.itemPedidoRepository.getById(data.codigo);

    if (!found) throw new Error("Item não encontrado");

    await this.itemPedidoRepository.updateQuantidade(data);

    return "Quantidade alterada com sucesso";
  }
}

export default UpdateItemPedidoController;
