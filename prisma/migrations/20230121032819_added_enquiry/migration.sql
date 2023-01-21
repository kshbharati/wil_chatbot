-- AlterTable
ALTER TABLE `contact_info` MODIFY `website` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `chatbot_enquiry` (
    `id` VARCHAR(191) NOT NULL,
    `name` TEXT NOT NULL,
    `email` TEXT NOT NULL,
    `phoneNumber` TEXT NOT NULL,
    `enquiryDescription` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
