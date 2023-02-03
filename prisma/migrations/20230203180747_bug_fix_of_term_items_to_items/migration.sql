/*
  Warnings:

  - You are about to alter the column `customer_postcode` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(6)`.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `customer_postcode` VARCHAR(6) NOT NULL;
