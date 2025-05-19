<?php
// ⚠️ Pour le développement uniquement : Affiche les erreurs PHP
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// En-têtes CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

function envoiJSON($tab) {
    header('Content-Type: application/json');
    echo json_encode($tab, JSON_UNESCAPED_UNICODE);
}

function connexionBDD() {
    $host = 'localhost';
    $dbname = 'gestion_notes';
    $username = 'root';
    $password = '';

    try {
        return new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    } catch (Exception $e) {
        die('Erreur : ' . $e->getMessage());
    }
}

function verifierEleve($pdo, $email, $mdp) {
    $sql = "SELECT * FROM eleves WHERE email = :email AND mot_de_passe = :mdp";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $email, 'mdp' => $mdp]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function recupererNotes($pdo, $eleve_id) {
    $sql = "SELECT matieres.nom_matiere, notes.note 
            FROM notes 
            JOIN matieres ON notes.matiere_id = matieres.id 
            WHERE notes.eleve_id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $eleve_id]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function verifierProf($pdo, $email, $mdp) {
    $sql = "SELECT * FROM professeurs WHERE email = :email AND mot_de_passe = :mdp";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $email, 'mdp' => $mdp]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function recupererMatieresEtEleves($pdo, $prof_id) {
    // On récupère les matières enseignées par ce prof via la table de liaison "enseignements"
    $sqlMatieres = "
        SELECT m.id, m.nom_matiere
        FROM matieres m
        JOIN enseignements e ON e.matiere_id = m.id
        WHERE e.professeur_id = ?
    ";
    $stmt = $pdo->prepare($sqlMatieres);
    $stmt->execute([$prof_id]);
    $matieres = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($matieres as &$matiere) {
        // Récupère les élèves et leurs notes pour cette matière
        $sqlEleves = "
            SELECT e.id, e.nom, e.prenom, n.note
            FROM eleves e
            LEFT JOIN notes n ON n.eleve_id = e.id AND n.matiere_id = ?
        ";
        $stmtEleves = $pdo->prepare($sqlEleves);
        $stmtEleves->execute([$matiere['id']]);
        $matiere['eleves'] = $stmtEleves->fetchAll(PDO::FETCH_ASSOC);
    }

    return $matieres;
}

// ---------- POINT D’ENTRÉE ----------
if (empty($_GET['email']) || empty($_GET['mot_de_passe'])) {
    envoiJSON(["statut" => "erreur", "message" => "Paramètres manquants"]);
    exit;
}

$email = $_GET['email'];
$mdp = $_GET['mot_de_passe'];
$pdo = connexionBDD();

$eleve = verifierEleve($pdo, $email, $mdp);
if ($eleve) {
    $notes = recupererNotes($pdo, $eleve['id']);
    envoiJSON([
        "statut" => "ok",
        "role" => "student",
        "eleve" => $eleve,
        "notes" => $notes
    ]);
    exit;
}

// 🔧 ✅ AJOUT MANQUANT ICI
$prof = verifierProf($pdo, $email, $mdp);
if ($prof) {
    $matieres = recupererMatieresEtEleves($pdo, $prof['id']);
    envoiJSON([
        "statut" => "ok",
        "role" => "teacher",
        "prof" => $prof,
        "matieres" => $matieres
    ]);
    exit;
}

// ❌ Rien trouvé
envoiJSON(["statut" => "erreur", "message" => "Identifiants incorrects"]);
?>