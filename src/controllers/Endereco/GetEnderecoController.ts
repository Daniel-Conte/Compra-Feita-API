import { NextFunction, Request, Response } from "express";

import IEnderecoRepository from "@repositories/EnderecoRepository/IEnderecoRepository";

class GetEnderecoController {
  constructor(private enderecoRepository: IEnderecoRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const endereco = await this.exec(Number(req.params.id));

      return res.status(200).json({ data: endereco });
    } catch (error) {
      next(error);
    }
  }

  async exec(codigo: number) {
    if (!codigo) throw new Error("Código é obrigatório");
    if (typeof codigo !== "number") throw new Error("Código inválido");

    const endereco = await this.enderecoRepository.getById(codigo);

    if (!endereco) throw new Error("Endereço não encontrado");

    return endereco;
  }
}

export default GetEnderecoController;
