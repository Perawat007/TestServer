-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2023 at 11:24 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_gggame`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `datetime_lastlogin` datetime DEFAULT NULL,
  `get_browser` longtext DEFAULT NULL,
  `status` enum('Y','N') NOT NULL DEFAULT 'Y',
  `status_delete` enum('Y','N') NOT NULL DEFAULT 'N',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `contact_number` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `username`, `password`, `datetime_lastlogin`, `get_browser`, `status`, `status_delete`, `created_at`, `updated_at`, `contact_number`) VALUES
(1, 'admin', 'admin01', '$2a$12$txRrO/VE/XsEIurb9Gs.2.KZg0sw1SAjLMUzQgTad7X2UQ1mZOv1q', NULL, NULL, 'Y', 'Y', '2023-04-17 06:23:16', '2023-04-17 06:23:16', '0978454454'),
(2, 'admintest00', 'admintest', '$2a$12$U5KKkYIBfDy1XnM3lsyqEe3Rc/dCeRzluqkcHM4TSuKxkuK0g/7h2', NULL, NULL, 'Y', 'N', '2023-04-17 07:50:51', '2023-04-17 07:50:51', '0788751245'),
(3, 'admintest01', 'admintest01', '$2a$12$c3q0ErCOJt3Ww2bP9UESJ.EKcdzk4wlU7YM49aPw9s3Tvqv5noPWu', NULL, NULL, 'Y', 'N', '2023-04-17 09:27:54', '2023-04-17 09:27:54', '0854415621'),
(4, 'admintest02', 'admintest02', '$2a$12$8LBsaQ052PkMsjqYPRQkWu0Pn7nTIpchhoPeS3GOpNRDwhVVMcrei', NULL, NULL, 'Y', 'N', '2023-04-20 07:31:53', '2023-04-20 07:31:53', '0789445254'),
(5, 'admintest3', 'admintest3', '$2a$12$yhidiomnp6JDuMiW8e5A5u1tDZnPK4rASqO0bqy00wTSsKH5a4QU2', NULL, NULL, 'Y', 'N', '2023-04-20 07:32:10', '2023-04-20 07:32:10', '0545453333'),
(6, 'admintest4', 'admintest4', '$2a$12$oaZ6eitByvwaai4Svr05YO.0QLR1VhH50D7oxwiPoACbEqCqxe962', NULL, NULL, 'Y', 'N', '2023-04-20 07:32:18', '2023-04-20 07:32:18', '0990825941'),
(7, 'admintest05', 'admintest05', '$2a$12$Y4D0aE9P3f5lq6KSvOgN8u6lD6hC2pgZjiXn.uVvLpEkXZIfuzjnK', NULL, NULL, 'Y', 'N', '2023-04-20 07:32:25', '2023-04-20 07:32:25', '0545453333'),
(8, 'admintest06', 'admintest06', '$2a$12$sbsgT9VBhV70cx6j2KUPfuK744bmo49nW7hKtgojcxlLmCixrcsOm', NULL, NULL, 'Y', 'N', '2023-04-20 07:32:33', '2023-04-20 07:32:33', '0'),
(9, 'admin06', 'admin06', '$2a$12$IHq5WMEQy42pLWUkliwHbONcD/3AxRLuZ6fcTTILx5noX.H6VXIWi', NULL, NULL, 'Y', 'N', '2023-04-20 07:32:46', '2023-04-20 07:32:46', '0'),
(10, 'admin10', 'admin10', '$2a$12$.78r2Cnu8Fa6cazVev1dm.VvXIajjDfLPB87Qju9.0NU9bxRG5MGa', NULL, NULL, 'Y', 'N', '2023-04-20 07:33:00', '2023-04-20 07:33:00', '0'),
(11, 'admin11', 'admin11', '$2a$12$3rEnwyqClA7jLaY85Gg41.Qqv17IvrexIjVD3LWo93zJiTrXRd2Ri', NULL, NULL, 'Y', 'N', '2023-04-20 07:33:07', '2023-04-20 07:33:07', '0'),
(12, 'admin011', 'admin011', '$2a$12$PC3jgUNpwgb6OtpnxW4.gOVFSMwDB3rL5qu58fGWmVRGTX/Z5s5PO', NULL, NULL, 'Y', 'N', '2023-04-20 07:33:14', '2023-04-20 07:33:14', '0'),
(13, 'Admin012', 'Admin012', '$2a$12$eDFFTJAwv5Vv4bQXwbMcV.9C1wijhrKvLurvf.gjv1xV6PAqDgXOa', NULL, NULL, 'Y', 'N', '2023-04-20 13:59:53', '2023-04-20 13:59:53', '0'),
(14, 'adminhui', 'adminhui', '$2a$12$QNxyS1TZxB9slDNVli7RiOEr2w3n9yyfo2JK5GSz7PKrG1T6pP9BK', NULL, NULL, 'Y', 'N', '2023-04-24 19:03:48', '2023-04-24 19:03:48', '0'),
(15, 'หุ้ย01', 'huiadmin01', '$2a$12$dCHdgf1dSammHVJjXdoPj.MrBHi1L2uD6vHRI.ih.Ozm7SgYc7N9C', NULL, NULL, 'Y', 'N', '2023-04-25 03:57:44', '2023-04-25 03:57:44', '0'),
(16, 'adminHuiTest', 'adminHuiTest', '$2a$12$prb54Qvobxcic7l1L9TZ.eRoRFbh/vRwCGA/xRQ4jJ7VpHS58Sd5q', NULL, NULL, 'Y', 'N', '2023-04-26 08:01:11', '2023-04-26 08:01:11', '0990825964'),
(17, 'GGadmin', 'GGadmin', '$2a$12$tRreQ5jBpi006qaorG/RRuk0txL7KFNNvFYflglzzb7EtxDnqWYXe', NULL, NULL, 'Y', 'N', '2023-04-26 08:02:41', '2023-04-26 08:02:41', '0990825964'),
(18, 'GGadmin01', 'GGadmin01', '$2a$12$80tuRgfHVGlUkGbt4Z85ZuMe8GRMC2KOP7VnzAuT/vQyCp63.k.Ya', NULL, NULL, 'Y', 'N', '2023-04-26 08:09:05', '2023-04-26 08:09:05', '0990825941'),
(19, 'GGadmin02', 'GGadmin02', '$2a$12$K67OF9SPf1M//rAu1.d1pu2cKAgTnE/pGUeSWf71Rkuih8f8.9Szy', NULL, NULL, 'Y', 'N', '2023-04-26 08:10:52', '2023-04-26 08:10:52', '0990825964');

-- --------------------------------------------------------
--
-- Table structure for table `agent`
--

CREATE TABLE `agent` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `website_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('Y','N') NOT NULL DEFAULT 'Y',
  `status_delete` enum('Y','N') NOT NULL DEFAULT 'N',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `contact_number` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `credit` float(15,2) DEFAULT 0.00,
  `commission` float(15,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `agent`
--

INSERT INTO `agent` (`id`, `website_name`, `name`, `username`, `password`, `status`, `status_delete`, `created_at`, `updated_at`, `contact_number`, `credit`, `commission`) VALUES
(1, NULL, 'agent001', 'agent111', '$2a$12$lOTfpiqpS4UUw4OUD970seeZ0EfVWtQk/yYM0FBwqMx3zJzwfD1nC', 'Y', 'N', '2023-04-18 10:01:41', '2023-04-18 10:01:41', '0778569255', 40000.00, 300.00),
(2, NULL, 'agent002', 'agent01', '$2a$12$lOTfpiqpS4UUw4OUD970seeZ0EfVWtQk/yYM0FBwqMx3zJzwfD1nC', 'Y', 'N', '2023-04-18 10:09:44', '2023-04-18 10:09:44', '0778888888', 10000.00, 200.00),
(3, NULL, 'undefined', 'agent03', '$2a$12$lOTfpiqpS4UUw4OUD970seeZ0EfVWtQk/yYM0FBwqMx3zJzwfD1nC', 'Y', 'Y', '2023-04-18 10:09:50', '2023-04-18 10:09:50', '0452342377', 30000.00, 0.00),
(4, NULL, 'agent04', 'agent04', '$2a$12$lOTfpiqpS4UUw4OUD970seeZ0EfVWtQk/yYM0FBwqMx3zJzwfD1nC', 'Y', 'N', '2023-04-20 10:50:05', '2023-04-20 10:50:05', '0883569875', 30254.00, 0.00),
(5, NULL, 'Bookiezz', 'agent05', '$2a$12$lOTfpiqpS4UUw4OUD970seeZ0EfVWtQk/yYM0FBwqMx3zJzwfD1nC', 'Y', 'N', '2023-04-20 10:50:11', '2023-04-20 10:50:11', '0545453333', 300000.00, 0.00),
(6, NULL, 'undefined', 'agent05', '$2a$12$lOTfpiqpS4UUw4OUD970seeZ0EfVWtQk/yYM0FBwqMx3zJzwfD1nC', 'Y', 'N', '2023-04-20 10:50:20', '2023-04-20 10:50:20', '0990825941', 40000.00, 300.00),
(7, NULL, 'agent055', 'agent055', '$2a$12$lOTfpiqpS4UUw4OUD970seeZ0EfVWtQk/yYM0FBwqMx3zJzwfD1nC', 'Y', 'N', '2023-04-20 10:50:27', '2023-04-20 10:50:27', '0943169915', 4500.00, 2055.00),
(8, NULL, 'agent066', 'agent066', '$2a$12$lOTfpiqpS4UUw4OUD970seeZ0EfVWtQk/yYM0FBwqMx3zJzwfD1nC', 'Y', 'N', '2023-04-20 10:50:35', '2023-04-20 10:50:35', NULL, 0.00, 1000.00),
(9, NULL, 'agent07', 'agent07', '$2a$12$lOTfpiqpS4UUw4OUD970seeZ0EfVWtQk/yYM0FBwqMx3zJzwfD1nC', 'Y', 'N', '2023-04-20 10:50:42', '2023-04-20 10:50:42', NULL, 0.00, 0.00),
(10, NULL, 'agent11', 'agent11', '$2a$12$lOTfpiqpS4UUw4OUD970seeZ0EfVWtQk/yYM0FBwqMx3zJzwfD1nC', 'Y', 'N', '2023-04-20 10:50:49', '2023-04-20 10:50:49', NULL, 0.00, 700.00),
(11, NULL, 'agent12', 'agent12', '$2a$12$lOTfpiqpS4UUw4OUD970seeZ0EfVWtQk/yYM0FBwqMx3zJzwfD1nC', 'Y', 'N', '2023-04-20 10:51:04', '2023-04-20 10:51:04', NULL, 0.00, 0.00),
(12, NULL, 'agent14', 'agent14', '$2a$12$lOTfpiqpS4UUw4OUD970seeZ0EfVWtQk/yYM0FBwqMx3zJzwfD1nC', 'Y', 'N', '2023-04-20 10:51:11', '2023-04-20 10:51:11', NULL, 0.00, 0.00),
(13, NULL, 'agent111', 'agent111', '$2a$12$lOTfpiqpS4UUw4OUD970seeZ0EfVWtQk/yYM0FBwqMx3zJzwfD1nC', 'Y', 'N', '2023-04-20 10:51:19', '2023-04-20 10:51:19', NULL, 0.00, 0.00),
(14, NULL, 'agent0234', 'agent0234', '$2a$12$lOTfpiqpS4UUw4OUD970seeZ0EfVWtQk/yYM0FBwqMx3zJzwfD1nC', 'Y', 'N', '2023-04-26 06:06:45', '2023-04-26 06:06:45', '0990854415', 50004.00, 0.00),
(15, NULL, 'fgdgdgd', 'dgdgdgd', '$2a$12$lOTfpiqpS4UUw4OUD970seeZ0EfVWtQk/yYM0FBwqMx3zJzwfD1nC', 'Y', 'N', '2023-04-26 06:08:52', '2023-04-26 06:08:52', '0555555555', 0.00, 250.00),
(16, NULL, 'GGagent01', 'GGagent01', '$2a$12$lOTfpiqpS4UUw4OUD970seeZ0EfVWtQk/yYM0FBwqMx3zJzwfD1nC', 'Y', 'N', '2023-04-26 08:12:31', '2023-04-26 08:12:31', '0990825964', 15000.00, 0.00),
(17, NULL, 'OstArifureta', 'ffffffff', '$2a$12$lOTfpiqpS4UUw4OUD970seeZ0EfVWtQk/yYM0FBwqMx3zJzwfD1nC', 'Y', 'N', '2023-05-19 07:24:57', '2023-05-19 07:24:57', '0998542263', 5020.00, 0.00),
(18, NULL, 'Ginga', 'UltramanGinga', '$2a$12$3GUX8XgasDzSwn/GtopoheRNkUb6QQMnG8pgNnA4C1xQ/6QQsH.hK', 'Y', 'N', '2023-05-24 16:39:20', '2023-05-24 16:39:20', '0838985624', 52300.00, 0.00);

-- --------------------------------------------------------
--
-- Table structure for table `allgame`
--

CREATE TABLE `allgame` (
  `id` bigint(22) NOT NULL,
  `namegame` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `linkgame` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `allgame`
--

INSERT INTO `allgame` (`id`, `namegame`, `img`, `linkgame`) VALUES
(1, 'Go Gold Planet', '/img/thumbs/icontest1.png', 'https://testconstruct3games.s3.ap-southeast-1.amazonaws.com/Test_GoGoldPlanet/index.html'),
(2, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png\n', 'https://testconstruct3games.s3.ap-southeast-1.amazonaws.com/Test_LuckyBunnyGold/index.html'),
(3, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', 'https://testconstruct3games.s3.ap-southeast-1.amazonaws.com/Test_CowboyVSAlien/index.html');

-- --------------------------------------------------------

--
-- Table structure for table `comgogoldplanet`
--

CREATE TABLE `comgogoldplanet` (
  `id` bigint(20) NOT NULL,
  `bet_gogold` float DEFAULT 0,
  `win_gogold` float DEFAULT 0,
  `bet_luckybunny` float(15,2) DEFAULT 0.00,
  `win_luckybunny` float(15,2) DEFAULT 0.00,
  `bet_aliens` float(15,2) DEFAULT 0.00,
  `win_aliens` decimal(15,2) DEFAULT 0.00,
  `commission` float(15,2) DEFAULT 0.00,
  `day` date DEFAULT NULL,
  `monthly` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comgogoldplanet`
--

INSERT INTO `comgogoldplanet` (`id`, `bet_gogold`, `win_gogold`, `bet_luckybunny`, `win_luckybunny`, `bet_aliens`, `win_aliens`, `commission`, `day`, `monthly`) VALUES
(1, 30, 7, 20.00, 0.00, 15.00, '9.00', 5.00, '2023-05-11', '2023-05-11'),
(2, 10, 5, 0.00, 0.00, 0.00, '0.00', 120.00, '2023-05-12', '2023-05-12'),
(3, 10, 0, 0.00, 0.00, 0.00, '0.00', 0.00, '2023-05-13', '2023-05-13'),
(4, 550, 336.002, 0.00, 0.00, 0.00, '0.00', 0.00, '2023-05-16', '2023-05-16'),
(5, 3030, 158.333, 1520.00, 117.67, 0.00, '0.00', 0.00, '2023-05-17', '2023-05-17'),
(6, 1455, 951.033, 0.00, 0.00, 0.00, '0.00', 0.00, '2023-05-18', '2023-05-18'),
(7, 198, 268.2, 0.00, 0.00, 0.00, '0.00', 0.00, '2023-05-20', '2023-05-20'),
(8, 891, 1159.2, 0.00, 0.00, 0.00, '0.00', 0.00, '2023-05-21', '2023-05-21'),
(9, 0, 0, 18.00, 13.20, 0.00, '0.00', 0.00, '2023-05-22', '2023-05-22'),
(10, 0, 0, 909.00, 1039.20, 0.00, '0.00', 0.00, '2023-05-25', '2023-05-25'),
(11, 0, 0, 1179.00, 775.80, 0.00, '0.00', 0.00, '2023-05-26', '2023-05-26'),
(12, 0, 0, 81.00, 16.50, 0.00, '0.00', 0.00, '2023-06-20', '2023-06-20'),
(13, 0, 0, 441.00, 144.90, 0.00, '0.00', 0.00, '2023-06-28', '2023-06-28'),
(14, 0, 0, 0.00, 0.00, 252.00, '0.05', 0.00, '2023-06-29', '2023-06-29');

-- --------------------------------------------------------

--
-- Table structure for table `commissionsubagent`
--

CREATE TABLE `commissionsubagent` (
  `id` bigint(20) NOT NULL,
  `idsub_agent` bigint(20) DEFAULT NULL,
  `id_agent` bigint(20) DEFAULT NULL,
  `game_id` float(15,2) DEFAULT NULL,
  `total` float(15,2) DEFAULT 0.00,
  `time` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `commissionsubagent`
--

INSERT INTO `commissionsubagent` (`id`, `idsub_agent`, `id_agent`, `game_id`, `total`, `time`) VALUES
(1, 2, 2, 1.00, 0.00, '2023-05-22');

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `id` bigint(20) NOT NULL,
  `growshrink` int(255) DEFAULT NULL,
  `fiatValue` int(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `symbol` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `linkgame` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`id`, `growshrink`, `fiatValue`, `name`, `symbol`, `icon`, `linkgame`) VALUES
(1, 10, 3000, 'Go Gold Planet', 'LTC', '/img/thumbs/icontest3.png', NULL),
(2, 30, 1500, 'CowBoys VS Aliens', 'BTC', '/img/thumbs/icontest1.png', NULL),
(3, 40, 1000, 'Lucky Bunny Gold', 'ETH', '/img/thumbs/icontest2.png', NULL),
(4, 20, 2000, 'CowboyVsAlien', 'SOL', '/img/thumbs/solana.png', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `gameweb`
--

CREATE TABLE `gameweb` (
  `id` bigint(255) NOT NULL,
  `imglogo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password_img` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `namegame` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `active` enum('Y','N') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gameweb`
--

INSERT INTO `gameweb` (`id`, `imglogo`, `password_img`, `namegame`, `active`) VALUES
(1, 'https://superapi-products.s3-ap-southeast-1.amazonaws.com/logo/pgslot.webp', 'PGSOFT2', 'PG Soft', 'N'),
(2, 'https://alexanderdevenezuela.com/wp-content/uploads/2021/02/slot-xo.png', 'SLOTXO', 'Slotxo', 'N'),
(3, 'https://joker123.center/wp-content/uploads/2021/01/cropped-joker123-center-1024px.png', 'JOKER', 'Joker123', 'N'),
(4, 'https://superapi-products.s3-ap-southeast-1.amazonaws.com/logo/askmebet.webp', 'ASKMEBET', 'Askmebet', 'N'),
(5, 'https://casinodaddy.com/wp-content/uploads/2020/04/habanero-logo.png', 'HABANERO', 'Habanero', 'N'),
(6, 'https://www.slotsreview.games/wp-content/uploads/2020/09/tabPp8TY.png', 'SPADE', 'Spade Gaming', 'N'),
(7, 'https://onlinebingo.co.uk/wp-content/uploads/2022/08/microgaming.png', 'MICRO', 'Micro Gaming', 'N'),
(8, 'https://smartcasinoguide.com/app/uploads/2021/11/SimplePlay-games-icon.png', 'SIMPLEPLAY', 'Simple Play', 'N'),
(9, 'https://malaysialistings.s3.ap-south-1.amazonaws.com/listings/images63be4cb88319b.jpg', 'LIVE22', 'Live22', 'N'),
(10, 'https://goodluckmate.com/storage/attribute_value/d3dce8f6c19589bace8a9d293a271780/c/evoplay-games-250x250.png', 'EVOPLAY', 'Evoplay', 'N'),
(11, 'https://pgslot-game.io/wp-content/uploads/2021/08/CQ9-SLOT-min-1.png', 'CQ9V2', 'CQ9', 'N'),
(12, 'https://play-lh.googleusercontent.com/7KD9UI2qGFDKCqSvVK_9k03PzApNaFxhHeAbQzCZqRvxAiqVOLVS5Jr6MXKzkcFotzUp', 'JILI', 'Jili', 'N'),
(13, 'https://superslot247.com/wp-content/uploads/2022/06/%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%A2-mannaplay-%E0%B9%80%E0%B8%A7%E0%B9%87%E0%B8%9A-Superslot-%E0%B8%9F%E0%B8%A3%E0%B8%B5%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%94%E0%B8%B4%E0%B8%95.png', 'MANNA', 'Mannaplay', 'N'),
(14, 'https://www.atombetx888.com/images/bfgames/Funky%20Games.png', 'FUNKY', 'Funky Games', 'N'),
(15, 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/uj9tjvzkgifyr1nsyomj', 'YGGDRASIL', 'Yggdrasil Gaming', 'N'),
(16, 'https://apimain.fomobet88.com/images/1655903289.webp', 'UPG', 'UPG Slot', 'N'),
(17, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0jB977AuuUdyeQYZRVw25DzoOFCWZz7yMfd5GPujDIxe0SEwqngvMLMmvmLG6ZtSOC8o&usqp=CAU', 'AMEBA', 'Ameba', 'N'),
(18, 'https://fortuneox.net/wp-content/uploads/2022/12/gamecompanyamb.png', 'AMBSLOT2', 'Ambslot', 'N'),
(19, 'https://slotsmegacasino.pt/images/slots/hotline.jpg', 'NETENT2', 'Netent2', 'N'),
(20, 'https://pbs.twimg.com/profile_images/1495764482307637248/9yEFhc2D_400x400.jpg', 'REDTIGER', 'Red Tiger', 'N'),
(21, 'https://as2.ftcdn.net/v2/jpg/03/19/27/03/1000_F_319270375_1tXTAdn0eim324DADDtNJZZVBLIVYTLP.jpg', 'DRAGONGAMING', 'Dragon Gaming', 'N'),
(22, 'https://static.wixstatic.com/media/ce54f5_43d735b0df6c47cf8de3ab7ca74be105~mv2.png/v1/fill/w_269,h_267,al_c,lg_1,q_95,enc_auto/ace333.png', 'ACE333', 'Ace333', 'N'),
(23, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSokl0-jgqd5PRC_z88Q5m13kpMVH6YxTx88w&usqp=CAU', 'I8', 'I8', 'N'),
(24, 'https://is3-ssl.mzstatic.com/image/thumb/Purple111/v4/22/0a/37/220a37e4-f17f-0b02-e54e-4869308fc2fb/source/512x512bb.jpg', 'WMSLOT', 'WmSlot', 'N'),
(25, 'https://play-lh.googleusercontent.com/kyMC5UyPeJWaoju2AonX3StTnfZ5cse0MlkXheLzAdWnLeRG1u25X33Y59IuFLqnWQ', 'SPINIX', 'Spinix', 'N'),
(26, 'https://ninjaslot.co.in/wp-content/uploads/2022/11/imgninja.png', 'NINJA', 'Ninja slot', 'Y'),
(27, 'https://i1.sndcdn.com/avatars-5zP0dUayEzDDtX3G-zTczhA-t500x500.jpg', '918KISS', '918 Kiss', 'N'),
(28, 'https://cryptostec.com/wp-content/uploads/2022/05/pragmatic-play.jpeg', 'PRAGMATIC_SLOT', 'Pragmatic Play Slot', 'N');

-- --------------------------------------------------------

--
-- Table structure for table `game_feespin`
--

CREATE TABLE `game_feespin` (
  `member_id` bigint(255) DEFAULT 0,
  `game_id` bigint(255) DEFAULT 0,
  `game_feespin` enum('true','false') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game_feespin`
--

INSERT INTO `game_feespin` (`member_id`, `game_id`, `game_feespin`) VALUES
(1, 1, 'false'),
(1, 1, 'false'),
(1, 1, 'false'),
(1, 1, 'true'),
(1, 1, 'false'),
(1, 1, 'false'),
(1, 1, 'false'),
(1, 1, 'false'),
(1, 1, 'false'),
(1, 1, 'false'),
(1, 1, 'false'),
(1, 1, 'false'),
(1, 3, 'false');

-- --------------------------------------------------------

--
-- Table structure for table `logdaygame`
--

CREATE TABLE `logdaygame` (
  `id` bigint(20) NOT NULL,
  `game_id` bigint(20) DEFAULT NULL,
  `namegame` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'game',
  `play` int(11) DEFAULT 0,
  `bet` float(15,2) DEFAULT 0.00,
  `win` float(15,2) DEFAULT 0.00,
  `icon` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `day` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logdaygame`
--

INSERT INTO `logdaygame` (`id`, `game_id`, `namegame`, `play`, `bet`, `win`, `icon`, `day`) VALUES
(1, 1, 'Go Gold Planet', 37, 1700.50, 42.83, '/img/thumbs/icontest3.png', '2023-05-15'),
(2, 2, 'Lucky Bunny Gold', 5000, 80000.00, 85000.00, '/img/thumbs/icontest2.png', '2023-05-15'),
(3, 3, 'CowBoys VS Aliens', 4500, 9000.00, 4000.00, '/img/thumbs/icontest1.png', '2023-05-15'),
(4, 1, 'Go Gold Planet', 37, 1600.00, 200.14, '/img/thumbs/icontest3.png', '2023-05-13'),
(5, 1, 'Go Gold Planet', 37, 1780.50, 90.65, '/img/thumbs/icontest3.png', '2023-05-14'),
(6, 3, 'CowBoys VS Aliens', 11, 9.00, 0.00, '/img/thumbs/icontest1.png', '2023-05-21'),
(14, 1, 'Go Gold Planet', 3, 27.00, 9.00, '/img/thumbs/icontest3.png', '2023-05-21'),
(15, 2, 'Lucky Bunny Gold', 2, 18.00, 13.20, '/img/thumbs/icontest2.png', '2023-05-22'),
(16, 2, 'Lucky Bunny Gold', 101, 909.00, 1039.20, '/img/thumbs/icontest2.png', '2023-05-25'),
(17, 2, 'Lucky Bunny Gold', 131, 1179.00, 775.80, '/img/thumbs/icontest2.png', '2023-05-26'),
(18, 2, 'Lucky Bunny Gold', 49, 441.00, 144.90, '/img/thumbs/icontest2.png', '2023-06-28'),
(19, 3, 'CowBoys VS Aliens', 28, 252.00, 84.00, '/img/thumbs/icontest1.png', '2023-06-29');

-- --------------------------------------------------------

--
-- Table structure for table `logedit`
--

CREATE TABLE `logedit` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `edittype` enum('admin','agent','membet') DEFAULT NULL,
  `idedit` bigint(20) DEFAULT NULL,
  `idmember` bigint(20) DEFAULT 0,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `editbefore` varchar(300) DEFAULT NULL,
  `editafter` varchar(300) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logedit`
--

INSERT INTO `logedit` (`id`, `edittype`, `idedit`, `idmember`, `name`, `editbefore`, `editafter`, `created_at`) VALUES
(1, 'agent', 1, 1, 'member001', 'member_codemember001statusYcredit0\n                ', 'member_codemember001statusYcreditundefined', '2023-04-28 19:07:38'),
(2, 'agent', 1, 1, 'member001', 'member_code : member001,status : Y,credit : 0\n                ', 'member_code : member001,status : Y,credit : undefined', '2023-04-28 19:11:15'),
(3, 'agent', 1, 1, 'member001', 'member_code : member001,status : Y,credit : 0\n                ', 'member_code : member001,status : Y,credit : 10000', '2023-04-28 19:12:10'),
(4, 'agent', 1, 1, 'member001', 'member_code : member001, status : Y, credit : 10000\n                ', 'member_code : member001, status : Y, credit : 10000', '2023-04-28 19:13:33'),
(5, 'admin', 1, 1, 'member001', 'member_code : member001 , status : Y , credit : 10000\n                ', 'member_code : member001 , status : Y , credit : 10000', '2023-04-28 19:22:56'),
(6, 'admin', 1, 1, 'member001', 'member_code : member001 , status : Y , credit : 10000\n                ', 'member_code : member001 , status : Y , credit : 50000', '2023-04-28 19:35:08'),
(7, 'admin', 1, 1, 'member001', 'member_code : member001 , status : Y , credit : 50000\n                ', 'member_code : member1 , status : Y , credit : 50000', '2023-04-28 19:35:46'),
(8, 'admin', 1, 2, 'member002', 'member_code : member002 , status : Y , credit : 80000\n                ', 'member_code : undefined , status : Y , credit : 9000', '2023-05-15 14:59:25'),
(9, 'admin', 1, 1, 'member01', 'member_code : member1 , status : Y , credit : 9469.84\n                ', 'member_code : undefined , status : Y , credit : 9469.84', '2023-05-15 15:00:28'),
(10, 'admin', 1, 2, 'member02', 'member_code : undefined , status : Y , credit : 9000\n                ', 'member_code : undefined , status : Y , credit : 9000', '2023-05-15 15:10:12'),
(11, 'admin', 1, 3, 'member03', 'member_code : member03 , status : Y , credit : 0\n                ', 'member_code : undefined , status : Y , credit : ', '2023-05-15 15:16:16'),
(12, 'admin', 1, 4, 'member04', 'member_code : member004 , status : Y , credit : 0\n                ', 'member_code : undefined , status : Y , credit : 2000', '2023-05-15 15:18:03'),
(13, 'admin', 1, 3, 'member03', 'member_code : undefined , status : Y , credit : 0\n                ', 'member_code : undefined , status : Y , credit : 300', '2023-05-15 15:18:49'),
(14, 'admin', 1, 5, 'Member05', 'member_code : Test003 , status : Y , credit : 0\n                ', 'member_code : Test003 , status : Y , credit : 200', '2023-05-15 15:23:06'),
(15, 'admin', 0, 1, 'member001', 'member_code : member01 , status : Y , credit : 9469.84\n                ', 'member_code : member01 , status : Y , credit : 9469.84', '2023-05-15 18:38:07'),
(16, 'admin', 0, 1, 'member01', 'member_code : member01 , status : Y , credit : 9469.84\n                ', 'member_code : member01 , status : Y , credit : 9469.84', '2023-05-15 18:40:01'),
(17, 'admin', 0, 1, 'member001', 'member_code : member01 , status : Y , credit : 9469.84\n                ', 'member_code : member01 , status : Y , credit : 9469.84', '2023-05-15 18:42:23'),
(18, 'admin', 2, 1, 'member01', 'member_code : member01 , status : Y , credit : 9469.84\n                ', 'member_code : member01 , status : Y , credit : 9469.84', '2023-05-15 18:43:52'),
(19, 'admin', 0, 25, 'dogZillaMenber', 'member_code : memberDogzilla , status : Y , credit : 0\n                ', 'member_code : undefined , status : Y , credit : 4000', '2023-05-24 22:53:44'),
(20, 'admin', 0, 5, 'Member05', 'member_code : Test003 , status : Y , credit : 200\n                ', 'member_code : undefined , status : Y , credit : 2000', '2023-05-24 22:59:56'),
(21, 'admin', 0, 1, 'member01', 'member_code : member01 , status : Y , credit : 6534.91\n                ', 'member_code : undefined , status : Y , credit : 8000.32', '2023-05-24 23:04:46');

-- --------------------------------------------------------

--
-- Table structure for table `logeditadmin`
--

CREATE TABLE `logeditadmin` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `edittype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `idedit` bigint(20) DEFAULT NULL,
  `adminid` bigint(20) DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `editbefore` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `editafter` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logeditadmin`
--

INSERT INTO `logeditadmin` (`id`, `edittype`, `idedit`, `adminid`, `name`, `editbefore`, `editafter`, `created_at`) VALUES
(1, 'admin', 2, 2, 'admintest00', 'name : admintest , status : Y , contact_number : 0788751245\n                  ', 'name : admintest00 , status : Y , contact_number : 0788751245', '2023-05-15 18:47:14');

-- --------------------------------------------------------

--
-- Table structure for table `logeditagent`
--

CREATE TABLE `logeditagent` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `edittype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `idedit` bigint(20) DEFAULT NULL,
  `agentid` bigint(20) DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `editbefore` varchar(300) CHARACTER SET utf32 COLLATE utf32_general_ci DEFAULT NULL,
  `editafter` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logeditagent`
--

INSERT INTO `logeditagent` (`id`, `edittype`, `idedit`, `agentid`, `name`, `editbefore`, `editafter`, `created_at`) VALUES
(1, 'admin', 1, 5, 'undefined', 'name : agent4 , status : Y , contact_number : 0795412658\n              ', 'name : undefined , status : Y , contact_number : 0795412658', '2023-05-02 10:37:25'),
(2, 'admin', 0, 5, 'undefined', 'name : undefined , status : Y , contact_number : 0795412658\n              ', 'name : undefined , status : Y , contact_number : 0545453333', '2023-05-04 23:44:22'),
(3, 'admin', 0, 3, 'undefined', 'name : agent02 , status : Y , contact_number : 0795412658\n              ', 'name : undefined , status : Y , contact_number : 0452342377', '2023-05-04 23:45:15'),
(4, 'admin', 0, 1, 'undefined', 'name : agent , status : Y , contact_number : 0998888888\n              ', 'name : undefined , status : Y , contact_number : 0778569266', '2023-05-04 23:46:16'),
(5, 'admin', 0, 1, 'undefined', 'name : undefined , status : Y , contact_number : 0778569266\n              ', 'name : undefined , status : Y , contact_number : 0778569255', '2023-05-04 23:46:45'),
(6, 'admin', 0, 1, 'undefined', 'name : undefined , status : Y , contact_number : 0778569255\n              ', 'name : undefined , status : Y , contact_number : 0778569255', '2023-05-04 23:47:45'),
(7, 'admin', 0, 1, 'undefined', 'name : undefined , status : Y , contact_number : 0778569255\n              ', 'name : undefined , status : Y , contact_number : 0778569255', '2023-05-04 23:48:05'),
(8, 'admin', 0, 1, 'agent01', 'name : undefined , status : Y , contact_number : 0778569255\n              ', 'name : agent01 , status : Y , contact_number : 0778569255', '2023-05-04 23:49:06'),
(9, 'admin', 1, 1, 'agent001', 'name : agent01 , status : Y , contact_number : 0778569255\n              ', 'name : agent001 , status : Y , contact_number : 0778569255', '2023-05-15 15:06:33'),
(10, 'admin', 1, 2, 'agent002', 'name : agent01 , status : Y , contact_number : 0778888888\n              ', 'name : agent002 , status : Y , contact_number : 0778888888', '2023-05-15 15:09:40'),
(11, 'admin', 2, 7, 'agent055', 'name : agent055 , status : Y , contact_number : 0943169915\n                ', 'name : agent055 , status : Y , contact_number : 0943169915', '2023-05-24 23:30:38'),
(12, 'admin', 2, 5, 'Bookiezz', 'name : undefined , status : Y , contact_number : 0545453333\n                ', 'name : Bookiezz , status : Y , contact_number : 0545453333', '2023-05-24 23:31:11'),
(13, 'admin', 2, 17, 'OstArifureta', 'name : kjkjkj , status : Y , contact_number : 0998542263\n                ', 'name : OstArifureta , status : Y , contact_number : 0998542263', '2023-05-24 23:32:48');

-- --------------------------------------------------------

--
-- Table structure for table `loggame`
--

CREATE TABLE `loggame` (
  `id` bigint(20) NOT NULL,
  `namegame` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'game',
  `play` int(11) DEFAULT 0,
  `bet` float(15,2) DEFAULT 0.00,
  `win` float(15,2) DEFAULT 0.00,
  `icon` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loggame`
--

INSERT INTO `loggame` (`id`, `namegame`, `play`, `bet`, `win`, `icon`) VALUES
(1, 'Go Gold Planet', 910, 5500.00, 1159.93, '/img/thumbs/icontest1.png'),
(2, 'Lucky Bunny Gold', 5498, 82809.00, 87081.12, '/img/thumbs/icontest2.png'),
(3, 'CowBoys VS Aliens', 4528, 9252.00, 4084.00, '/img/thumbs/icontest3.png');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `agent_id` bigint(20) DEFAULT 0,
  `username_agent` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `member_code` varchar(25) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `credit` float(15,2) DEFAULT 0.00,
  `bet_latest` float(16,2) DEFAULT 0.00,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('Y','N') NOT NULL DEFAULT 'Y',
  `status_delete` enum('Y','N') NOT NULL DEFAULT 'N',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `ip_address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `browserlogin` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `agent_id`, `username_agent`, `member_code`, `name`, `credit`, `bet_latest`, `username`, `password`, `status`, `status_delete`, `created_at`, `updated_at`, `ip_address`, `browserlogin`) VALUES
(1, 2, 'subAgent02', 'undefined', 'member01', 10610.40, 9.00, 'member001', '25f9e794323b453885f5181f1b624d0b', 'Y', 'N', '2023-04-01 01:56:00', '2023-05-12 01:56:00', '192.168.1.41', 'Google Chrome'),
(2, 2, 'subAgent02', 'member02', 'member02', 10171.17, 9.00, 'member00011', '123', 'Y', 'N', '2023-04-01 01:56:00', '2023-05-12 01:56:00', NULL, NULL),
(3, 2, 'subAgent02', 'member03', 'member03', 378.00, 9.00, 'member003', '25f9e794323b453885f5181f1b624d0b', 'Y', 'N', '2023-04-22 20:21:35', '2023-05-11 20:21:35', 'null', 'null'),
(4, 1, 'agent111', 'member04', 'member04', 2000.00, 0.00, 'member004', '25f9e794323b453885f5181f1b624d0b', 'Y', 'N', '2023-04-22 20:38:28', '2023-05-11 20:38:28', NULL, NULL),
(5, 3, 'agent03', 'undefined', 'Member05', 2000.00, 0.00, 'Test003', '25f9e794323b453885f5181f1b624d0b', 'Y', 'N', '2023-04-22 20:41:40', '2023-05-11 20:41:40', NULL, NULL),
(6, 4, '	\r\nagent04', 'member12', 'member12', 0.00, 0.00, 'member12', '1234', 'Y', 'N', '2023-04-24 07:21:08', '2023-05-12 07:21:08', NULL, NULL),
(7, 4, 'agent04', 'Member0005', 'Member0005', 0.00, 0.00, 'Member0005', '123456789', 'Y', 'N', '2023-05-01 08:27:04', '2023-05-12 01:56:00', NULL, NULL),
(8, 4, 'agent04', 'Member0006', 'Member0006', 0.00, 0.00, 'Member0006', 'Member0006', 'Y', 'N', '2023-05-01 08:27:33', '2023-05-12 01:56:00', NULL, NULL),
(9, 2, 'agent04', 'Member0007', 'Member0007', 0.00, 0.00, 'Member0007', 'Member0007', 'Y', 'N', '2023-05-02 08:27:57', '2023-05-12 01:56:00', NULL, NULL),
(10, 2, 'agent04', 'Member00010', 'Member00010', 0.00, 0.00, 'Member00010', '123456789', 'Y', 'N', '2023-05-01 08:27:04', '2023-05-11 20:21:35', NULL, NULL),
(11, 4, 'agent04', NULL, 'Member0011', 0.00, 0.00, 'Member0011', 'Member0011', 'Y', 'N', '2023-05-01 08:28:47', '2023-05-11 20:21:35', NULL, NULL),
(12, 4, 'agent04', 'Member0012', 'Member0012', 0.00, 0.00, 'Member0012', 'Member0012', 'Y', 'N', '2023-05-01 08:29:06', '2023-05-12 01:56:00', NULL, NULL),
(21, 1, 'undefined', 'Hui', 'หุ้ย01', 0.00, 0.00, 'huiadmin01', '123456789', 'Y', 'N', '2023-04-27 08:44:01', '2023-04-27 08:44:01', NULL, NULL),
(22, 1, 'undefined', 'Hui', 'หุ้ย01', 0.00, 0.00, 'huiadmin21', '123456789', 'Y', 'N', '2023-04-27 08:45:13', '2023-04-27 08:45:13', NULL, NULL),
(23, 1, 'agent', 'Hui', 'หุ้ย01', 0.00, 0.00, 'huiadmin2', '123456789', 'Y', 'N', '2023-04-27 08:45:56', '2023-04-27 08:45:56', NULL, NULL),
(24, 1, 'agent', 'Dertyuo01', 'Dertyuo01', 0.00, 0.00, 'Dertyuo01', '123456789', 'Y', 'N', '2023-04-27 08:53:13', '2023-04-27 08:53:13', NULL, NULL),
(25, 3, 'agent03', 'undefined', 'dogZillaMenber', 4000.00, 0.00, 'memberDogzilla', '25f9e794323b453885f5181f1b624d0b', 'Y', 'N', '2023-05-24 15:30:40', '2023-05-24 15:30:40', NULL, NULL),
(26, 5, 'agent05', 'UltramanOrb', 'KulanaiKai', 60000.00, 0.00, 'UltramanOrb', '4c93008615c2d041e33ebac605d14b5b', 'Y', 'N', '2023-05-24 16:02:00', '2023-05-24 16:02:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `percentgame`
--

CREATE TABLE `percentgame` (
  `id` bigint(20) NOT NULL,
  `subagent_id` bigint(20) DEFAULT NULL,
  `gamename` varchar(30) CHARACTER SET utf32 COLLATE utf32_general_ci DEFAULT NULL,
  `img` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `hold_percentage` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0%',
  `our_percentage` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0%',
  `monthly_total` float(15,2) DEFAULT 0.00,
  `monthly` date DEFAULT NULL,
  `status_game` enum('Y','N') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'Y'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `percentgame`
--

INSERT INTO `percentgame` (`id`, `subagent_id`, `gamename`, `img`, `hold_percentage`, `our_percentage`, `monthly_total`, `monthly`, `status_game`) VALUES
(1, 2, 'Go Gold Planet', '/img/thumbs/icontest1.png', '60%', '30%', 3000.00, '2023-05-30', 'Y'),
(2, 2, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '60%', '30%', 15230.00, '2023-05-30', 'N'),
(3, 2, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '60%', '30%', 4230.00, '2023-05-30', 'Y'),
(4, 1, 'Go Gold Planet', '/img/thumbs/icontest1.png', '6%', '84%', 3000.00, '2023-05-31', 'Y'),
(5, 1, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '5%', '85%', 15230.00, '2023-05-31', 'Y'),
(6, 1, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '8%', '82%', 4230.00, '2023-05-31', 'Y'),
(7, 3, 'Go Gold Planet', '/img/thumbs/icontest1.png', '23%', '67%', 3000.00, '2023-05-31', 'Y'),
(8, 3, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '11%', '79%', 15230.00, '2023-05-31', 'Y'),
(9, 3, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '80%', '10%', 4230.00, '2023-05-31', 'Y'),
(10, 4, 'Go Gold Planet', '/img/thumbs/icontest1.png', '40%', '50%', 3000.00, '2023-05-31', 'Y'),
(11, 4, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '40%', '50%', 15230.00, '2023-05-31', 'Y'),
(12, 4, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '60%', '30%', 4230.00, '2023-05-31', 'Y'),
(13, 5, 'Go Gold Planet', '/img/thumbs/icontest1.png', '40%', '50%', 3000.00, '2023-05-31', 'Y'),
(14, 5, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '40%', '50%', 15230.00, '2023-05-31', 'N'),
(15, 5, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '60%', '30%', 4230.00, '2023-05-31', 'Y'),
(16, 6, 'Go Gold Planet', '/img/thumbs/icontest1.png', '40%', '50%', 3000.00, '2023-05-31', 'Y'),
(17, 6, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '40%', '50%', 15230.00, '2023-05-31', 'Y'),
(18, 6, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '60%', '30%', 4230.00, '2023-05-31', 'Y'),
(19, 7, 'Go Gold Planet', '/img/thumbs/icontest1.png', '40%', '50%', 3000.00, '2023-05-31', 'Y'),
(20, 7, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '40%', '50%', 15230.00, '2023-05-31', 'Y'),
(21, 7, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '60%', '30%', 4230.00, '2023-05-31', 'Y'),
(22, 8, 'Go Gold Planet', '/img/thumbs/icontest1.png', '40%', '50%', 3000.00, '2023-05-31', 'Y'),
(23, 8, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '40%', '50%', 15230.00, '2023-05-31', 'Y'),
(24, 8, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '60%', '30%', 4230.00, '2023-05-31', 'Y'),
(25, 9, 'Go Gold Planet', '/img/thumbs/icontest1.png', '40%', '50%', 3000.00, '2023-05-31', 'Y'),
(26, 9, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '40%', '50%', 15230.00, '2023-05-31', 'Y'),
(27, 9, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '60%', '30%', 4230.00, '2023-05-31', 'Y'),
(28, 10, 'Go Gold Planet', '/img/thumbs/icontest1.png', '40%', '50%', 3000.00, '2023-05-31', 'Y'),
(29, 10, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '40%', '50%', 15230.00, '2023-05-31', 'Y'),
(30, 10, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '60%', '30%', 4230.00, '2023-05-31', 'Y'),
(31, 11, 'Go Gold Planet', '/img/thumbs/icontest1.png', '40%', '50%', 3000.00, '2023-05-31', 'Y'),
(32, 11, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '40%', '50%', 15230.00, '2023-05-31', 'Y'),
(33, 11, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '60%', '30%', 4230.00, '2023-05-31', 'Y'),
(34, 12, 'Go Gold Planet', '/img/thumbs/icontest1.png', '33%', '57%', 0.00, '2023-06-01', 'Y'),
(35, 12, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '40%', '50%', 0.00, '2023-06-01', 'Y'),
(36, 12, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '50%', '40%', 0.00, '2023-06-01', 'Y'),
(37, 14, 'Go Gold Planet', '/img/thumbs/icontest1.png', '3%', '87%', 0.00, '2023-06-01', 'Y'),
(38, 14, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '1%', '89%', 0.00, '2023-06-01', 'Y'),
(39, 14, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '12%', '78%', 0.00, '2023-06-01', 'Y'),
(40, 15, 'Go Gold Planet', '/img/thumbs/icontest1.png', '40%', '50%', 0.00, '2023-06-01', 'Y'),
(41, 15, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '50%', '40%', 0.00, '2023-06-01', 'Y'),
(42, 15, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '55%', '35%', 0.00, '2023-06-01', 'Y'),
(43, 16, 'Go Gold Planet', '/img/thumbs/icontest1.png', '36%', '54%', 0.00, '2023-06-01', 'Y'),
(44, 16, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '43%', '47%', 0.00, '2023-06-01', 'Y'),
(45, 16, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '22%', '68%', 0.00, '2023-06-01', 'Y'),
(46, 17, 'Go Gold Planet', '/img/thumbs/icontest1.png', '22%', '68%', 0.00, '2023-06-01', 'Y'),
(47, 17, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '24%', '66%', 0.00, '2023-06-01', 'Y'),
(48, 17, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '31%', '59%', 0.00, '2023-06-01', 'Y'),
(49, 18, 'Go Gold Planet', '/img/thumbs/icontest1.png', '54%', '36%', 0.00, '2023-06-01', 'Y'),
(50, 18, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '30%', '60%', 0.00, '2023-06-01', 'Y'),
(51, 18, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '58%', '32%', 0.00, '2023-06-01', 'Y'),
(52, 19, 'Go Gold Planet', '/img/thumbs/icontest1.png', '54%', '36%', 0.00, '2023-06-01', 'Y'),
(53, 19, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '30%', '60%', 0.00, '2023-06-01', 'Y'),
(54, 19, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '58%', '32%', 0.00, '2023-06-01', 'Y'),
(55, 20, 'Go Gold Planet', '/img/thumbs/icontest1.png', '54%', '36%', 0.00, '2023-06-01', 'Y'),
(56, 20, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '30%', '60%', 0.00, '2023-06-01', 'Y'),
(57, 20, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '58%', '32%', 0.00, '2023-06-01', 'Y'),
(58, 21, 'Go Gold Planet', '/img/thumbs/icontest1.png', '50%', '40%', 0.00, '2023-06-02', 'Y'),
(59, 21, 'Lucky Bunny Gold', '/img/thumbs/icontest2.png', '50%', '40%', 0.00, '2023-06-02', 'Y'),
(60, 21, 'CowBoys VS Aliens', '/img/thumbs/icontest3.png', '50%', '40%', 0.00, '2023-06-02', 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `subagent`
--

CREATE TABLE `subagent` (
  `id` bigint(20) NOT NULL,
  `id_agent` bigint(20) DEFAULT NULL,
  `ranksubAgent` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'Agent',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `contact_number` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `level` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'VVIP',
  `bettype` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '-',
  `responsibleperson` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '-',
  `created_at` timestamp NULL DEFAULT NULL,
  `last_login_date` timestamp NULL DEFAULT NULL,
  `last_login_ip` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` enum('Y','N') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'Y',
  `creditsub` float(15,2) DEFAULT 0.00,
  `status_delete` enum('Y','N') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'N',
  `currencysubagent` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'บาท'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subagent`
--

INSERT INTO `subagent` (`id`, `id_agent`, `ranksubAgent`, `username`, `password`, `name`, `contact_number`, `level`, `bettype`, `responsibleperson`, `created_at`, `last_login_date`, `last_login_ip`, `status`, `creditsub`, `status_delete`, `currencysubagent`) VALUES
(1, 1, 'Agent', 'subAgent01', '$2a$12$RNKvumGUJIeCnSjIssB8W.WYSWFzD7gwAXTSbRWrjE0LhLL6DoliS', 'hui007', '0990850209', 'VVIP', '-', '-', '2023-05-18 13:22:43', NULL, NULL, 'Y', 1000.00, 'N', 'บาท'),
(2, 2, 'Agent', 'subAgent02', '$2a$12$3TPuPaalyY5bFa.9TzPmYuVDwJbxlKvnbPUnHGOsXn7JrFJMCH6yu', 'hui04', '0838985628', 'VIP', '-', '-', '2023-05-19 07:57:01', NULL, NULL, 'Y', 35000.00, 'N', 'บาท'),
(3, 2, 'Agent', 'subAgent03', '$2a$12$TuAj5jOomr51yFjz6b52Fu2m4a.BxMgsmbqFqbpqlUHuU0Cu9T3X2', 'titan', '0897231865', 'VIP', '-', '-', '2023-05-19 13:09:06', NULL, NULL, 'Y', 300.00, 'N', 'บาท'),
(4, 1, 'Agent', 'SubAgentHui', '$2a$12$SDoEUude4tkzs4vCCLaIxehgU.LxAhHjHteo1M5Yo0vJNlU3DwkwG', 'NiranamHui', '0943169915', 'VVIP', '-', '-', '2023-05-24 15:02:52', NULL, NULL, 'Y', 600000.00, 'N', 'บาท'),
(5, 2, 'Reseller', 'KiritoSan', '$2a$12$qsHomIpiwmi2NB3osdqIluLKi6e0LH9bglyEstrIO87jUCZvTZkUm', 'asunayugi', '0990850246', 'VIP', '-', '-', '2023-05-24 15:08:01', NULL, NULL, 'Y', 600000.00, 'N', 'บาท'),
(6, 1, 'Agent', 'tyjghfhfghtfh', '$2a$12$1iYQAgZrDRwOLcUkFYsMsepO.U35alqGtx4FPoJ.iP1aQBRgyeM6a', 'Bodyslam', '0998542263', 'VIP', '-', '-', '2023-05-24 15:10:37', NULL, NULL, 'Y', 562222.00, 'N', 'บาท'),
(7, 1, 'Reseller', 'Ultraman', '$2a$12$G8Furw2tJGptIM8PdgoFyujOPILKL26qf0XkjccZgHLdsT.UG7YBy', 'Trigger', '0838985628', 'VVIP', '-', '-', '2023-05-24 15:13:43', NULL, NULL, 'Y', 42000.00, 'N', 'บาท'),
(8, 2, 'Agent', 'Supernova', '$2a$12$Du9EiKFnDYplQg2u07llKerficQUXGT96j19BHxAz0awGlJgaM.me', 'Kiba', '0838985624', 'Stater', '-', '-', '2023-05-24 18:52:15', NULL, NULL, 'Y', 56556.00, 'N', 'บาท'),
(9, 2, 'Agent', 'SupernovaMusic', '$2a$12$1lgDtd5ZmSySX0kpUkO1LOtK9SE9sdGVlj2MHHelXomhjzE5MO8oq', 'Kiba', '0838985624', 'Stater', '-', '-', '2023-05-24 18:54:51', NULL, NULL, 'Y', 56556.00, 'N', 'บาท'),
(10, 2, 'Agent', 'TaroUltraman', '$2a$12$GzxZIyRu56u8r4BkMH/LU.w96lcSGkNN6wXdgzA.cdqwzHoiTy1Fa', 'Taro', '0838985626', 'VIP', '-', '-', '2023-06-01 12:53:32', NULL, NULL, 'Y', 30000.00, 'N', 'บาท'),
(11, 2, 'Agent', 'TheFlash', '$2a$12$Dcs7qA2fVfl3oVS339vhpu6.XyMm3QM7Gyzlyz6aIiy/vOmTSjY9m', 'Flash', '0990850246', 'VIP', '-', '-', '2023-06-01 13:01:07', NULL, NULL, 'Y', 5000.00, 'N', 'บาท'),
(12, 2, 'Reseller', 'KingOrange', '$2a$12$zDUiBYErK8NH/.ZfmlaAO.86J1eeZl3STrCutODy2AVHN8ZcdADPW', 'King', '0998542263', 'Starter', '-', '-', '2023-06-01 13:07:08', NULL, NULL, 'Y', 60000.00, 'N', 'บาท'),
(13, 2, 'Agent', 'ghghghghg', '$2a$12$DQj9SaPKPreHpoy7yGSJL.IGfnsW2nRs.UWRqvXoNuqVZNNAP3bMi', 'kjkjkj', '0998542263', 'VVIP', '-', '-', '2023-06-01 13:14:22', NULL, NULL, 'Y', 3000.00, 'N', 'บาท'),
(14, 2, 'Agent', 'yhjhyjyjy', '$2a$12$9kh.WHVI0ugSNeokjTO7PeL9OIduEv4kpsw0h8O9fQutOUgP7Yz4S', 'huioo', '0838985626', 'Starter', '-', '-', '2023-06-01 13:14:22', NULL, NULL, 'Y', 50000.00, 'N', 'บาท'),
(15, 2, 'Agent', 'Ironmansaves', '$2a$12$2kBVKce.W1H6A/MzchX7z.dJ2iYsvHpymR1my4kx/7GTGzQSySoBe', 'ironman', '0897231865', 'VVIP', '-', '-', '2023-06-01 13:22:08', NULL, NULL, 'Y', 9999.00, 'N', 'บาท'),
(16, 2, 'Agent', 'Lomosonic', '$2a$12$td/Yd/EivI4/Htm/3rLzH.hj2HNkSFehPfNYkldZruz2WRM1Hzp66', 'Jetset', '0897231865', 'VIP', '-', '-', '2023-06-01 14:58:55', NULL, NULL, 'Y', 6000.00, 'N', 'บาท'),
(17, 2, 'Agent', 'OmenAcer', '$2a$12$Jv4YYiJq7EZ1Iyb.16MVc.9Mm6tBA4tn5mNnThPqc1Jf39A239cSG', 'Omen', '0838985626', 'VIP', '-', '-', '2023-06-01 15:03:26', NULL, NULL, 'Y', 60000.00, 'N', 'บาท'),
(18, 2, 'Agent', 'SamsungS1', '$2a$12$DBIW.vBbjMrQtNOxgY/M..hOTP90RoMbOd/atymMjL/ByX33lybrG', 'Samsung', '0990850246', 'VVIP', '-', '-', '2023-06-01 15:06:45', NULL, NULL, 'Y', 80000.00, 'N', 'บาท'),
(19, 1, 'Agent', 'RiderAamazons', '$2a$12$hKsEtGZ63GivHRDaD.pn/O2uMZCo0DXMHXHUHMkbhGzBBYlLuf1Y.', 'Aamazons', '0838985621', 'VIP', '-', '-', '2023-06-01 18:44:35', NULL, NULL, 'Y', 3000.00, 'N', 'บาท'),
(20, 1, 'Agent', 'niranam61106506', '$2a$12$RRq3/WydnJw0xL6syAaOwubhm.PHeq2TN6qSQl2epPaewvF/DZt2C', 'NiranamHui', '0990825942', 'VIP', '-', '-', '2023-06-01 18:48:31', NULL, NULL, 'Y', 100000.00, 'N', 'บาท'),
(21, 6, 'Agent', 'BladeBrave', '$2a$12$ODWJKEMS0oC.5GTXCQDEK.EPLiNe2AtONCtpsmYFK1KgH8B4ybK.q', 'Blade', '0897231865', 'VIP', '-', '-', '2023-06-01 18:57:09', NULL, NULL, 'Y', 60000.00, 'N', 'บาท');

-- --------------------------------------------------------
--
-- Table structure for table `user_play`
--

CREATE TABLE `user_play` (
  `id` bigint(1) NOT NULL,
  `member_id` bigint(20) DEFAULT 0,
  `game_id` bigint(20) DEFAULT 0,
  `bet` float(16,2) DEFAULT 0.00,
  `win` float(16,2) DEFAULT 0.00,
  `tiles` longtext DEFAULT NULL,
  `winline` longtext DEFAULT NULL,
  `winstyle` longtext CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `winCount` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `credit` float(15,2) DEFAULT 0.00,
  `get_browser` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `game_Buyfeespin` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'false',
  `game_feespin` enum('true','false') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'false'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_play`
--

INSERT INTO `user_play` (`id`, `member_id`, `game_id`, `bet`, `win`, `tiles`, `winline`, `winstyle`, `winCount`, `credit`, `get_browser`, `created_at`, `game_Buyfeespin`, `game_feespin`) VALUES
(1, 1, 2, 10.00, 0.00, '10,1,4,9,4,11,2,7,0,0,6,3,8,5,5', '', NULL, NULL, 9292.01, NULL, '2023-05-17 11:10:46', 'false', 'false'),
(2, 1, 2, 10.00, 33.33, '8,0,10,9,6,4,6,2,6,3,6,4,9,0,6', '3,4,11,12,19,20', NULL, NULL, 9325.34, NULL, '2023-05-17 11:10:46', 'false', 'false'),
(3, 1, 2, 10.00, 0.00, '4,0,5,8,0,5,9,10,7,10,5,6,11,1,5', '', NULL, NULL, 9325.34, NULL, '2023-05-17 11:10:46', 'false', 'false'),
(4, 1, 2, 10.00, 0.00, '1,2,5,7,11,10,6,8,7,5,12,6,5,12,11', '', NULL, NULL, 9325.34, NULL, '2023-05-17 11:10:46', 'false', 'false'),
(5, 1, 2, 10.00, 5.00, '9,12,2,5,12,7,8,4,3,12,7,8,8,3,6', '17', NULL, NULL, 9330.34, NULL, '2023-05-17 11:10:46', 'false', 'false'),
(6, 1, 2, 10.00, 0.00, '10,8,5,6,4,12,4,4,6,0,9,2,11,1,5', '', NULL, NULL, 9330.34, NULL, '2023-05-17 11:10:46', 'false', 'false'),
(7, 1, 2, 10.00, 0.00, '4,10,8,6,5,6,1,12,3,8,3,1,12,4,4', '', NULL, NULL, 9330.34, NULL, '2023-05-17 11:10:46', 'false', 'false'),
(8, 1, 2, 10.00, 0.00, '11,10,6,1,12,5,7,6,5,1,3,9,1,5,3', '', NULL, NULL, 9330.34, NULL, '2023-05-17 11:10:46', 'false', 'false'),
(9, 1, 2, 10.00, 0.00, '4,3,10,9,3,6,6,7,4,11,3,8,2,5,3', '', NULL, NULL, 9330.34, NULL, '2023-05-17 11:10:46', 'false', 'false'),
(10, 1, 2, 10.00, 0.00, '11,4,5,3,5,6,10,4,4,2,9,8,8,9,0', '', NULL, NULL, 9330.34, NULL, '2023-05-17 11:10:46', 'false', 'false'),
(11, 1, 1, 10.00, 3.33, '11,4,6,3,7,0,4,5,5,5,9,0,5,2,6', '', NULL, NULL, 9323.67, NULL, '2023-05-17 11:16:32', 'false', 'false'),
(12, 1, 1, 10.00, 4.00, '6,12,5,12,10,0,8,2,0,12,5,0,4,1,4', '2,7,13,28', NULL, NULL, 8827.67, NULL, '2023-05-17 12:11:38', 'true', 'false'),
(13, 1, 1, 10.00, 0.00, '7,10,12,9,1,5,5,6,4,6,12,10,4,7,11', '', NULL, NULL, 8827.67, NULL, '2023-05-17 12:11:38', 'true', 'false');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `agent`
--
ALTER TABLE `agent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `allgame`
--
ALTER TABLE `allgame`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comgogoldplanet`
--
ALTER TABLE `comgogoldplanet`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `commissionsubagent`
--
ALTER TABLE `commissionsubagent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gameweb`
--
ALTER TABLE `gameweb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logdaygame`
--
ALTER TABLE `logdaygame`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logedit`
--
ALTER TABLE `logedit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logeditadmin`
--
ALTER TABLE `logeditadmin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logeditagent`
--
ALTER TABLE `logeditagent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loggame`
--
ALTER TABLE `loggame`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `percentgame`
--
ALTER TABLE `percentgame`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subagent`
--
ALTER TABLE `subagent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_play`
--
ALTER TABLE `user_play`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `agent`
--
ALTER TABLE `agent`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `allgame`
--
ALTER TABLE `allgame`
  MODIFY `id` bigint(22) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `comgogoldplanet`
--
ALTER TABLE `comgogoldplanet`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `commissionsubagent`
--
ALTER TABLE `commissionsubagent`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `game`
--
ALTER TABLE `game`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `gameweb`
--
ALTER TABLE `gameweb`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `logdaygame`
--
ALTER TABLE `logdaygame`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `logedit`
--
ALTER TABLE `logedit`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `logeditadmin`
--
ALTER TABLE `logeditadmin`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `logeditagent`
--
ALTER TABLE `logeditagent`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `loggame`
--
ALTER TABLE `loggame`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `percentgame`
--
ALTER TABLE `percentgame`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `subagent`
--
ALTER TABLE `subagent`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user_play`
--
ALTER TABLE `user_play`
  MODIFY `id` bigint(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1040;
COMMIT;