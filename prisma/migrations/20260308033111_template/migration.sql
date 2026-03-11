-- CreateTable
CREATE TABLE `Template` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `Category` VARCHAR(191) NOT NULL,
    `Header` VARCHAR(191) NOT NULL,
    `Message` VARCHAR(191) NOT NULL,
    `Footer` VARCHAR(191) NOT NULL,
    `Buttons` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
