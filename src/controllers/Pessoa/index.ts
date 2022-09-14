import PessoaRepositoryPostgresSQL from "../../repositories/PessoaRepository/PessoaRepositoryPostgresSQL";
import CreatePessoaController from "./CreatePessoaController";
import ListPessoaController from "./ListPessoaController";

const pessoaRepositoryPostgresSQL = new PessoaRepositoryPostgresSQL();

export const createPessoaController = new CreatePessoaController(
  pessoaRepositoryPostgresSQL
);
export const listPessoaController = new ListPessoaController(
  pessoaRepositoryPostgresSQL
);
