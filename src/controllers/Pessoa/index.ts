import PessoaRepositoryPostgresSQL from "@repositories/PessoaRepository/PessoaRepositoryPostgresSQL";
import PasswordProviderBCrypt from "@providers/password/PasswordProviderBCrypt";
import CreatePessoaController from "./CreatePessoaController";
import DeletePessoaController from "./DeletePessoaController";
import GetPessoaController from "./GetPessoaController";
import ListPessoaController from "./ListPessoaController";
import UpdatePessoaController from "./UpdatePessoaController";

const pessoaRepositoryPostgresSQL = new PessoaRepositoryPostgresSQL();
const passwordProviderBCrypt = new PasswordProviderBCrypt();

export const createPessoaController = new CreatePessoaController(
  pessoaRepositoryPostgresSQL,
  passwordProviderBCrypt
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
