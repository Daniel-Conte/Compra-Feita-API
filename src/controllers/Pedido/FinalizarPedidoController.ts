import { NextFunction, Request, Response } from "express";

import IPedidoRepository from "@repositories/PedidoRepository/IPedidoRepository";

class FinalizarPedidoController {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await this.exec(Number(req.params.id));

      return res.status(200).json({ message: updated });
    } catch (error) {
      next(error);
    }
  }

  async exec(codigo: number) {
    if (!codigo) throw new Error("Código é obrigatório");
    if (typeof codigo !== "number") throw new Error("Código inválido");

    const pedido = await this.pedidoRepository.getById(codigo);

    if (!pedido) throw new Error("Pedido não encontrado");
    if (![1, 4].includes(pedido.status))
      throw new Error("Pedido não pode ser finalizado");

    await this.pedidoRepository.finalizar(codigo);

    return "Pedido finalizado com sucesso";
  }
}

export default FinalizarPedidoController;
