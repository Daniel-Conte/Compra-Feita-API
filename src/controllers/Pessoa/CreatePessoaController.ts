import { NextFunction, Request, Response } from "express";

import type IPessoaRepository from "@repositories/PessoaRepository/IPessoaRepository";
import type IPasswordProvider from "@providers/password/IPasswordProvider";
import type { CreatePessoaDTO } from "@modelTypes/pessoa";
import type { AuthTokenDecoded } from "@modelTypes/auth";
import validateEmail from "@utils/validateEmail";

class CreatePessoaController {
  constructor(
    private pessoaRepository: IPessoaRepository,
    private passwordProvider: IPasswordProvider
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as AuthTokenDecoded | undefined;
      const pessoa: CreatePessoaDTO = { ...req.body };

      if (!user?.admin) pessoa.admin = 0;

      const created = await this.exec(pessoa);

      return res.status(201).json({ message: created });
    } catch (error) {
      next(error);
    }
  }

  async exec(data: CreatePessoaDTO) {
    if (!data.nome) throw new Error("Nome é obrigatório");
    if (!data.email) throw new Error("E-mail é obrigatório");
    if (!validateEmail(data.email)) throw new Error("E-mail inválido");
    if (!data.senha) throw new Error("Senha é obrigatória");
    if (!data.telefone) throw new Error("Telefone é obrigatório");

    const alreadyExists = await this.pessoaRepository.getByEmail(data.email);

    if (alreadyExists) throw new Error("Este e-mail já foi usado");

    const user = { ...data };
    user.senha = this.passwordProvider.encryptPassword(user.senha);

    await this.pessoaRepository.insert(user);

    return "Usuário cadastrado com sucesso";
  }
}

export default CreatePessoaController;
