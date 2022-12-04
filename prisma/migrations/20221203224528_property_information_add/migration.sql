-- CreateTable
CREATE TABLE `PropertyInformation` (
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

    UNIQUE INDEX `PropertyInformation_propertyId_key`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PropertyInformation` ADD CONSTRAINT `PropertyInformation_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
