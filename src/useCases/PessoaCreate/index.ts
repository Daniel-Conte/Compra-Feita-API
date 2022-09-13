import PessoaRepositoryPostgresSQL from "../../repositories/PessoaRepository/PessoaRepositoryPostgresSQL";
import PessoaCreateController from "./PessoaCreateController";
import PessoaCreateUseCase from "./PessoaCreateUseCase";

const pessoaRepositoryPostgresSQL = new PessoaRepositoryPostgresSQL();

const pessoaCreateUseCase = new PessoaCreateUseCase(
  pessoaRepositoryPostgresSQL
);

const pessoaCreateController = new PessoaCreateController(pessoaCreateUseCase);

export { pessoaCreateController, pessoaCreateUseCase };
