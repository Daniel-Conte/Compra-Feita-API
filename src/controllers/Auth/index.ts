import PasswordProviderBCrypt from "@providers/password/PasswordProviderBCrypt";
import { pessoaRepositoryPostgresSQL } from "@controllers/Pessoa";
import AuthTokenProviderJWT from "@providers/authToken/AuthTokenProviderJWT";
import { authSecret, tokenExp } from "@config/index";
import LoginController from "./LoginController";
import ValidateTokenController from "./ValidateTokenController";

const passwordProviderBCrypt = new PasswordProviderBCrypt();
const authTokenProviderJWT = new AuthTokenProviderJWT(authSecret, tokenExp);

export const loginController = new LoginController(
  pessoaRepositoryPostgresSQL,
  passwordProviderBCrypt,
  authTokenProviderJWT
);

export const validateTokenController = new ValidateTokenController(
  authTokenProviderJWT
);
