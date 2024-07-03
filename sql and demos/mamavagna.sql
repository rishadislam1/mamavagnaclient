-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2024 at 03:47 AM
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
-- Database: `mamavagna`
--

-- --------------------------------------------------------

--
-- Table structure for table `buyer_list`
--

CREATE TABLE `buyer_list` (
  `id` int(11) NOT NULL,
  `monthName` text DEFAULT NULL,
  `buyerName` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phoneNumber` text DEFAULT NULL,
  `pdf` text DEFAULT NULL,
  `carName` text DEFAULT NULL,
  `showRoom` text DEFAULT NULL,
  `carCondition` text DEFAULT NULL,
  `bySale` text DEFAULT NULL,
  `model` text DEFAULT NULL,
  `registration` text DEFAULT NULL,
  `color` text DEFAULT NULL,
  `buyPrice` text DEFAULT NULL,
  `salePrice` text DEFAULT NULL,
  `cost` text DEFAULT NULL,
  `profit` text DEFAULT NULL,
  `investor` text DEFAULT NULL,
  `buyDate` text DEFAULT NULL,
  `bookingDate` text DEFAULT NULL,
  `deliveryDate` text DEFAULT NULL,
  `registrationNumber` text DEFAULT NULL,
  `loanOrCash` text DEFAULT NULL,
  `bankName` text DEFAULT NULL,
  `importer` text DEFAULT NULL,
  `profitShare` text DEFAULT NULL,
  `officeIncome` text DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `entryBy` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usertable`
--

CREATE TABLE `usertable` (
  `id` int(11) NOT NULL,
  `email` varchar(1000) DEFAULT NULL,
  `pass` varchar(1000) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `position` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usertable`
--

INSERT INTO `usertable` (`id`, `email`, `pass`, `name`, `position`) VALUES
(1, 'admin@gmail.com', '1234', 'Anik', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buyer_list`
--
ALTER TABLE `buyer_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usertable`
--
ALTER TABLE `usertable`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buyer_list`
--
ALTER TABLE `buyer_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usertable`
--
ALTER TABLE `usertable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;