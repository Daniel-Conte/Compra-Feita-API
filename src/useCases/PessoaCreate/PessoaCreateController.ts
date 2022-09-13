import { Request, Response } from "express";

import sendError from "../../utils/sendError";
import PessoaCreateUseCase from "./PessoaCreateUseCase";

class PessoaCreateController {
  constructor(private pessoaCreateUseCase: PessoaCreateUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      await this.pessoaCreateUseCase.exec(req.body);

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
}

export default PessoaCreateController;
