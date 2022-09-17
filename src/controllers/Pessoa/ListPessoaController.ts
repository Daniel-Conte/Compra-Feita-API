import { NextFunction, Request, Response } from "express";

import IPessoaRepository from "@repositories/PessoaRepository/IPessoaRepository";

class ListPessoaController {
  constructor(private pessoaRepository: IPessoaRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const pessoaList = await this.exec();

      return res.status(200).json({ data: pessoaList });
    } catch (error) {
      next(error);
    }
  }

  async exec() {
    const pessoaList = await this.pessoaRepository.getAll();

    return pessoaList;
  }
}

export default ListPessoaController;
