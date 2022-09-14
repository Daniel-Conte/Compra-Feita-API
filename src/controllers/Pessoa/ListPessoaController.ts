import { Request, Response } from "express";

import IPessoaRepository from "@repositories/PessoaRepository/IPessoaRepository";
import sendError from "@utils/sendError";

class ListPessoaController {
  constructor(private pessoaRepository: IPessoaRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const pessoaList = await this.exec();

      return res.status(200).json(pessoaList);
    } catch (error) {
      const err: any = error;

      return sendError({
        message: err?.message || "Unexpected error",
        status: 400,
        res,
      });
    }
  }

  async exec() {
    const pessoaList = await this.pessoaRepository.getAll();

    return pessoaList;
  }
}

export default ListPessoaController;
