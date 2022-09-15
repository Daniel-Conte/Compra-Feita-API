import { NextFunction, Request, Response } from "express";

import Pessoa from "@models/Pessoa";
import IPessoaRepository from "@repositories/PessoaRepository/IPessoaRepository";
import type { ICreatePessoaDTO } from "./PessoaDTO";

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

  async exec(data: ICreatePessoaDTO) {
    const alreadyExists = await this.pessoaRepository.getByEmail(data.email);

    if (alreadyExists) {
      throw new Error("Este e-mail já foi usado");
    }

    const pessoa = new Pessoa(data);

    this.pessoaRepository.save(pessoa);
  }
}

export default CreatePessoaController;
