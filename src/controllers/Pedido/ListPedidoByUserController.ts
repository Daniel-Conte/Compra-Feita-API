import { NextFunction, Request, Response } from "express";

import type IPedidoRepository from "@repositories/PedidoRepository/IPedidoRepository";
import type { AuthTokenDecoded } from "@modelTypes/auth";

class ListPedidoByUserController {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as AuthTokenDecoded;
      const pedidoList = await this.exec(user.codigo);

      return res.status(200).json({ data: pedidoList });
    } catch (error) {
      next(error);
    }
  }

  async exec(pessoaCodigo: number) {
    const pedidoList = await this.pedidoRepository.getByUser(pessoaCodigo);

    return pedidoList;
  }
}

export default ListPedidoByUserController;
