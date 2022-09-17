import PessoaRepositoryInMemory from "@repositories/PessoaRepository/PessoaRepositoryInMemory";
import PasswordProviderBCrypt from "@providers/password/PasswordProviderBCrypt";
import { CreatePessoaDTO, UpdatePessoaDTO } from "@modelTypes/pessoa";
import CreatePessoaController from "@controllers/Pessoa/CreatePessoaController";
import UpdatePessoaController from "@controllers/Pessoa/UpdatePessoaController";
import GetPessoaController from "@controllers/Pessoa/GetPessoaController";
import DeletePessoaController from "@controllers/Pessoa/DeletePessoaController";

const pessoaRepoInMemory = new PessoaRepositoryInMemory();
const passwordProviderBCrypt = new PasswordProviderBCrypt();

const createPessoaController = new CreatePessoaController(
  pessoaRepoInMemory,
  passwordProviderBCrypt
);
const updatePessoaController = new UpdatePessoaController(pessoaRepoInMemory);
const getPessoaController = new GetPessoaController(pessoaRepoInMemory);
const deletePessoaController = new DeletePessoaController(pessoaRepoInMemory);

describe("Pessoa Validações", () => {
  // CREATE
  it("Deve retornar erro de email já registrado", async () => {
    const pessoa: CreatePessoaDTO = {
      nome: "Teste1",
      email: "teste1@teste.com",
      senha: "123",
      telefone: "99912345678",
      admin: 0,
    };

    try {
      await createPessoaController.exec(pessoa);
      await createPessoaController.exec(pessoa);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Este e-mail já foi usado"));
    }
  });

  it("Deve retornar erro de nome obrigatório", async () => {
    const pessoa: CreatePessoaDTO = {
      nome: "",
      email: "teste2@teste.com",
      senha: "123",
      telefone: "99912345678",
      admin: 0,
    };

    try {
      await createPessoaController.exec(pessoa);
    } catch (error) {
      expect(error).toEqual(Error("Nome é obrigatório"));
    }
  });

  it("Deve retornar erro de email obrigatório", async () => {
    const pessoa: CreatePessoaDTO = {
      nome: "Teste2",
      email: "",
      senha: "123",
      telefone: "99912345678",
      admin: 0,
    };

    try {
      await createPessoaController.exec(pessoa);
    } catch (error) {
      expect(error).toEqual(Error("E-mail é obrigatório"));
    }
  });

  it("Deve retornar erro de email inválido", async () => {
    const pessoa: CreatePessoaDTO = {
      nome: "Teste2",
      email: "teste2",
      senha: "123",
      telefone: "99912345678",
      admin: 0,
    };

    try {
      await createPessoaController.exec(pessoa);
    } catch (error) {
      expect(error).toEqual(Error("E-mail inválido"));
    }
  });

  it("Deve retornar erro de senha obrigatória", async () => {
    const pessoa: CreatePessoaDTO = {
      nome: "Teste2",
      email: "teste2@teste.com",
      senha: "",
      telefone: "99912345678",
      admin: 0,
    };

    try {
      await createPessoaController.exec(pessoa);
    } catch (error) {
      expect(error).toEqual(Error("Senha é obrigatória"));
    }
  });

  it("Deve retornar erro de telefone obrigatório", async () => {
    const pessoa: CreatePessoaDTO = {
      nome: "Teste2",
      email: "teste2@teste.com",
      senha: "123",
      telefone: "",
      admin: 0,
    };

    try {
      await createPessoaController.exec(pessoa);
    } catch (error) {
      expect(error).toEqual(Error("Telefone é obrigatório"));
    }
  });

  // UPDATE

  it("Deve retornar usuário não encontrado", async () => {
    const pessoa: UpdatePessoaDTO = {
      codigo: 3,
      nome: "Teste1",
      email: "teste1@teste.com",
      senha: "123",
      telefone: "99912345678",
      admin: 0,
    };

    try {
      await updatePessoaController.exec(pessoa);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Usuário não encontrado"));
    }
  });

  it("Deve retornar erro de nome obrigatório", async () => {
    const pessoa: UpdatePessoaDTO = {
      codigo: 1,
      nome: "",
      email: "teste2@teste.com",
      senha: "123",
      telefone: "99912345678",
      admin: 0,
    };

    try {
      await updatePessoaController.exec(pessoa);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Nome é obrigatório"));
    }
  });

  it("Deve retornar erro de email obrigatório", async () => {
    const pessoa: UpdatePessoaDTO = {
      codigo: 1,
      nome: "Teste2",
      email: "",
      senha: "123",
      telefone: "99912345678",
      admin: 0,
    };

    try {
      await updatePessoaController.exec(pessoa);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("E-mail é obrigatório"));
    }
  });

  it("Deve retornar erro de email inválido", async () => {
    const pessoa: UpdatePessoaDTO = {
      codigo: 1,
      nome: "Teste2",
      email: "teste2",
      senha: "123",
      telefone: "99912345678",
      admin: 0,
    };

    try {
      await updatePessoaController.exec(pessoa);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("E-mail inválido"));
    }
  });

  it("Deve retornar erro de senha obrigatória", async () => {
    const pessoa: UpdatePessoaDTO = {
      codigo: 1,
      nome: "Teste2",
      email: "teste2@teste.com",
      senha: "",
      telefone: "99912345678",
      admin: 0,
    };

    try {
      await updatePessoaController.exec(pessoa);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Senha é obrigatória"));
    }
  });

  it("Deve retornar erro de telefone obrigatório", async () => {
    const pessoa: UpdatePessoaDTO = {
      codigo: 1,
      nome: "Teste2",
      email: "teste2@teste.com",
      senha: "123",
      telefone: "",
      admin: 0,
    };

    try {
      await updatePessoaController.exec(pessoa);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Telefone é obrigatório"));
    }
  });

  it("Deve retornar erro de código obrigatório", async () => {
    try {
      await getPessoaController.exec(0);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Código é obrigatório"));
    }
  });

  it("Deve retornar erro de código obrigatório", async () => {
    try {
      const codigo: any = "0";
      await getPessoaController.exec(codigo);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Código inválido"));
    }
  });

  it("Deve retornar erro de código obrigatório", async () => {
    const codigo: any = undefined;

    try {
      await deletePessoaController.exec(codigo);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Código é obrigatório"));
    }
  });

  it("Deve retornar erro de usuário não encontrado", async () => {
    try {
      await deletePessoaController.exec(3);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Usuário não encontrado"));
    }
  });
});
