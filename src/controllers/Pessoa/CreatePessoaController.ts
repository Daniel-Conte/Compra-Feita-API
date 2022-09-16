import { NextFunction, Request, Response } from "express";

import IPessoaRepository from "@repositories/PessoaRepository/IPessoaRepository";
import { Pessoa } from "@modelTypes/pessoa";

class CreatePessoaController {
  constructor(private pessoaRepository: IPessoaRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.exec(req.body);

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  }

  async exec(data: Pessoa) {
    const alreadyExists = await this.pessoaRepository.getByEmail(data.email);

    if (alreadyExists) throw new Error("Este e-mail já foi usado");

    this.pessoaRepository.save(data);
  }
}

export default CreatePessoaController;
