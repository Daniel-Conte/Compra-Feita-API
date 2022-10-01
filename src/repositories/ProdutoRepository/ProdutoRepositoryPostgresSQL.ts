import prismaClient from "@database/prismaClient";
import {
  CreateProdutoDTO,
  Produto,
  UpdateProdutoDTO,
} from "@modelTypes/produto";
import IProdutoRepository from "./IProdutoRepository";

class ProdutoRepositoryPostgresSQL implements IProdutoRepository {
  async getAll(): Promise<Produto[]> {
    return prismaClient.produto.findMany();
  }

  async getById(codigo: number): Promise<Produto | null> {
    return prismaClient.produto.findFirst({ where: { codigo } });
  }

  async getByName(name: string): Promise<Produto | null> {
    return prismaClient.produto.findFirst({
      where: { nome: name },
    });
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
