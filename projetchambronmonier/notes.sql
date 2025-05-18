-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 16 mai 2025 à 16:37
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_notes`
--

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `eleve_id` int(11) DEFAULT NULL,
  `matiere_id` int(11) DEFAULT NULL,
  `note` decimal(4,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notes`
--

INSERT INTO `notes` (`id`, `eleve_id`, `matiere_id`, `note`) VALUES
(1, 1, 1, 13.00),
(2, 1, 2, 17.00),
(3, 1, 3, 8.00),
(4, 1, 4, 14.00),
(5, 1, 5, 19.00),
(6, 1, 6, 11.00),
(7, 2, 1, 7.00),
(8, 2, 2, 16.00),
(9, 2, 3, 4.00),
(10, 2, 4, 12.00),
(11, 2, 5, 15.00),
(12, 2, 6, 9.00),
(13, 3, 1, 20.00),
(14, 3, 2, 3.00),
(15, 3, 3, 18.00),
(16, 3, 4, 2.00),
(17, 3, 5, 10.00),
(18, 3, 6, 6.00),
(19, 4, 1, 5.00),
(20, 4, 2, 14.00),
(21, 4, 3, 11.00),
(22, 4, 4, 0.00),
(23, 4, 5, 16.00),
(24, 4, 6, 7.00),
(25, 5, 1, 8.00),
(26, 5, 2, 6.00),
(27, 5, 3, 19.00),
(28, 5, 4, 3.00),
(29, 5, 5, 12.00),
(30, 5, 6, 1.00),
(31, 6, 1, 17.00),
(32, 6, 2, 4.00),
(33, 6, 3, 10.00),
(34, 6, 4, 15.00),
(35, 6, 5, 2.00),
(36, 6, 6, 20.00);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eleve_id` (`eleve_id`),
  ADD KEY `matiere_id` (`matiere_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`eleve_id`) REFERENCES `eleves` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`matiere_id`) REFERENCES `matieres` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
