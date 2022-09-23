import EnderecoRepositoryInMemory from "@repositories/EnderecoRepository/EnderecoRepositoryInMemory";
import PasswordProviderBCrypt from "@providers/password/PasswordProviderBCrypt";
import CreateEnderecoController from "@controllers/Endereco/CreateEnderecoController";
import ListEnderecoController from "@controllers/Endereco/ListEnderecoController";
import {
  CreateEnderecoDTO,
  Endereco,
  UpdateEnderecoDTO,
} from "@modelTypes/endereco";
import UpdateEnderecoController from "@controllers/Endereco/UpdateEnderecoController";
import GetEnderecoController from "@controllers/Endereco/GetEnderecoController";
import DeleteEnderecoController from "@controllers/Endereco/DeleteEnderecoController";
import { CreatePessoaDTO } from "@modelTypes/pessoa";
import CreatePessoaController from "@controllers/Pessoa/CreatePessoaController";
import PessoaRepositoryInMemory from "@repositories/PessoaRepository/PessoaRepositoryInMemory";
import { toBeTypeOrNull } from "@utils/tests";

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

describe("Endereco Fluxo", () => {
  expect.extend({ toBeTypeOrNull });

  it("Deve registrar um usuario Teste1", async () => {
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

  it("Deve registrar um usuario Teste2", async () => {
    const pessoa: CreatePessoaDTO = {
      nome: "Teste2",
      email: "teste2@teste.com",
      senha: "456",
      telefone: "9995436734",
      admin: 0,
    };

    const res = await createPessoaController.exec(pessoa);

    expect(res).toEqual("Usuário cadastrado com sucesso");
  });

  it("Deve retornar listagem vazia para o usuario Teste1", async () => {
    const res = await listEnderecoController.exec(1);

    expect(res).toEqual([]);
  });

  it("Deve retornar listagem vazia para o usuario Teste2", async () => {
    const res = await listEnderecoController.exec(2);

    expect(res).toEqual([]);
  });

  it("Deve adicionar um endereço no usuário Teste1", async () => {
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

    const res = await createEnderecoController.exec(endereco);

    expect(res).toEqual("Endereço adicionado com sucesso");
  });

  it("Deve adicionar um endereço no usuário Teste2", async () => {
    const endereco: CreateEnderecoDTO = {
      nome: "endereco2",
      bairro: "Bairro2",
      cep: "9999999",
      cidade: "Cidade2",
      complemento: "Complemento2",
      numero: "5678",
      rua: "Rua2",
      uf: "UF",
      codigoPessoa: 2,
    };

    const res = await createEnderecoController.exec(endereco);

    expect(res).toEqual("Endereço adicionado com sucesso");
  });

  it("Deve retornar o endereço cadastrado no usuário Teste1", async () => {
    const res = await getEnderecoController.exec(1);

    expect(res).toEqual(
      expect.objectContaining({
        codigo: 1,
        nome: "endereco1",
        bairro: "Bairro1",
        cep: "9999999",
        cidade: "Cidade1",
        complemento: "Complemento1",
        numero: "1234",
        rua: "Rua1",
        uf: "UF",
        codigoPessoa: 1,
        criadoEm: expect.any(Date),
        atualizadoEm: expect.any(Date),
      })
    );
  });

  it("Deve retornar o endereço cadastrado no usuário Teste2", async () => {
    const res = await getEnderecoController.exec(2);

    expect(res).toEqual(
      expect.objectContaining({
        codigo: 2,
        nome: "endereco2",
        bairro: "Bairro2",
        cep: "9999999",
        cidade: "Cidade2",
        complemento: "Complemento2",
        numero: "5678",
        rua: "Rua2",
        uf: "UF",
        codigoPessoa: 2,
        criadoEm: expect.any(Date),
        atualizadoEm: expect.any(Date),
      })
    );
  });

  it("Deve retornar listagem com 1 endereço no usuário Teste1", async () => {
    const res = await listEnderecoController.exec(1);

    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          codigo: 1,
          nome: "endereco1",
          bairro: "Bairro1",
          cep: "9999999",
          cidade: "Cidade1",
          complemento: "Complemento1",
          numero: "1234",
          rua: "Rua1",
          uf: "UF",
          codigoPessoa: 1,
          criadoEm: expect.any(Date),
          atualizadoEm: expect.any(Date),
        }),
      ])
    );
    expect(res.length).toEqual(1);
  });

  it("Deve retornar listagem com 1 endereço no usuário Teste2", async () => {
    const res = await listEnderecoController.exec(2);

    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          codigo: 2,
          nome: "endereco2",
          bairro: "Bairro2",
          cep: "9999999",
          cidade: "Cidade2",
          complemento: "Complemento2",
          numero: "5678",
          rua: "Rua2",
          uf: "UF",
          codigoPessoa: 2,
          criadoEm: expect.any(Date),
          atualizadoEm: expect.any(Date),
        }),
      ])
    );
    expect(res.length).toEqual(1);
  });

  it("Deve registrar outro endereço para o usuário Teste2", async () => {
    const endereco: CreateEnderecoDTO = {
      nome: "endereco3",
      bairro: "Bairro3",
      cep: "9999999",
      cidade: "Cidade3",
      complemento: null,
      numero: "9012",
      rua: "Rua3",
      uf: "UF",
      codigoPessoa: 2,
    };

    const res = await createEnderecoController.exec(endereco);

    expect(res).toEqual("Endereço adicionado com sucesso");
  });

  it("Deve retornar listagem com 2 endereços para o usuário Teste2", async () => {
    const res = await listEnderecoController.exec(2);

    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining<Endereco>({
          codigo: expect.any(Number),
          nome: expect.any(String),
          bairro: expect.any(String),
          cep: expect.any(String),
          cidade: expect.any(String),
          complemento: expect.any(String),
          numero: expect.any(String),
          rua: expect.any(String),
          uf: expect.any(String),
          codigoPessoa: expect.any(Number),
          criadoEm: expect.any(Date),
          atualizadoEm: expect.any(Date),
        }),
      ])
    );
    expect(res.length).toEqual(2);
  });

  it("Deve retornar listagem com 1 endereço no usuário Teste1", async () => {
    const res = await listEnderecoController.exec(1);

    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          codigo: 1,
          nome: "endereco1",
          bairro: "Bairro1",
          cep: "9999999",
          cidade: "Cidade1",
          complemento: "Complemento1",
          numero: "1234",
          rua: "Rua1",
          uf: "UF",
          codigoPessoa: 1,
          criadoEm: expect.any(Date),
          atualizadoEm: expect.any(Date),
        }),
      ])
    );
    expect(res.length).toEqual(1);
  });

  it("Deve alterar o primeiro endereço do usuario Teste2", async () => {
    const endereco: UpdateEnderecoDTO = {
      codigo: 2,
      nome: "endereco2Alt",
      bairro: "Bairro2Alt",
      cep: "88888888",
      cidade: "Cidade2Alt",
      complemento: "Complemento2Alt",
      numero: "1234Alt",
      rua: "Rua2Alt",
      uf: "FU",
      codigoPessoa: 2,
    };

    const res = await updateEnderecoController.exec(endereco);

    expect(res).toEqual("Endereço alterado com sucesso");
  });

  it("Deve retornar o endereço alterado", async () => {
    const res = await getEnderecoController.exec(2);

    expect(res).toEqual(
      expect.objectContaining({
        codigo: 2,
        nome: "endereco2Alt",
        bairro: "Bairro2Alt",
        cep: "88888888",
        cidade: "Cidade2Alt",
        complemento: "Complemento2Alt",
        numero: "1234Alt",
        rua: "Rua2Alt",
        uf: "FU",
        codigoPessoa: 2,
        criadoEm: expect.any(Date),
        atualizadoEm: expect.any(Date),
      })
    );
  });

  it("Deve excluir o primeiro endereço do usuario Teste1", async () => {
    const res = await deleteEnderecoController.exec(1);

    expect(res).toEqual("Endereço excluído com sucesso");
  });

  it("Deve retornar listagem vazia para o usuario Teste1", async () => {
    const res = await listEnderecoController.exec(1);

    expect(res.length).toEqual(0);
  });

  it("Deve retornar listagem com 2 endereços para o usuário Teste2", async () => {
    const res = await listEnderecoController.exec(2);

    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining<Endereco>({
          codigo: expect.any(Number),
          nome: expect.any(String),
          bairro: expect.any(String),
          cep: expect.any(String),
          cidade: expect.any(String),
          complemento: (expect as any).toBeTypeOrNull(String),
          numero: expect.any(String),
          rua: expect.any(String),
          uf: expect.any(String),
          codigoPessoa: expect.any(Number),
          criadoEm: expect.any(Date),
          atualizadoEm: expect.any(Date),
        }),
      ])
    );
    expect(res.length).toEqual(2);
  });

  it("Deve excluir o primeiro endereço do usuario Teste2", async () => {
    const res = await deleteEnderecoController.exec(2);

    expect(res).toEqual("Endereço excluído com sucesso");
  });

  it("Deve excluir o último endereço do usuario Teste2", async () => {
    const res = await deleteEnderecoController.exec(3);

    expect(res).toEqual("Endereço excluído com sucesso");
  });

  it("Deve retornar listagem vazia para o usuario Teste2", async () => {
    const res = await listEnderecoController.exec(2);

    expect(res.length).toEqual(0);
  });
});
