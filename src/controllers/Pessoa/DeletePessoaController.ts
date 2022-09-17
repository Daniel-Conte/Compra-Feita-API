import { NextFunction, Request, Response } from "express";

import IPessoaRepository from "@repositories/PessoaRepository/IPessoaRepository";

class DeletePessoaController {
  constructor(private pessoaRepository: IPessoaRepository) {}

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

    const found = await this.pessoaRepository.getById(codigo);

    if (!found) throw new Error("Usuário não encontrado");

    await this.pessoaRepository.delete(codigo);

    return "Usuário excluído com sucesso";
  }
}

export default DeletePessoaController;
