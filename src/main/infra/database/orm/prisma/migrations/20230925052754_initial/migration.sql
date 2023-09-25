-- CreateTable
CREATE TABLE "categorias" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizaco" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "descricao" VARCHAR(200) NOT NULL,
    "valor" INTEGER NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizaco" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoriaToProduto" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriaToProduto_AB_unique" ON "_CategoriaToProduto"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriaToProduto_B_index" ON "_CategoriaToProduto"("B");

-- AddForeignKey
ALTER TABLE "_CategoriaToProduto" ADD CONSTRAINT "_CategoriaToProduto_A_fkey" FOREIGN KEY ("A") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriaToProduto" ADD CONSTRAINT "_CategoriaToProduto_B_fkey" FOREIGN KEY ("B") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
