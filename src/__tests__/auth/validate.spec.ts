import PessoaRepositoryInMemory from "@repositories/PessoaRepository/PessoaRepositoryInMemory";
import PasswordProviderBCrypt from "@providers/password/PasswordProviderBCrypt";
import CreatePessoaController from "@controllers/Pessoa/CreatePessoaController";
import { CreatePessoaDTO } from "@modelTypes/pessoa";
import LoginController from "@controllers/Auth/LoginController";
import AuthTokenProviderJWT from "@providers/authToken/AuthTokenProviderJWT";
import { authSecret } from "@config/index";

const pessoaRepoInMemory = new PessoaRepositoryInMemory();
const passwordProviderBCrypt = new PasswordProviderBCrypt();
const authTokenProviderJWT = new AuthTokenProviderJWT(
  authSecret,
  Date.now() * 1000 * 10
);

const createPessoaController = new CreatePessoaController(
  pessoaRepoInMemory,
  passwordProviderBCrypt
);
const loginController = new LoginController(
  pessoaRepoInMemory,
  passwordProviderBCrypt,
  authTokenProviderJWT
);

describe("Teste Login", () => {
  it("Deve retornar erro de email obrigatorio", async () => {
    const pessoa: CreatePessoaDTO = {
      nome: "Teste1",
      email: "teste1@teste.com",
      senha: "123",
      telefone: "99912345678",
      admin: 0,
    };

    await createPessoaController.exec(pessoa);

    try {
      await loginController.exec({
        email: "",
        senha: "123",
      });

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("E-mail é obrigatório"));
    }
  });

  it("Deve retornar erro de senha obrigatoria", async () => {
    try {
      await loginController.exec({
        email: "teste1@teste.com",
        senha: "",
      });

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Senha é obrigatória"));
    }
  });

  it("Deve retornar erro de email ou senha inválidos", async () => {
    try {
      await loginController.exec({
        email: "teste@teste.com",
        senha: "123",
      });

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("E-mail ou senha inválidos"));
    }
  });

  it("Deve retornar erro de email ou senha inválidos", async () => {
    try {
      await loginController.exec({
        email: "teste1@teste.com",
        senha: "1232",
      });

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("E-mail ou senha inválidos"));
    }
  });
});
