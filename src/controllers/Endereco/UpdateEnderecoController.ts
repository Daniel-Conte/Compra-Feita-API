import { NextFunction, Request, Response } from "express";

import IEnderecoRepository from "@repositories/EnderecoRepository/IEnderecoRepository";
import { UpdateEnderecoDTO } from "@modelTypes/endereco";

class UpdateEnderecoController {
  constructor(private enderecoRepository: IEnderecoRepository) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const updated = await this.exec(req.body);

      return res.status(200).json({ message: updated });
    } catch (error) {
      next(error);
    }
  }

  async exec(data: UpdateEnderecoDTO) {
    if (!data.codigo) throw new Error("Código é obrigatório");
    if (!data.nome) throw new Error("Nome é obrigatório");
    if (!data.bairro) throw new Error("Bairro é obrigatório");
    if (!data.cep) throw new Error("CEP é obrigatório");
    if (!data.cidade) throw new Error("Cidade é obrigatória");
    if (!data.codigoPessoa) throw new Error("Usuário é obrigatório");
    if (!data.numero) throw new Error("Número é obrigatório");
    if (!data.rua) throw new Error("Rua é obrigatória");
    if (!data.uf) throw new Error("UF é obrigatória");

    const found = await this.enderecoRepository.getById(data.codigo);

    if (!found) throw new Error("Endereço não encontrado");

    await this.enderecoRepository.update(data);

    return "Endereço alterado com sucesso";
  }
}

export default UpdateEnderecoController;
