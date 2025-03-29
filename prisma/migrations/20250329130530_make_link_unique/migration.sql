/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_link_key" ON "product"("link");
