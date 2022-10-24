import PessoaRepositoryInMemory from "@repositories/PessoaRepository/PessoaRepositoryInMemory";
import PasswordProviderBCrypt from "@providers/password/PasswordProviderBCrypt";
import AuthTokenProviderJWT from "@providers/authToken/AuthTokenProviderJWT";
import { authSecret } from "@config/index";
import CreatePessoaController from "@controllers/Pessoa/CreatePessoaController";
import ListPessoaController from "@controllers/Pessoa/ListPessoaController";
import { CreatePessoaDTO, UpdatePessoaDTO } from "@modelTypes/pessoa";
import UpdatePessoaController from "@controllers/Pessoa/UpdatePessoaController";
import GetPessoaController from "@controllers/Pessoa/GetPessoaController";
import DeletePessoaController from "@controllers/Pessoa/DeletePessoaController";

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
const listPessoaController = new ListPessoaController(pessoaRepoInMemory);
const updatePessoaController = new UpdatePessoaController(
  pessoaRepoInMemory,
  authTokenProviderJWT
);
const getPessoaController = new GetPessoaController(pessoaRepoInMemory);
const deletePessoaController = new DeletePessoaController(pessoaRepoInMemory);

describe("Pessoa Fluxo", () => {
  it("Deve retornar listagem vazia", async () => {
    const res = await listPessoaController.exec();

    expect(res).toEqual([]);
  });

  it("Deve registrar um usuario", async () => {
    const pessoa: CreatePessoaDTO = {
      nome: "Teste1",
      email: "teste1@teste.com",
      senha: "123",
      telefone: "99912345678",
      admin: 0,
    };

    const res = await createPessoaController.exec(pessoa);

    expect(res).toEqual("Usuário cadastrado com sucesso");
  });

  it("Deve retornar o usuario cadastrado", async () => {
    const res = await getPessoaController.exec(1);

    expect(res).toEqual(
      expect.objectContaining({
        codigo: 1,
        nome: "Teste1",
        email: "teste1@teste.com",
        senha: expect.any(String),
        telefone: "99912345678",
        admin: 0,
        criadoEm: expect.any(Date),
        atualizadoEm: expect.any(Date),
      })
    );
  });

  it("Deve verificar se a senha está hasheada", async () => {
    const res = await getPessoaController.exec(1);

    expect(res.senha).toBeTruthy();
    expect(res.senha === "123").toBeFalsy();
    expect(res.senha.length).toBeGreaterThan(10);
  });

  it("Deve retornar listagem com 1 pessoa", async () => {
    const res = await listPessoaController.exec();

    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          codigo: 1,
          nome: "Teste1",
          email: "teste1@teste.com",
          telefone: "99912345678",
          admin: 0,
        }),
      ])
    );
    expect(res.length).toEqual(1);
  });

  it("Deve registrar outra pessoa", async () => {
    const pessoa: CreatePessoaDTO = {
      nome: "Teste2",
      email: "teste2@teste.com",
      senha: "456",
      telefone: "99912312312",
      admin: 1,
    };

    const res = await createPessoaController.exec(pessoa);

    expect(res).toEqual("Usuário cadastrado com sucesso");
  });

  it("Deve retornar listagem com 2 pessoas", async () => {
    const res = await listPessoaController.exec();

    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          codigo: expect.any(Number),
          nome: expect.any(String),
          email: expect.any(String),
          telefone: expect.any(String),
          admin: expect.any(Number),
        }),
      ])
    );
    expect(res.length).toEqual(2);
  });

  it("Deve alterar o primeiro usuario", async () => {
    const pessoa: UpdatePessoaDTO = {
      codigo: 1,
      nome: "Teste1Alt",
      email: "teste1Alt@teste.com",
      telefone: "999777777777",
      admin: 1,
    };

    const res = await updatePessoaController.exec(pessoa, false);

    expect(res).toEqual("Usuário alterado com sucesso");
  });

  it("Deve retornar o usuario alterado", async () => {
    const res = await getPessoaController.exec(1);

    expect(res).toEqual(
      expect.objectContaining({
        codigo: 1,
        nome: "Teste1Alt",
        email: "teste1Alt@teste.com",
        senha: expect.any(String),
        telefone: "999777777777",
        admin: 1,
        criadoEm: expect.any(Date),
        atualizadoEm: expect.any(Date),
      })
    );
  });

  it("Deve excluir o primeiro usuario", async () => {
    const res = await deletePessoaController.exec(1);

    expect(res).toEqual("Usuário excluído com sucesso");
  });

  it("Deve retornar listagem com 1 pessoa", async () => {
    const res = await listPessoaController.exec();

    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          codigo: expect.any(Number),
          nome: expect.any(String),
          email: expect.any(String),
          telefone: expect.any(String),
          admin: expect.any(Number),
        }),
      ])
    );
    expect(res.length).toEqual(1);
  });

  it("Deve excluir o último usuario", async () => {
    const res = await deletePessoaController.exec(2);

    expect(res).toEqual("Usuário excluído com sucesso");
  });

  it("Deve retornar listagem vazia", async () => {
    const res = await listPessoaController.exec();

    expect(res).toEqual([]);
  });
});
