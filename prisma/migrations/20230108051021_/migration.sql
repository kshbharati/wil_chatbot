/*
  Warnings:

  - You are about to alter the column `propertyType` on the `property_information` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `property_information` ADD COLUMN `propertyListingType` ENUM('LEASE', 'SELL') NOT NULL DEFAULT 'LEASE',
    MODIFY `propertyType` ENUM('HOME', 'APARTMENT') NOT NULL DEFAULT 'APARTMENT';
