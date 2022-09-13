import Pessoa from "../../entities/Pessoa";
import type IPessoaRepository from "../../repositories/PessoaRepository/IPessoaRepository";
import type IPessoaCreateDTO from "./PessoaCreateDTO";

class PessoaCreateUseCase {
  constructor(private pessoaRepository: IPessoaRepository) {}

  async exec(data: IPessoaCreateDTO) {
    const alreadyExists = await this.pessoaRepository.getByEmail(data.email);

    if (alreadyExists) {
      throw new Error("Este e-mail já foi usado");
    }

    const pessoa = new Pessoa(data);

    this.pessoaRepository.save(pessoa);
  }
}

export default PessoaCreateUseCase;
