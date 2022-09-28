import ProdutoRepositoryInMemory from "@repositories/ProdutoRepository/ProdutoRepositoryInMemory";
import CreateProdutoController from "@controllers/Produto/CreateProdutoController";
import UpdateProdutoController from "@controllers/Produto/UpdateProdutoController";
import GetProdutoController from "@controllers/Produto/GetProdutoController";
import DeleteProdutoController from "@controllers/Produto/DeleteProdutoController";
import { CreateProdutoDTO, UpdateProdutoDTO } from "@modelTypes/produto";

const produtoRepoInMemory = new ProdutoRepositoryInMemory();

const createProdutoController = new CreateProdutoController(
  produtoRepoInMemory
);
const updateProdutoController = new UpdateProdutoController(
  produtoRepoInMemory
);
const getProdutoController = new GetProdutoController(produtoRepoInMemory);
const deleteProdutoController = new DeleteProdutoController(
  produtoRepoInMemory
);

describe("Produto Validações", () => {
  // CREATE
  it("Deve retornar erro de nome obrigatório", async () => {
    const produto: CreateProdutoDTO = {
      nome: "",
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

    try {
      await createProdutoController.exec(produto);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Nome é obrigatório"));
    }
  });

  it("Deve retornar erro de categoria obrigatória", async () => {
    const produto: CreateProdutoDTO = {
      nome: "produto1",
      codigoCategoria: 0,
      descricao: "Descrição1",
      altura: null,
      comprimento: null,
      largura: null,
      marca: null,
      modelo: null,
      precoUnitario: 42.12,
      estoque: 3,
    };

    try {
      await createProdutoController.exec(produto);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Categoria é obrigatória"));
    }
  });

  it("Deve retornar erro de descrição obrigatória", async () => {
    const produto: CreateProdutoDTO = {
      nome: "produto1",
      codigoCategoria: 1,
      descricao: "",
      altura: null,
      comprimento: null,
      largura: null,
      marca: null,
      modelo: null,
      precoUnitario: 42.12,
      estoque: 0,
    };

    try {
      await createProdutoController.exec(produto);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Descrição é obrigatória"));
    }
  });

  it("Deve retornar erro de estoque obrigatório", async () => {
    const produto: any = {
      nome: "produto1",
      codigoCategoria: 1,
      descricao: "Descrição1",
      altura: null,
      comprimento: null,
      largura: null,
      marca: null,
      modelo: null,
      precoUnitario: 42.12,
      estoque: null,
    };

    try {
      await createProdutoController.exec(produto);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Estoque é obrigatório"));
    }
  });

  it("Deve retornar erro de preço obrigatório", async () => {
    const produto: CreateProdutoDTO = {
      nome: "produto1",
      codigoCategoria: 1,
      descricao: "Descrição1",
      altura: null,
      comprimento: null,
      largura: null,
      marca: null,
      modelo: null,
      precoUnitario: 0,
      estoque: 0,
    };

    try {
      await createProdutoController.exec(produto);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Preço é obrigatório"));
    }
  });

  it("Deve retornar erro de produto já adicionado", async () => {
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

    try {
      await createProdutoController.exec(produto);
      await createProdutoController.exec(produto);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Este produto já está cadastrado"));
    }
  });

  // UPDATE

  it("Deve retornar produto não encontrado", async () => {
    const produto: UpdateProdutoDTO = {
      codigo: 3,
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

    try {
      await updateProdutoController.exec(produto);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Produto não encontrado"));
    }
  });

  it("Deve retornar erro de código obrigatório", async () => {
    const produto: UpdateProdutoDTO = {
      codigo: 0,
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

    try {
      await updateProdutoController.exec(produto);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Código é obrigatório"));
    }
  });

  it("Deve retornar erro de nome obrigatório", async () => {
    const produto: UpdateProdutoDTO = {
      codigo: 1,
      nome: "",
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

    try {
      await updateProdutoController.exec(produto);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Nome é obrigatório"));
    }
  });

  it("Deve retornar erro de categoria obrigatória", async () => {
    const produto: UpdateProdutoDTO = {
      codigo: 1,
      nome: "produto1",
      codigoCategoria: 0,
      descricao: "Descrição1",
      altura: null,
      comprimento: null,
      largura: null,
      marca: null,
      modelo: null,
      precoUnitario: 42.12,
      estoque: 3,
    };

    try {
      await updateProdutoController.exec(produto);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Categoria é obrigatória"));
    }
  });

  it("Deve retornar erro de descrição obrigatória", async () => {
    const produto: UpdateProdutoDTO = {
      codigo: 1,
      nome: "produto1",
      codigoCategoria: 1,
      descricao: "",
      altura: null,
      comprimento: null,
      largura: null,
      marca: null,
      modelo: null,
      precoUnitario: 42.12,
      estoque: 0,
    };

    try {
      await updateProdutoController.exec(produto);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Descrição é obrigatória"));
    }
  });

  it("Deve retornar erro de estoque obrigatório", async () => {
    const produto: any = {
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
      estoque: null,
    };

    try {
      await updateProdutoController.exec(produto);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Estoque é obrigatório"));
    }
  });

  it("Deve retornar erro de preço obrigatório", async () => {
    const produto: UpdateProdutoDTO = {
      codigo: 1,
      nome: "produto1",
      codigoCategoria: 1,
      descricao: "Descrição1",
      altura: null,
      comprimento: null,
      largura: null,
      marca: null,
      modelo: null,
      precoUnitario: 0,
      estoque: 0,
    };

    try {
      await updateProdutoController.exec(produto);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Preço é obrigatório"));
    }
  });

  it("Deve retornar erro de código obrigatório", async () => {
    try {
      await getProdutoController.exec(0);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Código é obrigatório"));
    }
  });

  it("Deve retornar erro de código inválido", async () => {
    try {
      const codigo: any = "0";
      await getProdutoController.exec(codigo);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Código inválido"));
    }
  });

  it("Deve retornar erro de código obrigatório", async () => {
    const codigo: any = undefined;

    try {
      await deleteProdutoController.exec(codigo);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Código é obrigatório"));
    }
  });

  it("Deve retornar erro de produto não encontrado", async () => {
    try {
      await deleteProdutoController.exec(3);

      throw new Error("Falhou");
    } catch (error) {
      expect(error).toEqual(Error("Produto não encontrado"));
    }
  });
});
