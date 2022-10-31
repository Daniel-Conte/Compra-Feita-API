import prismaClient from "@database/prismaClient";
import type {
  CreateProdutoDTO,
  Produto,
  ProdutoListItem,
  UpdateProdutoDTO,
} from "@modelTypes/produto";
import IProdutoRepository from "./IProdutoRepository";

class ProdutoRepositoryPostgresSQL implements IProdutoRepository {
  async getAll(): Promise<ProdutoListItem[]> {
    const produtos = await prismaClient.produto.findMany({
      select: {
        codigo: true,
        precoUnitario: true,
        nome: true,
        imagens: { select: { imagem: true }, take: 1 },
      },
    });

    return produtos.map(({ imagens, ...produto }) => ({
      ...produto,
      imagem: imagens?.[0]?.imagem,
    }));
  }

  async getById(codigo: number): Promise<Produto | null> {
    const produto = await prismaClient.produto.findUnique({
      select: {
        codigo: true,
        nome: true,
        descricao: true,
        precoUnitario: true,
        estoque: true,
        categoria: {
          select: {
            codigo: true,
            codigoCategoriaPai: true,
            nome: true,
            descricao: true,
          },
        },
        imagens: { select: { imagem: true } },
        altura: true,
        comprimento: true,
        largura: true,
        marca: true,
        modelo: true,
        criadoEm: true,
        atualizadoEm: true,
      },
      where: { codigo },
    });

    if (produto) {
      produto.imagens = produto.imagens.map((img) => img.imagem) as any;
    }

    return produto as Produto | null;
  }

  async getByName(name: string): Promise<Produto | null> {
    const produto = await prismaClient.produto.findFirst({
      select: {
        codigo: true,
        nome: true,
        descricao: true,
        precoUnitario: true,
        estoque: true,
        categoria: {
          select: {
            codigo: true,
            codigoCategoriaPai: true,
            nome: true,
            descricao: true,
          },
        },
        imagens: { select: { imagem: true } },
        altura: true,
        comprimento: true,
        largura: true,
        marca: true,
        modelo: true,
        criadoEm: true,
        atualizadoEm: true,
      },
      where: { nome: name },
    });

    if (produto) {
      produto.imagens = produto.imagens.map((img) => img.imagem) as any;
    }

    return produto as Produto | null;
  }

  async insert(produto: CreateProdutoDTO): Promise<void> {
    const { codigoCategoria, imagens, ...newProduto } = produto;

    await prismaClient.produto.create({
      data: {
        ...newProduto,
        categoria: { connect: { codigo: codigoCategoria } },
        imagens: { createMany: { data: imagens || [] } },
      },
    });
  }

  async update(produto: UpdateProdutoDTO): Promise<void> {
    const { codigo, imagens, ...newProduto } = produto;
    let deleteImagens: { codigo: number }[] = [];
    let createImagens: { imagem: string }[] = [];
    let updateImagens: {
      data: { imagem: string };
      where: { codigo: number };
    }[] = [];

    const imagensSalvas = await prismaClient.imagemProduto.findMany({
      where: { codigoProduto: codigo },
    });

    if (!produto.imagens?.length && imagensSalvas.length) {
      deleteImagens = imagensSalvas;
    } else if (produto.imagens?.length && !imagensSalvas.length) {
      createImagens = produto.imagens;
    } else if (produto.imagens?.length && imagensSalvas.length) {
      createImagens = produto.imagens.filter((img) => !img.codigo);
      updateImagens = produto.imagens
        .filter((img) => {
          const codigoImagensSalvas = imagensSalvas.map(
            (saved) => saved.codigo
          );

          return !!(img.codigo && codigoImagensSalvas.includes(img.codigo));
        })
        .map((img) => ({
          data: { imagem: img.imagem },
          where: { codigo: Number(img.codigo) },
        }));
      deleteImagens = imagensSalvas.filter((img) => {
        const codigoImagens = produto.imagens?.map((pImg) => pImg.codigo) || [];

        return !codigoImagens.includes(img.codigo);
      });
    }

    await prismaClient.produto.update({
      data: {
        ...newProduto,
        imagens: {
          deleteMany: deleteImagens,
          createMany: { data: createImagens },
          updateMany: updateImagens,
        },
      },
      where: { codigo },
    });
  }

  async delete(codigo: number): Promise<void> {
    await prismaClient.produto.delete({ where: { codigo } });
  }
}

export default ProdutoRepositoryPostgresSQL;
