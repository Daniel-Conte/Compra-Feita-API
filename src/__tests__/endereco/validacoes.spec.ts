import EnderecoRepositoryInMemory from "@repositories/EnderecoRepository/EnderecoRepositoryInMemory";
import PasswordProviderBCrypt from "@providers/password/PasswordProviderBCrypt";
import CreateEnderecoController from "@controllers/Endereco/CreateEnderecoController";
import ListEnderecoController from "@controllers/Endereco/ListEnderecoController";
import { CreateEnderecoDTO, UpdateEnderecoDTO } from "@modelTypes/endereco";
import UpdateEnderecoController from "@controllers/Endereco/UpdateEnderecoController";
import GetEnderecoController from "@controllers/Endereco/GetEnderecoController";
import DeleteEnderecoController from "@controllers/Endereco/DeleteEnderecoController";
import { CreatePessoaDTO } from "@modelTypes/pessoa";
import CreatePessoaController from "@controllers/Pessoa/CreatePessoaController";
import PessoaRepositoryInMemory from "@repositories/PessoaRepository/PessoaRepositoryInMemory";

const pessoaRepoInMemory = new PessoaRepositoryInMemory();
const enderecoRepoInMemory = new EnderecoRepositoryInMemory();
const passwordProviderBCrypt = new PasswordProviderBCrypt();

const createEnderecoController = new CreateEnderecoController(
  enderecoRepoInMemory
);
const createPessoaController = new CreatePessoaController(
  pessoaRepoInMemory,
  passwordProviderBCrypt
);
const listEnderecoController = new ListEnderecoController(enderecoRepoInMemory);
const updateEnderecoController = new UpdateEnderecoController(
  enderecoRepoInMemory
);
const getEnderecoController = new GetEnderecoController(enderecoRepoInMemory);
const deleteEnderecoController = new DeleteEnderecoController(
  enderecoRepoInMemory
);

