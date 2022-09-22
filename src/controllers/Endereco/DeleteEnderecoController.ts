import { NextFunction, Request, Response } from "express";

import IEnderecoRepository from "@repositories/EnderecoRepository/IEnderecoRepository";

class DeleteEnderecoController {
  constructor(private enderecoRepository: IEnderecoRepository) {}

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

    const found = await this.enderecoRepository.getById(codigo);

    if (!found) throw new Error("Endereço não encontrado");

    await this.enderecoRepository.delete(codigo);

    return "Endereço excluído com sucesso";
  }
}

export default DeleteEnderecoController;
