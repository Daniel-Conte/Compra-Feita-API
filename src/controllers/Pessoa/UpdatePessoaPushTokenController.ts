import { NextFunction, Request, Response } from "express";

import type IPessoaRepository from "@repositories/PessoaRepository/IPessoaRepository";
import type { AuthTokenDecoded } from "@modelTypes/auth";

class UpdatePessoaPushTokenController {
  constructor(private pessoaRepository: IPessoaRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as AuthTokenDecoded;

      const updated = await this.exec(user.codigo, req.body.pushToken);

      return res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  async exec(codigo: number, pushToken?: string) {
    if (!codigo) throw new Error("Usuário é obrigatório");

    const found = await this.pessoaRepository.getById(codigo);

    if (!found) throw new Error("Usuário não encontrado");

    await this.pessoaRepository.updatePushToken(codigo, pushToken || null);

    return { message: "Push token alterado com sucesso" };
  }
}

export default UpdatePessoaPushTokenController;
