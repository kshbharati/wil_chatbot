-- CreateTable
CREATE TABLE `property_images` (
    `id` VARCHAR(191) NOT NULL,
    `imageLink` LONGTEXT NULL,
    `imageDescription` LONGTEXT NULL,
    `imageType` ENUM('FEATURED', 'ADDITIONAL') NOT NULL DEFAULT 'ADDITIONAL',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `propertyId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `property_images` ADD CONSTRAINT `property_images_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
