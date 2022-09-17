import PasswordProviderBCrypt from "@providers/password/PasswordProviderBCrypt";
import { pessoaRepositoryPostgresSQL } from "@controllers/Pessoa";
import AuthTokenProviderJWT from "@providers/authToken/AuthTokenProviderJWT";
import { authSecret } from "@config/index";
import LoginController from "./LoginController";

const passwordProviderBCrypt = new PasswordProviderBCrypt();
const authTokenProviderJWT = new AuthTokenProviderJWT(
  authSecret,
  Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1 // 1 dia
);

export const loginController = new LoginController(
  pessoaRepositoryPostgresSQL,
  passwordProviderBCrypt,
  authTokenProviderJWT
);
