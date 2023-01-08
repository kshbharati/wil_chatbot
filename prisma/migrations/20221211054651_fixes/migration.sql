-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `addresses_propertyId_fkey`;

-- DropForeignKey
ALTER TABLE `property_information` DROP FOREIGN KEY `property_information_propertyId_fkey`;

-- AlterTable
ALTER TABLE `addresses` MODIFY `propertyId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `property_information` MODIFY `propertyId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `property_information` ADD CONSTRAINT `property_information_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
