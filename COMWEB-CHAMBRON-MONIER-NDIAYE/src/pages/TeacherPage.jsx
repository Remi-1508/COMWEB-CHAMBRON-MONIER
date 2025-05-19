import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import Layout from '../components/Layout';

export default function TeacherPage() {
  const { currentUser } = useAuth();
  const matieres = currentUser?.matieres || [];

  
  const [openMatiereIds, setOpenMatiereIds] = useState([]);

  const toggleMatiere = (id) => {
    setOpenMatiereIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Layout>
      <div style={pageContainer}>
        <h1 style={titleStyle}>Tableau de bord enseignant</h1>
        <p style={subtitleStyle}>Bienvenue, {currentUser?.prenom} {currentUser?.nom} !</p>

        <div style={cardStyle}>
          <h2 style={sectionTitle}>Gestion des notes</h2>

          {matieres.length === 0 ? (
            <p>Vous n’enseignez aucune matière.</p>
          ) : (
            matieres.map((matiere) => (
              <div key={matiere.id} style={accordionContainer}>
                <button onClick={() => toggleMatiere(matiere.id)} style={accordionButton}>
                  {matiere.nom_matiere}
                  <span style={{ float: 'right' }}>{openMatiereIds.includes(matiere.id) ? '▲' : '▼'}</span>
                </button>

                {openMatiereIds.includes(matiere.id) && (
                  <div style={accordionContent}>
                    {matiere.eleves && matiere.eleves.length > 0 ? (
                      <ul style={listStyle}>
                        {matiere.eleves.map((eleve) => (
                          <li key={eleve.id} style={listItem}>
                            <span>{eleve.nom} {eleve.prenom}</span>
                            <span style={{ fontWeight: 'bold' }}>{eleve.note ?? 'N/A'}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Aucun élève inscrit pour cette matière.</p>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

const pageContainer = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '20px',
};

const titleStyle = {
  fontSize: '28px',
  marginBottom: '10px',
  color: '#2660B8',
};

const subtitleStyle = {
  fontSize: '18px',
  marginBottom: '25px',
  color: '#555',
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

const sectionTitle = {
  fontSize: '22px',
  marginBottom: '15px',
  color: '#2660B8',
};

const accordionContainer = {
  marginBottom: '15px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflow: 'hidden',
};

const accordionButton = {
  width: '100%',
  padding: '12px 16px',
  background: '#f1f1f1',
  border: 'none',
  textAlign: 'left',
  fontSize: '16px',
  cursor: 'pointer',
  outline: 'none',
  fontWeight: 'bold',
};

const accordionContent = {
  padding: '10px 16px',
  backgroundColor: '#fff',
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
};

const listItem = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 0',
  borderBottom: '1px solid #eee',
};
