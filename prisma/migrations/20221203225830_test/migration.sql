/*
  Warnings:

  - You are about to drop the `PropertyInformation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PropertyInformation` DROP FOREIGN KEY `PropertyInformation_propertyId_fkey`;

-- DropTable
DROP TABLE `PropertyInformation`;

-- CreateTable
CREATE TABLE `property_information` (
    `id` VARCHAR(191) NOT NULL,
    `propertyDescription` LONGTEXT NULL,
    `propertyType` ENUM('LEASE', 'SELL') NOT NULL DEFAULT 'LEASE',
    `floorSize` INTEGER NULL,
    `quantityOfBedrooms` INTEGER NOT NULL DEFAULT 1,
    `quantityOfBathrooms` INTEGER NOT NULL DEFAULT 1,
    `quantityOfParking` INTEGER NOT NULL DEFAULT 0,
    `extras` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `propertyId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `property_information_propertyId_key`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `property_information` ADD CONSTRAINT `property_information_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
