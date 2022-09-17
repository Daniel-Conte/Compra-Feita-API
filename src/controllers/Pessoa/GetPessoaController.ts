import { NextFunction, Request, Response } from "express";

import IPessoaRepository from "@repositories/PessoaRepository/IPessoaRepository";

class GetPessoaController {
  constructor(private pessoaRepository: IPessoaRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const pessoa = await this.exec(Number(req.params.id));

      return res.status(200).json({ data: pessoa });
    } catch (error) {
      next(error);
    }
  }

  async exec(codigo: number) {
    if (!codigo) throw new Error("Código é obrigatório");
    if (typeof codigo !== "number") throw new Error("Código inválido");

    const pessoa = await this.pessoaRepository.getById(codigo);

    if (!pessoa) throw new Error("Usuário não encontrado");

    return pessoa;
  }
}

export default GetPessoaController;
