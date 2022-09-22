import { NextFunction, Request, Response } from "express";

import IEnderecoRepository from "@repositories/EnderecoRepository/IEnderecoRepository";
import { CreateEnderecoDTO } from "@modelTypes/endereco";

class CreateEnderecoController {
  constructor(private enderecoRepository: IEnderecoRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const created = await this.exec(req.body);

      return res.status(201).json({ message: created });
    } catch (error) {
      next(error);
    }
  }

  async exec(data: CreateEnderecoDTO) {
    if (!data.nome) throw new Error("Nome é obrigatório");
    if (!data.bairro) throw new Error("Bairro é obrigatório");
    if (!data.cep) throw new Error("CEP é obrigatório");
    if (!data.cidade) throw new Error("Cidade é obrigatória");
    if (!data.codigoPessoa) throw new Error("Usuário é obrigatório");
    if (!data.numero) throw new Error("Número é obrigatório");
    if (!data.rua) throw new Error("Rua é obrigatória");
    if (!data.uf) throw new Error("UF é obrigatória");

    const alreadyExists = await this.enderecoRepository.getByName(
      data.nome,
      data.codigoPessoa
    );

    if (alreadyExists) throw new Error("Este endereço já foi adicionado");

    await this.enderecoRepository.insert(data);

    return "Endereço adicionado com sucesso";
  }
}

export default CreateEnderecoController;
