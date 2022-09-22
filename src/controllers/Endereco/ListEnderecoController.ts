import { NextFunction, Request, Response } from "express";

import IEnderecoRepository from "@repositories/EnderecoRepository/IEnderecoRepository";
import { AuthTokenDecoded } from "@modelTypes/auth";

class ListEnderecoController {
  constructor(private enderecoRepository: IEnderecoRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as AuthTokenDecoded;

      const enderecoList = await this.exec(user?.codigo);

      return res.status(200).json({ data: enderecoList });
    } catch (error) {
      next(error);
    }
  }

  async exec(codigoPessoa: number) {
    if (!codigoPessoa) throw new Error("Usuário é obrigatório");

    const enderecoList = await this.enderecoRepository.getAll(codigoPessoa);

    return enderecoList;
  }
}

export default ListEnderecoController;
