import PessoaRepositoryPostgresSQL from "@repositories/PessoaRepository/PessoaRepositoryPostgresSQL";
import CreatePessoaController from "./CreatePessoaController";
import DeletePessoaController from "./DeletePessoaController";
import GetPessoaController from "./GetPessoaController";
import ListPessoaController from "./ListPessoaController";
import UpdatePessoaController from "./UpdatePessoaController";

const pessoaRepositoryPostgresSQL = new PessoaRepositoryPostgresSQL();

export const createPessoaController = new CreatePessoaController(
  pessoaRepositoryPostgresSQL
);
export const listPessoaController = new ListPessoaController(
  pessoaRepositoryPostgresSQL
);
export const updatePessoaController = new UpdatePessoaController(
  pessoaRepositoryPostgresSQL
);
export const getPessoaController = new GetPessoaController(
  pessoaRepositoryPostgresSQL
);
export const deletePessoaController = new DeletePessoaController(
  pessoaRepositoryPostgresSQL
);
