import { NextFunction, Request, Response } from "express";

import IItemPedidoRepository from "@repositories/ItemPedidoRepository/IItemPedidoRepository";

class DeleteItemPedidoController {
  constructor(private itemPedidoRepository: IItemPedidoRepository) {}

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

    const found = await this.itemPedidoRepository.getById(codigo);

    if (!found) throw new Error("Item não encontrado");

    await this.itemPedidoRepository.delete(codigo);

    return "Produto removido do carrinho de compras";
  }
}

export default DeleteItemPedidoController;
