-- CreateEnum
CREATE TYPE "StatusProdutoPrisma" AS ENUM ('ATIVO', 'DESATIVO');

-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "status_produto" "StatusProdutoPrisma" NOT NULL DEFAULT 'ATIVO';
