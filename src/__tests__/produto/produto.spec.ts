import ProdutoRepositoryInMemory from "@repositories/ProdutoRepository/ProdutoRepositoryInMemory";
import CreateProdutoController from "@controllers/Produto/CreateProdutoController";
import ListProdutoController from "@controllers/Produto/ListProdutoController";
import UpdateProdutoController from "@controllers/Produto/UpdateProdutoController";
import GetProdutoController from "@controllers/Produto/GetProdutoController";
import DeleteProdutoController from "@controllers/Produto/DeleteProdutoController";
import {
  CreateProdutoDTO,
  Produto,
  UpdateProdutoDTO,
} from "@modelTypes/produto";
import { toBeTypeOrNull } from "@utils/tests";

const produtoRepoInMemory = new ProdutoRepositoryInMemory();

const createProdutoController = new CreateProdutoController(
  produtoRepoInMemory
);
const listProdutoController = new ListProdutoController(produtoRepoInMemory);
const updateProdutoController = new UpdateProdutoController(
  produtoRepoInMemory
);
const getProdutoController = new GetProdutoController(produtoRepoInMemory);
const deleteProdutoController = new DeleteProdutoController(
  produtoRepoInMemory
);

describe("Produto Fluxo", () => {
  expect.extend({ toBeTypeOrNull });

  it("Deve retornar listagem vazia", async () => {
    const res = await listProdutoController.exec();

    expect(res).toEqual([]);
  });

  it("Deve adicionar um produto", async () => {
    const produto: CreateProdutoDTO = {
      nome: "produto1",
      codigoCategoria: 1,
      descricao: "Descrição1",
      altura: null,
      comprimento: null,
      largura: null,
      marca: null,
      modelo: null,
      precoUnitario: 42.12,
      estoque: 3,
    };

    const res = await createProdutoController.exec(produto);

    expect(res).toEqual("Produto cadastrado com sucesso");
  });

  it("Deve retornar o produto cadastrado", async () => {
    const res = await getProdutoController.exec(1);

    expect(res).toEqual(
      expect.objectContaining({
        codigo: 1,
        nome: "produto1",
        codigoCategoria: 1,
        descricao: "Descrição1",
        altura: null,
        comprimento: null,
        largura: null,
        marca: null,
        modelo: null,
        precoUnitario: 42.12,
        estoque: 3,
        criadoEm: expect.any(Date),
        atualizadoEm: expect.any(Date),
      })
    );
  });

  it("Deve retornar listagem com 1 produto", async () => {
    const res = await listProdutoController.exec();

    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          codigo: 1,
          nome: "produto1",
          codigoCategoria: 1,
          descricao: "Descrição1",
          altura: null,
          comprimento: null,
          largura: null,
          marca: null,
          modelo: null,
          precoUnitario: 42.12,
          estoque: 3,
          criadoEm: expect.any(Date),
          atualizadoEm: expect.any(Date),
        }),
      ])
    );
    expect(res.length).toEqual(1);
  });

  it("Deve registrar outro produto", async () => {
    const produto: CreateProdutoDTO = {
      nome: "produto2",
      codigoCategoria: 2,
      descricao: "Descrição2",
      altura: 11,
      comprimento: 22,
      largura: 33,
      marca: "Marca2",
      modelo: "Modelo2",
      precoUnitario: 44.44,
      estoque: 4,
    };

    const res = await createProdutoController.exec(produto);

    expect(res).toEqual("Produto cadastrado com sucesso");
  });

  it("Deve retornar listagem com 2 produtos", async () => {
    const res = await listProdutoController.exec();

    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining<Produto>({
          codigo: expect.any(Number),
          nome: expect.any(String),
          altura: (expect as any).toBeTypeOrNull(Number),
          codigoCategoria: expect.any(Number),
          comprimento: (expect as any).toBeTypeOrNull(Number),
          descricao: expect.any(String),
          estoque: expect.any(Number),
          largura: (expect as any).toBeTypeOrNull(Number),
          marca: (expect as any).toBeTypeOrNull(String),
          modelo: (expect as any).toBeTypeOrNull(String),
          precoUnitario: expect.any(Number),
          criadoEm: expect.any(Date),
          atualizadoEm: expect.any(Date),
        }),
      ])
    );
    expect(res.length).toEqual(2);
  });

  it("Deve alterar o primeiro produto", async () => {
    const produto: UpdateProdutoDTO = {
      codigo: 1,
      nome: "produto1Alt",
      codigoCategoria: 2,
      descricao: "Descrição1Alt",
      altura: 10,
      comprimento: 11,
      largura: 12,
      marca: "Marca1Alt",
      modelo: "Modelo1Alt",
      precoUnitario: 14.14,
      estoque: 10,
    };

    const res = await updateProdutoController.exec(produto);

    expect(res).toEqual("Produto alterado com sucesso");
  });

  it("Deve retornar o produto alterado", async () => {
    const res = await getProdutoController.exec(1);

    expect(res).toEqual(
      expect.objectContaining({
        codigo: 1,
        nome: "produto1Alt",
        codigoCategoria: 2,
        descricao: "Descrição1Alt",
        altura: 10,
        comprimento: 11,
        largura: 12,
        marca: "Marca1Alt",
        modelo: "Modelo1Alt",
        precoUnitario: 14.14,
        estoque: 10,
        criadoEm: expect.any(Date),
        atualizadoEm: expect.any(Date),
      })
    );
  });

  it("Deve excluir o primeiro produto", async () => {
    const res = await deleteProdutoController.exec(1);

    expect(res).toEqual("Produto excluído com sucesso");
  });

  it("Deve retornar listagem com 1 produto", async () => {
    const res = await listProdutoController.exec();

    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining<Produto>({
          codigo: expect.any(Number),
          nome: "produto2",
          codigoCategoria: 2,
          descricao: "Descrição2",
          altura: 11,
          comprimento: 22,
          largura: 33,
          marca: "Marca2",
          modelo: "Modelo2",
          precoUnitario: 44.44,
          estoque: 4,
          criadoEm: expect.any(Date),
          atualizadoEm: expect.any(Date),
        }),
      ])
    );
    expect(res.length).toEqual(1);
  });

  it("Deve excluir o último produto", async () => {
    const res = await deleteProdutoController.exec(2);

    expect(res).toEqual("Produto excluído com sucesso");
  });

  it("Deve retornar listagem vazia", async () => {
    const res = await listProdutoController.exec();

    expect(res.length).toEqual(0);
  });
});
