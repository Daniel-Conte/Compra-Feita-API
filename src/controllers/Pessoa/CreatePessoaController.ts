import { NextFunction, Request, Response } from "express";

import IPessoaRepository from "@repositories/PessoaRepository/IPessoaRepository";
import { CreatePessoaDTO } from "@modelTypes/pessoa";

class CreatePessoaController {
  constructor(private pessoaRepository: IPessoaRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const created = await this.exec(req.body);

      return res.status(201).json({ message: created });
    } catch (error) {
      next(error);
    }
  }

  async exec(data: CreatePessoaDTO) {
    const alreadyExists = await this.pessoaRepository.getByEmail(data.email);

    if (alreadyExists) throw new Error("Este e-mail já foi usado");
    if (!data.nome) throw new Error("Nome é obrigatório");
    if (!data.email) throw new Error("E-mail é obrigatório");
    if (!data.senha) throw new Error("Senha é obrigatória");
    if (!data.telefone) throw new Error("Telefone é obrigatório");

    this.pessoaRepository.insert(data);

    return "Usuário cadastrado com sucesso";
  }
}

export default CreatePessoaController;
