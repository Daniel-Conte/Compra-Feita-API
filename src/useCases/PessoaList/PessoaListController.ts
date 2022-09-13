import { Request, Response } from "express";

import sendError from "../../utils/sendError";
import PessoaListUseCase from "./PessoaListUseCase";

class PessoaListController {
  constructor(private pessoaListUseCase: PessoaListUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const pessoaList = await this.pessoaListUseCase.exec();

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
}

export default PessoaListController;
