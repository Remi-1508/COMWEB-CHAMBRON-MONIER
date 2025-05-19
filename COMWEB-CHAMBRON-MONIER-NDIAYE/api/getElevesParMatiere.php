<?php
header('Content-Type: application/json');
require_once '../config.php';

$matiere_id = $_GET['matiere_id'] ?? null;

if (!$matiere_id) {
  echo json_encode(["error" => "ID matière manquant"]);
  exit;
}

$sql = "SELECT e.id, e.nom, e.prenom, n.note
        FROM eleves e
        LEFT JOIN notes n ON e.id = n.eleve_id AND n.matiere_id = ?
        WHERE n.matiere_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$matiere_id, $matiere_id]);
$eleves = $stmt->fetchAll();

echo json_encode($eleves);
?>