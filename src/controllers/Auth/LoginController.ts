import { NextFunction, Request, Response } from "express";

import IPessoaRepository from "@repositories/PessoaRepository/IPessoaRepository";
import { LoginDTO } from "@modelTypes/auth";
import validateEmail from "@utils/validateEmail";
import IPasswordProvider from "@providers/password/IPasswordProvider";
import IAuthTokenProvider from "@providers/authToken/IAuthTokenProvider";

class LoginController {
  constructor(
    private pessoaRepository: IPessoaRepository,
    private passwordProvider: IPasswordProvider,
    private authTokenProvider: IAuthTokenProvider
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const loginToken = await this.exec(req.body);

      return res.status(200).json({ data: loginToken });
    } catch (error) {
      next(error);
    }
  }

  async exec(data: LoginDTO) {
    if (!data.email) throw new Error("E-mail é obrigatório");
    if (!validateEmail(data.email)) throw new Error("E-mail inválido");
    if (!data.senha) throw new Error("Senha é obrigatória");

    const user = await this.pessoaRepository.getByEmail(data.email);

    if (!user) throw new Error("E-mail ou senha inválidos");

    if (this.passwordProvider.comparePasswords(data.senha, user.senha)) {
      return this.authTokenProvider.generateAuthToken(user);
    } else {
      throw new Error("E-mail ou senha inválidos");
    }
  }
}

export default LoginController;
