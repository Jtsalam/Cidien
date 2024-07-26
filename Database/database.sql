-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2024 at 06:10 AM
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
-- Database: `medicalcentersdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `medicalcenter-info`
--

CREATE TABLE `medicalcenter-info` (
  `Center-Id` int(11) NOT NULL,
  `Center-name` text NOT NULL,
  `Logo` varchar(400) NOT NULL,
  `Website` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicalcenter-info`
--

INSERT INTO `medicalcenter-info` (`Center-Id`, `Center-name`, `Logo`, `Website`) VALUES
(1, 'Parkville Manor', 'https://assets-global.website-files.com/60ef051e646d754b9e934997/60ef44d9a7bdb108de7a9b13_logo.png', 'https://www.parkvillemanor.com/'),
(2, 'Erindale Health center', 'https://images.squarespace-cdn.com/content/v1/609d87c9ac9ae1593741d2a7/1621027524658-89X22HCTS2KW2QWS41UW/testx.png?format=1500w', 'https://www.erindalehealth.ca/'),
(3, 'Kenderdine Medical Clinic', 'https://kenderdinemedicalclinic.com/wp-content/uploads/2019/03/logo.png', 'https://kenderdinemedicalclinic.com/'),
(4, 'Jim Pattison Children''s Hospital', 'https://momsandkidssask.saskhealthauthority.ca/themes/custom/duchess/logo.svg', 'https://momsandkidssask.saskhealthauthority.ca/jim-pattison-childrens-hospital'),
(5, 'Evergreen Medical Clinic', 'https://www.evergreenmedicalclinic.ca/images/logo.svg', 'https://www.evergreenmedicalclinic.ca/?no_footer=true&no_header=true');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `medicalcenter-info`
--
ALTER TABLE `medicalcenter-info`
  ADD PRIMARY KEY (`Center-Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `medicalcenter-info`
--
ALTER TABLE `medicalcenter-info`
  MODIFY `Center-Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


--
-- Table structure for table `user-info`
--

CREATE TABLE `user-info` (
  `UserId` int(11) NOT NULL,
  `User-Name` text NOT NULL,
  `Center-number` int(11) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `User-Role` text NOT NULL,
  `Center-Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user-info`
--

INSERT INTO `user-info` (`UserId`, `User-Name`, `Center-number`, `Password`, `User-Role`, `Center-Id`) VALUES
(1, 'Ifejesu Salam', 2001745, '$2y$10$8Gat9PJiUPErXwZlLULDkOo7ZXPvs6mFlCSFJLtzeBKJH9eljNF62', 'Staff', 4),
(2, 'Thomas Vernon', 4101735, '$2y$10$KufW4NMvqBUo9Ibnr4RsieTdbeR9t6tZCkRzxbM9LEQd013zlBOr6', 'Admin', 4),
(3, 'Jessica nia', 1285723, '$2y$10$pg9N05LBhpbSzVXFSG514.44FcAIiz/v6hszIIZngKrAUKD8QJ2uW', 'Admin', 5),
(4, 'Adrea James', 1095422, '$2y$10$l4Jf0zNFjblP0WobdTY/DOcPpRtJ3eev2Zub0kTXXOrs687XB8zLO', 'Staff', 5),
(5, 'Tom Murphy', 2378651, '$2y$10$Jk4Go/zURHydLuvCljlfB.EE2wVrwR6/uSkM5kl4F1aOR2c7e4w.K', 'Staff', 1),
(6, 'Robert Blue', 3127901, '$2y$10$.KEfuv4J.fQo1EtFS36D1OtpzsWOHOlTVypZhUWqTMlLbAwS9hipW', 'Admin', 1),
(7, 'Sarah Love', 4712902, '$2y$10$WsBCo5RlMB53cgkOPwjbGuIsKkeV6yfVfxx2Ka01q6SN.jFu0rvVi', 'Admin', 2),
(8, 'Mary Andrews', 3701291, '$2y$10$r7fnDfKKw1VzVjxNpIOekOcl4LNxn8TkIK71cD0lDkgbhT9Tbu3W2', 'Staff', 2),
(9, 'John Adams', 4720943, '$2y$10$SzW3IctNwEaZdEHLeaRMhe25g9XsD.cMq/TEvZGdOYsvrNf18365O', 'Admin', 3),
(10, 'Layla Tomkins', 8462192, '$2y$10$iLk3WFAvlPzTUw1o066/UOwmdRbzyXwRqyVRTDiNH5plTJRynR6am', 'Staff', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user-info`
--
ALTER TABLE `user-info`
  ADD PRIMARY KEY (`UserId`),
  ADD KEY `Center-Id` (`Center-Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user-info`
--
ALTER TABLE `user-info`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;