-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2024 at 07:46 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `astoriya_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `message`, `created_at`) VALUES
(1, 'Oksana Wilson', 'trademeoks@outlook.com', 'test', '2024-09-26 08:49:38');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Oksana', 'okswilson@outlook.com', '$2a$10$EVJT70RbrlxhgKpjib7Zd./ffzIMGQKmkgsmylp5JIFSRk2mnNOhO', '2024-09-27 10:34:28'),
(2, 'Admin', 'admin@outlook.com', '$2a$10$2E5gsCnnUgPa2Aump1bA8Ooq3gWcrEhJJQo1AUhWiGlI5B7yKuua.', '2024-09-28 09:36:22'),
(3, 'Lera', 'lera@outlook.com', '$2a$10$yqi8NwbqPDv28VNWpZj6Muk61MM.9HSoQHc7/B3nKTwYGzEHTPGtW', '2024-09-28 09:49:14'),
(4, 'Alan', 'alan@outlook.com', '$2a$10$jwjQ5xFuLVka1l7p8jEuFuZvO/QKsmbF28FyLwvy00QndcSISis2S', '2024-09-28 10:00:02'),
(5, 'Sophia', 'sophia@outlook.com', '$2a$10$WxaCnFmo6fUmQ9mj47wElO4/Kl4KoqYeHJfi5uf.hkgD/5JVi.TRu', '2024-09-28 19:09:00'),
(6, 'Oksana', 'oksana@outlook.com', '$2a$10$FxC/.aQZhz2uaZeYBqcTLu9qpXYsoMy40L/R.HCoh9d6qoG3iqwJe', '2024-09-28 19:16:41'),
(7, 'Sana', 'sana', '$2a$10$YyTD3bzTN4q4UcUurJw/DOVMLIn/pAEyT9USA9Eqgjn5diHaa7qnm', '2024-09-29 02:19:56'),
(8, 'Anna', 'anna@jmail.com', '$2a$10$6yAUuWrPtMIu1SHS941LIOkgXH.HGfY3YMQPz1JQa2s4xcDu7YI/O', '2024-10-02 19:26:29'),
(9, 'Marina', 'marina@outlook.com', '$2a$10$7ZsysX0r0FgF9suWZN66YOYVIHIOauPcj8FI.tKbMeowYSkMgVocu', '2024-10-14 08:19:56'),
(10, 'dmitry', 'dmitry@outlook.com', '$2a$10$METqR5TF9Joy//iEytxo1.mnTWfe5BHrSWtJBRxTEvezXkUh3QYsm', '2024-10-14 08:31:14');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `available` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menu_items`
--

