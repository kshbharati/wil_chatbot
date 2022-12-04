/*
  Warnings:

  - You are about to drop the column `addressline1` on the `addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `addressline1`,
    ADD COLUMN `addressLine1` LONGTEXT NULL;
