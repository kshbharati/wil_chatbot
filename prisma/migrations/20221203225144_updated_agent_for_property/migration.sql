-- DropForeignKey
ALTER TABLE `contact_info` DROP FOREIGN KEY `contact_info_userId_fkey`;

-- AlterTable
ALTER TABLE `contact_info` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `properties` ADD COLUMN `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `contact_info` ADD CONSTRAINT `contact_info_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
