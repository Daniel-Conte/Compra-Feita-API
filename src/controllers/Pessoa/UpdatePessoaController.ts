import { NextFunction, Request, Response } from "express";

import type IPessoaRepository from "@repositories/PessoaRepository/IPessoaRepository";
import type IAuthTokenProvider from "@providers/authToken/IAuthTokenProvider";
import type { UpdatePessoaDTO } from "@modelTypes/pessoa";
import validateEmail from "@utils/validateEmail";

class UpdatePessoaController {
  constructor(
    private pessoaRepository: IPessoaRepository,
    private authTokenProvider: IAuthTokenProvider
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const isSessionUser = !!req.query.sessionUser;
      const updated = await this.exec(req.body, isSessionUser);

      return res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  async exec(data: UpdatePessoaDTO, isSessionUser: boolean) {
    if (!data.codigo) throw new Error("Código é obrigatório");
    if (!data.nome) throw new Error("Nome é obrigatório");
    if (!data.email) throw new Error("E-mail é obrigatório");
    if (!validateEmail(data.email)) throw new Error("E-mail inválido");
    if (!data.telefone) throw new Error("Telefone é obrigatório");

    const found = await this.pessoaRepository.getById(data.codigo);

    if (!found) throw new Error("Usuário não encontrado");
    const foundEmail = await this.pessoaRepository.getByEmail(data.email);

    if (foundEmail && foundEmail.codigo !== found.codigo) {
      throw new Error("Este e-mail já foi usado");
    }

    const updatedPessoa = await this.pessoaRepository.update(data);

    const resp: Record<string, any> = {
      message: "Usuário alterado com sucesso",
    };

    if (isSessionUser) {
      const newToken = this.authTokenProvider.generateAuthToken(updatedPessoa);
      resp.token = newToken;
    }

    return resp;
  }
}

export default UpdatePessoaController;
