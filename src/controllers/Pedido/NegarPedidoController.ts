import { NextFunction, Request, Response } from "express";

import IPedidoRepository from "@repositories/PedidoRepository/IPedidoRepository";

class NegarPedidoController {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await this.exec(
        Number(req.params.id),
        req.body.justificativa
      );

      return res.status(200).json({ message: updated });
    } catch (error) {
      next(error);
    }
  }

  async exec(codigo: number, justificativa: string) {
    if (!codigo) throw new Error("Código é obrigatório");
    if (typeof codigo !== "number") throw new Error("Código inválido");
    if (!justificativa) throw new Error("Justificativa é obrigatória");

    const pedido = await this.pedidoRepository.getById(codigo);

    if (!pedido) throw new Error("Pedido não encontrado");
    if (pedido.status !== 0) throw new Error("Pedido não pode ser negado");

    await this.pedidoRepository.negar(codigo, justificativa);

    return "Pedido negado com sucesso";
  }
}

export default NegarPedidoController;
