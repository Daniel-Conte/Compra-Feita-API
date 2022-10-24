import PessoaRepositoryPostgresSQL from "@repositories/PessoaRepository/PessoaRepositoryPostgresSQL";
import PasswordProviderBCrypt from "@providers/password/PasswordProviderBCrypt";
import AuthTokenProviderJWT from "@providers/authToken/AuthTokenProviderJWT";
import { authSecret, tokenExp } from "@config/index";
import CreatePessoaController from "./CreatePessoaController";
import DeletePessoaController from "./DeletePessoaController";
import GetPessoaController from "./GetPessoaController";
import ListPessoaController from "./ListPessoaController";
import UpdatePessoaController from "./UpdatePessoaController";

export const pessoaRepositoryPostgresSQL = new PessoaRepositoryPostgresSQL();
const passwordProviderBCrypt = new PasswordProviderBCrypt();
const authTokenProviderJWT = new AuthTokenProviderJWT(authSecret, tokenExp);

export const createPessoaController = new CreatePessoaController(
  pessoaRepositoryPostgresSQL,
  passwordProviderBCrypt
);
export const listPessoaController = new ListPessoaController(
  pessoaRepositoryPostgresSQL
);
export const updatePessoaController = new UpdatePessoaController(
  pessoaRepositoryPostgresSQL,
  authTokenProviderJWT
);
export const getPessoaController = new GetPessoaController(
  pessoaRepositoryPostgresSQL
);
export const deletePessoaController = new DeletePessoaController(
  pessoaRepositoryPostgresSQL
);
