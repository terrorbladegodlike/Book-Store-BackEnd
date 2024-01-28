/*
  Warnings:

  - Added the required column `language` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Author_id_key";

-- DropIndex
DROP INDEX "Book_currencyId_key";

-- DropIndex
DROP INDEX "Category_id_key";

-- DropIndex
DROP INDEX "Currency_id_key";

-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "Author" ADD CONSTRAINT "Author_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "language" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
