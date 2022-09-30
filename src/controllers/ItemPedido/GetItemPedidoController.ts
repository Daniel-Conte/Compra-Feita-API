import { NextFunction, Request, Response } from "express";

import IItemPedidoRepository from "@repositories/ItemPedidoRepository/IItemPedidoRepository";

class GetItemPedidoController {
  constructor(private itemPedidoRepository: IItemPedidoRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const itemPedido = await this.exec(Number(req.params.id));

      return res.status(200).json({ data: itemPedido });
    } catch (error) {
      next(error);
    }
  }

  async exec(codigo: number) {
    if (!codigo) throw new Error("Código é obrigatório");
    if (typeof codigo !== "number") throw new Error("Código inválido");

    const itemPedido = await this.itemPedidoRepository.getById(codigo);

    if (!itemPedido) throw new Error("Item não encontrado");

    return itemPedido;
  }
}

export default GetItemPedidoController;
