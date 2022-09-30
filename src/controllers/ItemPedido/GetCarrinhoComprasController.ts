import { NextFunction, Request, Response } from "express";

import IItemPedidoRepository from "@repositories/ItemPedidoRepository/IItemPedidoRepository";
import { AuthTokenDecoded } from "@modelTypes/auth";

class ListItemPedidoController {
  constructor(private itemPedidoRepository: IItemPedidoRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as AuthTokenDecoded;

      const itemPedidoList = await this.exec(user?.codigo);

      return res.status(200).json({ data: itemPedidoList });
    } catch (error) {
      next(error);
    }
  }

  async exec(codigoPessoa: number) {
    if (!codigoPessoa) throw new Error("Usuário é obrigatório");

    const itemPedidoList = await this.itemPedidoRepository.getCarrinhoCompras(
      codigoPessoa
    );

    return itemPedidoList;
  }
}

export default ListItemPedidoController;
