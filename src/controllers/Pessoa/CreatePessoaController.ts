import { Request, Response } from "express";

import Pessoa from "@models/Pessoa";
import IPessoaRepository from "@repositories/PessoaRepository/IPessoaRepository";
import sendError from "@utils/sendError";
import type { ICreatePessoaDTO } from "./PessoaDTO";

class CreatePessoaController {
  constructor(private pessoaRepository: IPessoaRepository) {}

  async handle(req: Request, res: Response) {
    try {
      await this.exec(req.body);

      return res.status(201).send();
    } catch (error) {
      const err: any = error;

      return sendError({
        message: err?.message || "Unexpected error",
        status: 400,
        res,
      });
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
