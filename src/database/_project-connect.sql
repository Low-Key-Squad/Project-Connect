-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 18 Kwi 2023, 20:15
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: ` project-connect`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `chat`
--

CREATE TABLE `chat` (
  `chat_id` int(10) NOT NULL,
  `correspondent_1` int(10) NOT NULL,
  `correspondent_2` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `match`
--

CREATE TABLE `match` (
  `match_id` int(10) NOT NULL,
  `first_user_id` int(10) NOT NULL,
  `second_user_id` int(10) NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `messages`
--

CREATE TABLE `messages` (
  `message_id` int(10) NOT NULL,
  `sender_id` int(10) NOT NULL,
  `receiver_id` int(10) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `preferences`
--

CREATE TABLE `preferences` (
  `preference_id` int(10) NOT NULL,
  `profile_id` int(10) NOT NULL,
  `gender` text NOT NULL,
  `age_range_min` int(2) NOT NULL,
  `age_range_max` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `profile`
--

CREATE TABLE `profile` (
  `profile_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `name` int(15) NOT NULL,
  `birth_date` date NOT NULL,
  `pictures` blob NOT NULL,
  `gender` text NOT NULL,
  `description` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `user_id` int(10) NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`chat_id`),
  ADD KEY `correspondent_1` (`correspondent_1`),
  ADD KEY `correspondent_2` (`correspondent_2`);

--
-- Indeksy dla tabeli `match`
--
ALTER TABLE `match`
  ADD PRIMARY KEY (`match_id`),
  ADD KEY `first_user_id` (`first_user_id`),
  ADD KEY `second_user_id` (`second_user_id`);

--
-- Indeksy dla tabeli `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indeksy dla tabeli `preferences`
--
ALTER TABLE `preferences`
  ADD PRIMARY KEY (`preference_id`),
  ADD KEY `profile_id` (`profile_id`);

--
-- Indeksy dla tabeli `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`profile_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`correspondent_1`) REFERENCES `match` (`first_user_id`),
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`correspondent_2`) REFERENCES `match` (`second_user_id`);

--
-- Ograniczenia dla tabeli `match`
--
ALTER TABLE `match`
  ADD CONSTRAINT `match_ibfk_1` FOREIGN KEY (`first_user_id`) REFERENCES `profile` (`profile_id`),
  ADD CONSTRAINT `match_ibfk_3` FOREIGN KEY (`second_user_id`) REFERENCES `profile` (`profile_id`);

--
-- Ograniczenia dla tabeli `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`receiver_id`) REFERENCES `chat` (`correspondent_1`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `chat` (`correspondent_2`),
  ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`sender_id`) REFERENCES `chat` (`correspondent_1`),
  ADD CONSTRAINT `messages_ibfk_4` FOREIGN KEY (`sender_id`) REFERENCES `chat` (`correspondent_2`);

--
-- Ograniczenia dla tabeli `preferences`
--
ALTER TABLE `preferences`
  ADD CONSTRAINT `preferences_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`profile_id`);

--
-- Ograniczenia dla tabeli `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
