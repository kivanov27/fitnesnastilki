/*
  Warnings:

  - Added the required column `customer_city` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "customer_city" VARCHAR(255) NOT NULL,
ADD COLUMN     "notes" TEXT;
