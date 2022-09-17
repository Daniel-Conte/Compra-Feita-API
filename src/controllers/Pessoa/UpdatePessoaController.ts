import { NextFunction, Request, Response } from "express";

import IPessoaRepository from "@repositories/PessoaRepository/IPessoaRepository";
import { UpdatePessoaDTO } from "@modelTypes/pessoa";
import validateEmail from "@utils/validateEmail";

class UpdatePessoaController {
  constructor(private pessoaRepository: IPessoaRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await this.exec(req.body);

      return res.status(200).json({ message: updated });
    } catch (error) {
      next(error);
    }
  }

  async exec(data: UpdatePessoaDTO) {
    if (!data.codigo) throw new Error("Código é obrigatório");
    if (!data.nome) throw new Error("Nome é obrigatório");
    if (!data.email) throw new Error("E-mail é obrigatório");
    if (!validateEmail(data.email)) throw new Error("E-mail inválido");
    if (!data.senha) throw new Error("Senha é obrigatória");
    if (!data.telefone) throw new Error("Telefone é obrigatório");

    const found = await this.pessoaRepository.getById(data.codigo);

    if (!found) throw new Error("Usuário não encontrado");

    this.pessoaRepository.update(data);

    return "Usuário alterado com sucesso";
  }
}

export default UpdatePessoaController;
