/*
  Warnings:

  - Added the required column `nomeProduto` to the `ItensPedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precoUnitario` to the `ItensPedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItensPedido" ADD COLUMN     "nomeProduto" VARCHAR(50) NOT NULL,
ADD COLUMN     "precoUnitario" DOUBLE PRECISION NOT NULL;
