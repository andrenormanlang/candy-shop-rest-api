-- AlterTable
ALTER TABLE `order` ADD COLUMN `created_at` DATETIME(3) NULL,
    ADD COLUMN `order_date` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL,
    MODIFY `customer_postcode` VARCHAR(191) NOT NULL;