CREATE TABLE `menu_items` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(50) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_items`
--

INSERT INTO `menu_items` (`id`, `name`, `price`, `description`, `category`, `image`) VALUES
(17, 'Stake', 22.00, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dumm', 'Main Course', '/uploads/1727743274708.jpg'),
(20, 'Soup ', 34.00, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dumm', 'Main Course', '/uploads/1727743309774.jpg'),
(21, 'Calmary', 56.00, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dumm', 'Main Course', '/uploads/1727743353671.jpg'),
(23, 'Salat', 24.00, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dumm', 'Appetizer', '/uploads/1727743457520.jpg'),
(25, 'Test One', 45.00, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dumm', 'Appetizer', '/uploads/1727743865567.jpg'),
(27, 'Test Two', 56.00, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dumm', 'Appetizer', '/uploads/1727743892877.jpg'),
(30, 'Test for log in', 55.00, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley.', 'Appetizer', '/uploads/1728072942108.jpg'),
(32, 'Test for present', 0.08, 'ttgggssgsgsgsgsg', 'Appetizer', '/uploads/1728960169668.jpg'),
(33, 'Test for present', 0.08, 'ttgggssgsgsgsgsg', 'Appetizer', '/uploads/1728960169681.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `orderId` varchar(255) NOT NULL,
  `customerName` varchar(255) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `paymentMethod` enum('cash','credit_card','paypal') NOT NULL,
  `shippingDetails` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`shippingDetails`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `orderId`, `customerName`, `total`, `paymentMethod`, `shippingDetails`, `created_at`) VALUES
(1, 'wf4k844y8', 'Alan R wilson', 8.99, 'cash', '{\"name\":\"Alan R wilson\",\"address\":\"10 Bader Street\",\"city\":\"Bader Hamilton\",\"zipCode\":\"3206\",\"paymentMethod\":\"cash\"}', '2024-10-05 21:34:25'),
(2, 'zodtp01a7', 'Sana Wilson', 8.99, 'cash', '{\"name\":\"Sana Wilson\",\"address\":\"17 Trag Place\",\"city\":\"Bader Hamilton\",\"zipCode\":\"3206\",\"paymentMethod\":\"cash\"}', '2024-10-05 21:48:14'),
(3, 'koyp8w9m1', 'Oksana Wilson', 19.98, '', '{\"name\":\"Oksana Wilson\",\"address\":\"10 Bader Street\",\"city\":\"Bader Hamilton\",\"zipCode\":\"3206\",\"paymentMethod\":\"card\"}', '2024-10-07 06:34:25'),
(4, '8awzesyux', 'sophia wilson', 18.99, '', '{\"name\":\"sophia wilson\",\"address\":\"105 Bader Street\",\"city\":\"Bader Hamilton\",\"zipCode\":\"3206\",\"paymentMethod\":\"card\"}', '2024-10-08 03:54:17'),
(5, '2d5907e35', 'Alax', 8.99, '', '{\"name\":\"Alax\",\"address\":\"12 Andru Street\",\"city\":\"Auckland\",\"zipCode\":\"5634\",\"paymentMethod\":\"card\"}', '2024-10-14 03:21:50'),
(6, 'ljw1si4dc', 'Samuel', 32.99, '', '{\"name\":\"Samuel\",\"address\":\"12 Ordertest Street\",\"city\":\"Hamilton\",\"zipCode\":\"5678\",\"paymentMethod\":\"card\"}', '2024-10-14 08:12:30'),
(7, '0vbb0ff54', 'Marina', 77.98, '', '{\"name\":\"Marina\",\"address\":\"12 Marinatest street\",\"city\":\"Hamilton\",\"zipCode\":\"9876\",\"paymentMethod\":\"card\"}', '2024-10-14 08:21:17'),
(8, 'g7lthlqz7', 'Dmitry', 157.97, '', '{\"name\":\"Dmitry\",\"address\":\"Test Street\",\"city\":\"Test\",\"zipCode\":\"5467\",\"paymentMethod\":\"card\"}', '2024-10-14 08:32:14');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `reservation_date` date NOT NULL,
  `reservation_time` time NOT NULL,
  `guests` int(11) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `name`, `email`, `reservation_date`, `reservation_time`, `guests`, `phone`, `created_at`) VALUES
(1, 'John Doe', 'johndoe@example.com', '2024-09-25', '18:30:00', 4, '123-456-7890', '2024-09-25 22:29:21'),
(2, 'Oksana Wilson', 'trademeoks@outlook.com', '2024-09-24', '19:00:00', 6, '0274594997', '2024-09-26 02:00:12'),
(3, 'Oksana Wilson', 'trademeoks@outlook.com', '2024-09-24', '19:00:00', 6, '0274594997', '2024-09-26 02:00:14'),
(4, 'Oksana Wilson', 'trademeoks@outlook.com', '2024-09-28', '14:29:00', 6, '0274594997', '2024-09-26 02:23:40'),
(5, 'Julia Pop', 'julia@outlook.com', '2024-09-27', '19:38:00', 2, '6543221', '2024-09-26 02:38:33'),
(6, 'Alla Pugacheva', 'pugacheva@outlook.com', '2024-09-27', '20:46:00', 5, '8765432', '2024-09-26 02:40:30'),
(7, 'Elena Nogina', 'nogina@outlook.com', '2024-09-27', '20:43:00', 2, '98724167', '2024-09-26 02:43:17'),
(8, 'Anna-Mariya', 'anna@outlook.com', '2024-09-28', '19:17:00', 7, '7898654', '2024-09-27 01:17:25'),
(9, 'Robert', 'robert@outlook.com', '2024-10-31', '18:24:00', 2, '34567', '2024-10-14 03:22:53'),
(10, 'Samuel', 'samuel@outlook.com', '2024-10-29', '15:17:00', 6, '34567', '2024-10-14 08:11:12'),
(11, 'Marina', 'marina@outlook.com', '2024-10-15', '15:22:00', 5, '678990', '2024-10-14 08:18:52'),
(12, 'Dmitry', 'dmitriy@outlook.com', '2024-10-28', '00:33:00', 2, '98765443', '2024-10-14 08:30:26');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `customer_name`, `rating`, `comment`, `created_at`) VALUES
(1, 'John Doe', 5, 'Great food!', '2024-09-26 01:27:42'),
(2, 'Oksana Wilson', 5, 'Happy now:) Test', '2024-09-26 01:28:51'),
(3, 'Johnny McFarlean', 4, 'All good!', '2024-09-26 02:01:53'),
(4, 'Luisa Bullu', 3, 'Will see you soon!', '2024-09-26 02:04:29'),
(5, 'sophia wilson', 5, 'yumy food its amazing ill defantly come back soon with a lot of people\n', '2024-10-05 20:53:47'),
(6, 'mark grumpy', 1, 'hate the food i am mark grumpy and i am grumpy dont ever give me food like that evr again ', '2024-10-05 20:58:01'),
(7, 'Marina', 5, 'Very good!', '2024-10-14 08:22:06'),
(8, 'Dmitry', 5, 'Happy test!', '2024-10-14 08:32:48');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','staff') DEFAULT 'staff',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
