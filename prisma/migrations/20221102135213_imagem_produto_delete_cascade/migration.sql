-- DropForeignKey
ALTER TABLE "ImagemProduto" DROP CONSTRAINT "ImagemProduto_codigoProduto_fkey";

-- AddForeignKey
ALTER TABLE "ImagemProduto" ADD CONSTRAINT "ImagemProduto_codigoProduto_fkey" FOREIGN KEY ("codigoProduto") REFERENCES "Produto"("codigo") ON DELETE CASCADE ON UPDATE CASCADE;
