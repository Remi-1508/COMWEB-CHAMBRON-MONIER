-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 07 mai 2025 à 10:17
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
-- Base de données : `projetcomweb`
--

-- --------------------------------------------------------

--
-- Structure de la table `classes`
--

CREATE TABLE `classes` (
  `id_classe` int(11) NOT NULL,
  `nom_classe` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `eleve_classes`
--

CREATE TABLE `eleve_classes` (
  `id_eleve` int(11) NOT NULL,
  `id_classe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `matieres`
--

CREATE TABLE `matieres` (
  `id_matiere` int(11) NOT NULL,
  `nom_matiere` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

CREATE TABLE `notes` (
  `id_note` int(11) NOT NULL,
  `valeur` float NOT NULL,
  `date_note` date NOT NULL,
  `id_prof` int(11) NOT NULL,
  `id_eleve` int(11) NOT NULL,
  `id_matiere` int(11) NOT NULL,
  `id_classe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `professeurs_matieres`
--

CREATE TABLE `professeurs_matieres` (
  `id_prof` int(11) NOT NULL,
  `id_matiere` int(11) NOT NULL,
  `id_classe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id_utilisateur` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `role` enum('eleve','professeur') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id_classe`);

--
-- Index pour la table `eleve_classes`
--
ALTER TABLE `eleve_classes`
  ADD KEY `id_eleve` (`id_eleve`),
  ADD KEY `id_classe` (`id_classe`);

--
-- Index pour la table `matieres`
--
ALTER TABLE `matieres`
  ADD PRIMARY KEY (`id_matiere`);

--
-- Index pour la table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id_note`),
  ADD KEY `id_prof` (`id_prof`),
  ADD KEY `id_eleve` (`id_eleve`),
  ADD KEY `id_matiere` (`id_matiere`),
  ADD KEY `id_classe` (`id_classe`);

--
-- Index pour la table `professeurs_matieres`
--
ALTER TABLE `professeurs_matieres`
  ADD KEY `id_prof` (`id_prof`),
  ADD KEY `id_matiere` (`id_matiere`),
  ADD KEY `id_classe` (`id_classe`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id_utilisateur`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `classes`
--
ALTER TABLE `classes`
  MODIFY `id_classe` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `matieres`
--
ALTER TABLE `matieres`
  MODIFY `id_matiere` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `notes`
--
ALTER TABLE `notes`
  MODIFY `id_note` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id_utilisateur` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
