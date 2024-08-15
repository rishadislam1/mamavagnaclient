-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2024 at 01:59 PM
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

--
-- Dumping data for table `buyer_list`
--

INSERT INTO `buyer_list` (`id`, `monthName`, `buyerName`, `address`, `phoneNumber`, `pdf`, `carName`, `showRoom`, `carCondition`, `bySale`, `model`, `registration`, `color`, `buyPrice`, `salePrice`, `cost`, `profit`, `investor`, `buyDate`, `bookingDate`, `deliveryDate`, `registrationNumber`, `loanOrCash`, `bankName`, `importer`, `profitShare`, `officeIncome`, `remarks`, `entryBy`) VALUES
(7, 'July', 'Rishad', 'cvx', '2323', 'rishad_islam_front_end_developer.pdf', '32', 'new', 'recondition', 'dsf', 'Express', 'sdf', '32', '23', '23', '23', '23', '23', '2024-07-21', '2024-07-11', '2024-07-14', '23', 'cash', '', '23', '23', '23', '32', 'Anik eg');

-- --------------------------------------------------------

--
-- Table structure for table `ledger`
--

CREATE TABLE `ledger` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `ledgerDate` date DEFAULT NULL,
  `carDescription` text DEFAULT NULL,
  `bankingInformation` text DEFAULT NULL,
  `debit` text DEFAULT NULL,
  `credit` text DEFAULT NULL,
  `entryBy` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ledger`
--

INSERT INTO `ledger` (`id`, `name`, `ledgerDate`, `carDescription`, `bankingInformation`, `debit`, `credit`, `entryBy`) VALUES
(7, 'Pinterest Quote', '2024-07-05', 'sda', 'asd', '100', '', NULL),
(8, 'Pinterest Quote', '2024-07-07', 'sda', 'asf', '10', '20', NULL),
(9, 'Bata Business', '2024-07-07', 'he', 'sfd', '10', '', NULL),
(10, 'Bata Business', '2024-07-02', 'he', 'sfd', '', '20', NULL),
(11, 'Bata Business', '2024-07-05', 'he', '', '10', '', NULL),
(12, 'Bata Business', '2024-07-07', 'any', 'asf', '10', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `usertable`
--

CREATE TABLE `usertable` (
  `id` int(11) NOT NULL,
  `email` varchar(1000) DEFAULT NULL,
  `pass` varchar(1000) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `position` varchar(1000) DEFAULT NULL,
  `image` text NOT NULL,
  `phone` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usertable`
--

INSERT INTO `usertable` (`id`, `email`, `pass`, `name`, `position`, `image`, `phone`) VALUES
(1, 'admin@gmail.com', '$2y$10$nBLIUaPZHOLKniYrYjyZx.M8eRk.YJsujhoCH48IsjaIQnr9eCvm6', 'Anik eg', 'admin', 'uploads/00000PORTRAIT_00000_BURST20211207113703497.jpg', '01705978622'),
(3, 'rishad@gmail.com', '$2y$10$G4p5p3jS1YFKwNTRbkgvEerZRV7vXnERh25yenixUgXXaIQh.cLo6', 'Rishad', '', '', '01705978622');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buyer_list`
--
ALTER TABLE `buyer_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ledger`
--
ALTER TABLE `ledger`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `ledger`
--
ALTER TABLE `ledger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `usertable`
--
ALTER TABLE `usertable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
