import PessoaRepositoryPostgresSQL from "../../repositories/PessoaRepository/PessoaRepositoryPostgresSQL";
import PessoaListController from "./PessoaListController";
import PessoaListUseCase from "./PessoaListUseCase";

const pessoaRepositoryPostgresSQL = new PessoaRepositoryPostgresSQL();

const pessoaListUseCase = new PessoaListUseCase(pessoaRepositoryPostgresSQL);

const pessoaListController = new PessoaListController(pessoaListUseCase);

export { pessoaListController, pessoaListUseCase };
