import { NextFunction, Request, Response } from "express";

import IPedidoRepository from "@repositories/PedidoRepository/IPedidoRepository";

class ListPedidoController {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const pedidoList = await this.exec();

      return res.status(200).json({ data: pedidoList });
    } catch (error) {
      next(error);
    }
  }

  async exec() {
    const pedidoList = await this.pedidoRepository.getAll();

    return pedidoList;
  }
}

export default ListPedidoController;
