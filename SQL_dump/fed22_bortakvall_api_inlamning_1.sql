-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 07, 2023 at 09:17 AM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fed22_bortakvall_api_inlämning_1`
--

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_date` date DEFAULT NULL,
  `customer_first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_postcode` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_total` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `order_date`, `customer_first_name`, `customer_last_name`, `customer_address`, `customer_postcode`, `customer_city`, `customer_email`, `customer_phone`, `order_total`, `created_at`, `updated_at`) VALUES
(1, NULL, 'André', 'Lang', 'Nightmare on Elm Street, 666', '211 31', 'Malmö', 'hailsatan@satanas.com', NULL, 321, NULL, NULL),
(2, NULL, 'André', 'Lang', 'Nightmare on Elm Street, 666', '211 31', 'Malmö', 'hailsatan@satanas.com', NULL, 300, NULL, NULL),
(3, NULL, 'André', 'Lang', 'Good Grief, 777', '211 31', 'Malmö', 'andrenormanlang@gmail.com', '0769182403', 680, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `qty` int(10) UNSIGNED NOT NULL,
  `item_price` int(10) UNSIGNED NOT NULL,
  `item_total` int(10) UNSIGNED NOT NULL,
  `order_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orderitem`
--

INSERT INTO `orderitem` (`id`, `product_id`, `qty`, `item_price`, `item_total`, `order_id`) VALUES
(1, 1, 3, 7, 21, 1),
(2, 2, 10, 30, 300, 2),
(3, 2, 10, 30, 300, 1),
(5, 7, 10, 9, 90, 3),
(6, 4, 5, 8, 40, 3),
(7, 5, 4, 8, 32, 3),
(8, 8, 1, 8, 8, 3),
(9, 2, 17, 30, 510, 3);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(10) UNSIGNED NOT NULL,
  `on_sale` tinyint(1) DEFAULT '0',
  `images` json NOT NULL,
  `stock_status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stock_quantity` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `price`, `on_sale`, `images`, `stock_status`, `stock_quantity`) VALUES
(1, 'Nöt-Créme', '<p>Hasselnötskräm</p>\n<p>Innehållsförteckning: Socker, vegetabiliska oljor och fetter (shea och palm i varierande proportion), HASSELNÖTTER, JORDNÖTTER, kakao, naturlig vaniljarom, emulgator (solroslecitin).</p>\n<p><em>Alla priser är per skopa.</em></p>\n', 7, 0, '{\"large\": \"/storage/products/200549.png\", \"thumbnail\": \"/storage/products/thumbnails/200549-300x300.png\"}', 'instock', 3),
(2, 'M&M\'s Peanut', '<p>Mjölkchoklad (48%) doppade jordnötter(24%) med ett krispigt sockerskal</p>\n<p>Innehållsförteckning: Socker, JORDNÖTTER, kakaomassa, SKUMMJÖLKSPULVER, kakaosmör, palmfett, MJÖLKFETT, stärkelse, glukossirap, sheafett, LAKTOS, emulgeringsmedel (SOJALECITIN), stabiliseringsmedel (gummi arabicum), färgämnen (E100, E120, E133, E160a, E160e, E171), dextrin, ytbehandlingsmedel (karnaubavax), palmkärnolja, salt, aromämnen.</p>\n<p>Kan innehålla MANDEL och HASSELNÖT.</p>\n<p><em>Alla priser är per skopa.</em></p>\n', 30, 0, '{\"large\": \"/storage/products/218032.png\", \"thumbnail\": \"/storage/products/thumbnails/218032-300x300.png\"}', 'instock', 20),
(3, 'Gott & Blandat Giants', '<p>En mix av lakrits och gelé med fruktsmak</p>\n<p>Innehållsförteckning: Socker, glukossirap, glukos-fruktossirap, stärkelse, VETEMJÖL, melass, syra (citronsyra), fuktighetsbevarande medel (sorbitoler, glycerol), lakritsextrakt, salt, vegetabiliska oljor (kokos, palm), aromer, färgämnen (E153, E120, E100, E141), ytbehandlingsmedel (bivax), stabiliseringsmedel (E471).</p>\n<p><em>Alla priser är per skopa.</em></p>\n', 12, 0, '{\"large\": \"/storage/products/1997509.png\", \"thumbnail\": \"/storage/products/thumbnails/1997509-300x300.png\"}', 'instock', 5),
(4, 'Banana Bubs', '<p>Banan/gräddkola</p>\n<p>Innehållsförteckning: Glukos-fruktossirap, socker, majsstärkelse, vatten, surhetsreglerande medel (äppelsyra, natriumcitrat), potatisprotein, aromämnen, färgämnen: (E150d, E100), kokosolja, ytbehandlingsmedel (karnaubavax).</p>\n<p><em>Alla priser är per skopa.</em></p>\n', 8, 0, '{\"large\": \"/storage/products/156622.png\", \"thumbnail\": \"/storage/products/thumbnails/156622-300x300.png\"}', 'instock', 8),
(5, 'Banana Splits', '<p>Fyllig vitchoklad med smak av kola krispig banan.</p>\n<p>Innehållsförteckning: Socker, kakaosmör, torkad banan, HELMJÖLKSPULVER, mjölksocker(LAKTOS), SKUMMJÖLKSPULVER, emulgeringsmedel E322 (SOJALECITIN), naturliga aromer, ytbehandlingsmedel (E414, E904).</p>\n<p>Kan innehålla spår av MANDEL, NÖTTER och VETE.</p>\n<p><em>Alla priser är per skopa.</em></p>\n', 8, 0, '{\"large\": \"/storage/products/3827741.png\", \"thumbnail\": \"/storage/products/thumbnails/3827741-300x300.png\"}', 'instock', 6),
(7, 'Ananas', '<p>Ananas</p>\n<p>Innehållsförteckning: Glukosirap, socker, majsstärkelse, gelatin, syror: citronsyra, aromämnen, vegetabiliska oljor (kokosnöt, palmkärna), glansmedel: bivax, carnaubavax, färger: E100, E133.</p>\n<p><em>Alla priser är per skopa.</em></p>\n', 9, 0, '{\"large\": \"/storage/products/2147890-1.png\", \"thumbnail\": \"/storage/products/thumbnails/2147890-1-300x300.png\"}', 'instock', 10),
(8, 'Bubs Cool Cola Skalle', '<p>Sur cola</p>\n<p>Innehållsförteckning: Socker, glukos-fruktossirap, vatten, majsstärkelse, surhetsreglerande medel (äppelsyra, natriumcitrat), aromämnen, färgämnen (E150d).</p>\n<p><em>Alla priser är per skopa.</em></p>\n', 8, 0, '{\"large\": \"/storage/products/1595204.png\", \"thumbnail\": \"/storage/products/thumbnails/1595204-300x300.png\"}', 'instock', 4),
(9, 'Center', '<p>Mjölkchokladpralin med toffeefyllning</p>\n<p>Innehållsförteckning: Socker, glukossirap, kakaosmör, vegetabiliska fetter (palm, shea), HELMJÖLKSPULVER, kakaomassa, SKUMMJÖLKSPULVER, VASSLEPULVER (MJÖLK), salt, aromer (bl.a. vanillin), emulgeringsmedel (SOJALECITIN).</p>\n<p>Kan innehålla NÖTTER.</p>\n<p><em>Alla priser är per skopa.</em></p>\n', 8, 0, '{\"large\": \"/storage/products/200423.png\", \"thumbnail\": \"/storage/products/thumbnails/200423-300x300.png\"}', 'instock', 13),
(10, 'Chokladpopcorn', '<p>Innehållsförteckning: Socker, kakaosmör, kakaomassa, MJÖLKSOCKER (LAKTOS), HELMJÖLKSPULVER, majs, VASSLEPULVER (av MJÖLK), kokos- och raps fett, mjölkfett, sirap, emulgeringsmedel (E322), SOJALECITIN, kokosolja, ytbehandlingsmedel, E414 (gummi arabikum).</p>\n<p>Kan innehålla MANDEL, HASSELNÖT, CASHEWNÖT och VETE.</p>\n<p><em>Alla priser är per skopa.</em></p>\n', 10, 0, '{\"large\": \"/storage/products/3697328.png\", \"thumbnail\": \"/storage/products/thumbnails/3697328-300x300.png\"}', 'instock', 6);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('0987a5d8-f6e2-4d7b-8953-ae80cca3fb81', '40b319eb5915ae1453cbd75bb997efe6d6a18c35444a298a9d7c0cf8bce0c8eb', '2023-02-04 11:29:19.570', '20230204111902_migration_for_clever_cloud', NULL, NULL, '2023-02-07 09:14:17.485', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `OrderItem_order_id_fkey` (`order_id`),
  ADD KEY `OrderItem_product_id_fkey` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orderitem`
--
ALTER TABLE `orderitem`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `OrderItem_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `OrderItem_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
