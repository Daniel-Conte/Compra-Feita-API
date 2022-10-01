import { NextFunction, Request, Response } from "express";

import IPedidoRepository from "@repositories/PedidoRepository/IPedidoRepository";
import { CreatePedidoDTO } from "@modelTypes/pedido";
import { AuthTokenDecoded } from "@modelTypes/auth";

class CreatePedidoController {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as AuthTokenDecoded;
      const created = await this.exec({
        ...req.body,
        pessoaCodigo: user.codigo,
      });

      return res.status(201).json({ message: created });
    } catch (error) {
      next(error);
    }
  }

  async exec(data: CreatePedidoDTO) {
    if (!data.enderecoCodigo) throw new Error("Endereço é obrigatório");
    if (!data.pessoaCodigo) throw new Error("Usuário é obrigatório");
    if (!data.metodoPagamento) {
      throw new Error("Método de pagamento é obrigatório");
    }
    if (![1, 2].includes(data.metodoPagamento)) {
      throw new Error("Método de pagamento inválido");
    }
    if (!data.itens?.length) {
      throw new Error(
        "É necessário ter ao menos 1 item no carrinho de compras"
      );
    }

    await this.pedidoRepository.insert(data);

    return "Pedido realizado com sucesso";
  }
}

export default CreatePedidoController;
