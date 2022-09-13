import type IPessoaRepository from "../../repositories/PessoaRepository/IPessoaRepository";
import type IPessoaListDTO from "./PessoaListDTO";

class PessoaListUseCase {
  constructor(private pessoaRepository: IPessoaRepository) {}

  async exec() {
    const pessoaList = await this.pessoaRepository.getAll();

    return pessoaList;
  }
}

export default PessoaListUseCase;
