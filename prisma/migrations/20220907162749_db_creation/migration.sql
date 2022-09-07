-- CreateTable
CREATE TABLE "Pessoa" (
    "codigo" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" VARCHAR(14) NOT NULL,
    "admin" INTEGER NOT NULL DEFAULT 0,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "codigo" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "cidade" VARCHAR(50) NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "bairro" VARCHAR(50) NOT NULL,
    "rua" VARCHAR(50) NOT NULL,
    "numero" VARCHAR(8) NOT NULL,
    "complemento" VARCHAR(50),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "codigoPessoa" INTEGER NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "codigo" SERIAL NOT NULL,
    "metodoPagamento" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 0,
    "justificativaCancelamento" VARCHAR(200),
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "pessoaCodigo" INTEGER NOT NULL,
    "enderecoCodigo" INTEGER NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "ItensPedido" (
    "codigo" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "codigoProduto" INTEGER NOT NULL,
    "codigoPessoa" INTEGER NOT NULL,
    "codigoPedido" INTEGER,

    CONSTRAINT "ItensPedido_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Produto" (
    "codigo" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "descricao" TEXT NOT NULL,
    "precoUnitario" DOUBLE PRECISION NOT NULL,
    "estoque" INTEGER NOT NULL,
    "altura" DOUBLE PRECISION,
    "comprimento" DOUBLE PRECISION,
    "largura" DOUBLE PRECISION,
    "marca" VARCHAR(50),
    "modelo" VARCHAR(50),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "codigoCategoria" INTEGER NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "codigo" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "descricao" VARCHAR(200),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "codigoCategoriaPai" INTEGER,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "ImagemProduto" (
    "codigo" SERIAL NOT NULL,
    "imagem" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "codigoProduto" INTEGER NOT NULL,

    CONSTRAINT "ImagemProduto_pkey" PRIMARY KEY ("codigo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_email_key" ON "Pessoa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Produto_nome_key" ON "Produto"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_codigoPessoa_fkey" FOREIGN KEY ("codigoPessoa") REFERENCES "Pessoa"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_pessoaCodigo_fkey" FOREIGN KEY ("pessoaCodigo") REFERENCES "Pessoa"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_enderecoCodigo_fkey" FOREIGN KEY ("enderecoCodigo") REFERENCES "Endereco"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensPedido" ADD CONSTRAINT "ItensPedido_codigoProduto_fkey" FOREIGN KEY ("codigoProduto") REFERENCES "Produto"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensPedido" ADD CONSTRAINT "ItensPedido_codigoPessoa_fkey" FOREIGN KEY ("codigoPessoa") REFERENCES "Pessoa"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensPedido" ADD CONSTRAINT "ItensPedido_codigoPedido_fkey" FOREIGN KEY ("codigoPedido") REFERENCES "Pedido"("codigo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_codigoCategoria_fkey" FOREIGN KEY ("codigoCategoria") REFERENCES "Categoria"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_codigoCategoriaPai_fkey" FOREIGN KEY ("codigoCategoriaPai") REFERENCES "Categoria"("codigo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagemProduto" ADD CONSTRAINT "ImagemProduto_codigoProduto_fkey" FOREIGN KEY ("codigoProduto") REFERENCES "Produto"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