describe("Endereço Validações", () => {
  it("Deve registrar um usuario", async () => {
    const pessoa: CreatePessoaDTO = {
      nome: "Teste1",
      email: "teste1@teste.com",
      senha: "123",
      telefone: "99912345678",
      admin: 0,
      pushToken: null,
    };

    const res = await createPessoaController.exec(pessoa);

    expect(res).toEqual("Usuário cadastrado com sucesso");
  });

  // CREATE
  it("Deve retornar erro de nome obrigatório", async () => {
    const endereco: CreateEnderecoDTO = {
      nome: "",
      bairro: "Bairro1",
      cep: "9999999",
      cidade: "Cidade1",
      complemento: "Complemento1",
      numero: "1234",
      rua: "Rua1",
      uf: "UF",
      codigoPessoa: 1,
    };

    try {
      await createEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Nome é obrigatório"));
    }
  });

  it("Deve retornar erro de bairro obrigatório", async () => {
    const endereco: CreateEnderecoDTO = {
      nome: "endereco1",
      bairro: "",
      cep: "9999999",
      cidade: "Cidade1",
      complemento: "Complemento1",
      numero: "1234",
      rua: "Rua1",
      uf: "UF",
      codigoPessoa: 1,
    };

    try {
      await createEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Bairro é obrigatório"));
    }
  });

  it("Deve retornar erro de CEP obrigatório", async () => {
    const endereco: CreateEnderecoDTO = {
      nome: "endereco1",
      bairro: "Bairro1",
      cep: "",
      cidade: "Cidade1",
      complemento: "Complemento1",
      numero: "1234",
      rua: "Rua1",
      uf: "UF",
      codigoPessoa: 1,
    };

    try {
      await createEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("CEP é obrigatório"));
    }
  });

  it("Deve retornar erro de cidade obrigatória", async () => {
    const endereco: CreateEnderecoDTO = {
      nome: "endereco1",
      bairro: "Bairro1",
      cep: "9999999",
      cidade: "",
      complemento: "Complemento1",
      numero: "1234",
      rua: "Rua1",
      uf: "UF",
      codigoPessoa: 1,
    };

    try {
      await createEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Cidade é obrigatória"));
    }
  });

  it("Deve retornar erro de usuário obrigatório", async () => {
    const endereco: CreateEnderecoDTO = {
      nome: "endereco1",
      bairro: "Bairro1",
      cep: "9999999",
      cidade: "Cidade1",
      complemento: "Complemento1",
      numero: "1234",
      rua: "Rua1",
      uf: "UF",
      codigoPessoa: 0,
    };

    try {
      await createEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Usuário é obrigatório"));
    }
  });

  it("Deve retornar erro de número obrigatório", async () => {
    const endereco: CreateEnderecoDTO = {
      nome: "endereco1",
      bairro: "Bairro1",
      cep: "9999999",
      cidade: "Cidade1",
      complemento: "Complemento1",
      numero: "",
      rua: "Rua1",
      uf: "UF",
      codigoPessoa: 1,
    };

    try {
      await createEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Número é obrigatório"));
    }
  });

  it("Deve retornar erro de rua obrigatória", async () => {
    const endereco: CreateEnderecoDTO = {
      nome: "endereco1",
      bairro: "Bairro1",
      cep: "9999999",
      cidade: "Cidade1",
      complemento: "Complemento1",
      numero: "1234",
      rua: "",
      uf: "UF",
      codigoPessoa: 1,
    };

    try {
      await createEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Rua é obrigatória"));
    }
  });

  it("Deve retornar erro de UF obrigatória", async () => {
    const endereco: CreateEnderecoDTO = {
      nome: "endereco1",
      bairro: "Bairro1",
      cep: "9999999",
      cidade: "Cidade1",
      complemento: "Complemento1",
      numero: "1234",
      rua: "Rua1",
      uf: "",
      codigoPessoa: 1,
    };

    try {
      await createEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("UF é obrigatória"));
    }
  });

  it("Deve retornar erro de endereço já adicionado", async () => {
    const endereco: CreateEnderecoDTO = {
      nome: "endereco1",
      bairro: "Bairro1",
      cep: "9999999",
      cidade: "Cidade1",
      complemento: "Complemento1",
      numero: "1234",
      rua: "Rua1",
      uf: "UF",
      codigoPessoa: 1,
    };

    try {
      await createEnderecoController.exec(endereco);
      await createEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Este endereço já foi adicionado"));
    }
  });

  // UPDATE

  it("Deve retornar endereço não encontrado", async () => {
    const endereco: UpdateEnderecoDTO = {
      codigo: 3,
      nome: "endereco1",
      bairro: "Bairro1",
      cep: "9999999",
      cidade: "Cidade1",
      complemento: "Complemento1",
      numero: "1234",
      rua: "Rua1",
      uf: "UF",
    };

    try {
      await updateEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Endereço não encontrado"));
    }
  });

  it("Deve retornar erro de código obrigatório", async () => {
    const endereco: UpdateEnderecoDTO = {
      codigo: 0,
      nome: "endereco1",
      bairro: "Bairro1",
      cep: "9999999",
      cidade: "Cidade1",
      complemento: "Complemento1",
      numero: "1234",
      rua: "Rua1",
      uf: "UF",
    };

    try {
      await updateEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Código é obrigatório"));
    }
  });

  it("Deve retornar erro de nome obrigatório", async () => {
    const endereco: UpdateEnderecoDTO = {
      codigo: 1,
      nome: "",
      bairro: "Bairro1",
      cep: "9999999",
      cidade: "Cidade1",
      complemento: "Complemento1",
      numero: "1234",
      rua: "Rua1",
      uf: "UF",
    };

    try {
      await updateEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Nome é obrigatório"));
    }
  });

  it("Deve retornar erro de bairro obrigatório", async () => {
    const endereco: UpdateEnderecoDTO = {
      codigo: 1,
      nome: "endereco1",
      bairro: "",
      cep: "9999999",
      cidade: "Cidade1",
      complemento: "Complemento1",
      numero: "1234",
      rua: "Rua1",
      uf: "UF",
    };

    try {
      await updateEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Bairro é obrigatório"));
    }
  });

  it("Deve retornar erro de CEP obrigatório", async () => {
    const endereco: UpdateEnderecoDTO = {
      codigo: 1,
      nome: "endereco1",
      bairro: "Bairro1",
      cep: "",
      cidade: "Cidade1",
      complemento: "Complemento1",
      numero: "1234",
      rua: "Rua1",
      uf: "UF",
    };

    try {
      await updateEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("CEP é obrigatório"));
    }
  });

  it("Deve retornar erro de cidade obrigatória", async () => {
    const endereco: UpdateEnderecoDTO = {
      codigo: 1,
      nome: "endereco1",
      bairro: "Bairro1",
      cep: "9999999",
      cidade: "",
      complemento: "Complemento1",
      numero: "1234",
      rua: "Rua1",
      uf: "UF",
    };

    try {
      await updateEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Cidade é obrigatória"));
    }
  });

  it("Deve retornar erro de número obrigatório", async () => {
    const endereco: UpdateEnderecoDTO = {
      codigo: 1,
      nome: "endereco1",
      bairro: "Bairro1",
      cep: "9999999",
      cidade: "Cidade1",
      complemento: "Complemento1",
      numero: "",
      rua: "Rua1",
      uf: "UF",
    };

    try {
      await updateEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Número é obrigatório"));
    }
  });

  it("Deve retornar erro de rua obrigatória", async () => {
    const endereco: UpdateEnderecoDTO = {
      codigo: 1,
      nome: "endereco1",
      bairro: "Bairro1",
      cep: "9999999",
      cidade: "Cidade1",
      complemento: "Complemento1",
      numero: "1234",
      rua: "",
      uf: "UF",
    };

    try {
      await updateEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Rua é obrigatória"));
    }
  });

  it("Deve retornar erro de UF obrigatória", async () => {
    const endereco: UpdateEnderecoDTO = {
      codigo: 1,
      nome: "endereco1",
      bairro: "Bairro1",
      cep: "9999999",
      cidade: "Cidade1",
      complemento: "Complemento1",
      numero: "1234",
      rua: "Rua1",
      uf: "",
    };

    try {
      await updateEnderecoController.exec(endereco);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("UF é obrigatória"));
    }
  });

  it("Deve retornar erro de código obrigatório", async () => {
    try {
      await getEnderecoController.exec(0);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Código é obrigatório"));
    }
  });

  it("Deve retornar erro de código inválido", async () => {
    try {
      const codigo: any = "0";
      await getEnderecoController.exec(codigo);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Código inválido"));
    }
  });

  it("Deve retornar erro de código obrigatório", async () => {
    const codigo: any = undefined;

    try {
      await deleteEnderecoController.exec(codigo);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Código é obrigatório"));
    }
  });

  it("Deve retornar erro de endereço não encontrado", async () => {
    try {
      await deleteEnderecoController.exec(3);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Endereço não encontrado"));
    }
  });

  it("Deve retornar erro de usuário obrigatório", async () => {
    const codigo: any = undefined;

    try {
      await listEnderecoController.exec(codigo);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Usuário é obrigatório"));
    }
  });
});
