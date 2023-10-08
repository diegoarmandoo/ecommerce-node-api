/*
  Warnings:

  - You are about to drop the column `data_atualizaco` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `data_atualizacao` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "data_atualizaco",
ADD COLUMN     "data_atualizacao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "data_exclusao" TIMESTAMP(3);
