import React from 'react';
import { useAuth } from '../auth/AuthContext';
import Layout from '../components/Layout';

export default function TeacherPage() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <Layout>
        <p>Chargement...</p>
      </Layout>
    );
  }

  // Protéger contre l'absence de données
  const matieres = currentUser.matieres || [];

  return (
    <Layout>
      <h1>Page Enseignant</h1>

      {matieres.length === 0 ? (
        <p>Vous n’enseignez aucune matière.</p>
      ) : (
        matieres.map((matiere) => (
          <div key={matiere.id} style={{ marginBottom: '20px' }}>
            <h2>{matiere.nom_matiere}</h2>
            <h3>Liste des élèves :</h3>
            {matiere.eleves && matiere.eleves.length > 0 ? (
              <ul>
                {matiere.eleves.map((eleve) => (
                  <li key={eleve.id}>
                    {eleve.nom} {eleve.prenom} - Note : {eleve.note ?? 'N/A'}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun élève inscrit pour cette matière.</p>
            )}
          </div>
        ))
      )}
    </Layout>
  );
}
