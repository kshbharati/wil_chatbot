-- DropForeignKey
ALTER TABLE `enquiry` DROP FOREIGN KEY `enquiry_userId_fkey`;

-- DropForeignKey
ALTER TABLE `property_images` DROP FOREIGN KEY `property_images_propertyId_fkey`;

-- AlterTable
ALTER TABLE `addresses` ADD COLUMN `state` ENUM('ACT', 'NSW', 'WA', 'SA', 'NT', 'VIC', 'QLD', 'TAS') NOT NULL DEFAULT 'ACT',
    MODIFY `suburb` VARCHAR(255) NOT NULL DEFAULT 'Canberra',
    MODIFY `postCode` VARCHAR(10) NOT NULL DEFAULT '2600';

-- AlterTable
ALTER TABLE `enquiry` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `property_images` MODIFY `propertyId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `enquiry` ADD CONSTRAINT `enquiry_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property_images` ADD CONSTRAINT `property_images_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
