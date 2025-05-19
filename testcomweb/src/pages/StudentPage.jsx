import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../auth/AuthContext';

export default function StudentPage() {
  const { currentUser } = useAuth();

  return (
    <Layout>
      <div style={pageContainer}>
        <h1 style={titleStyle}>Tableau de bord élève</h1>
        <p style={subtitleStyle}>Bienvenue, {currentUser?.prenom} {currentUser?.nom} !</p>

        <div style={cardStyle}>
          <h2 style={sectionTitle}>Mes notes</h2>
          {currentUser?.notes?.length > 0 ? (
            <ul style={listStyle}>
              {currentUser.notes.map((note, idx) => (
                <li key={idx} style={listItem}>
                  <span>{note.nom_matiere}</span>
                  <span style={{ fontWeight: 'bold' }}>{note.note}/20</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune note disponible.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

const pageContainer = {
  maxWidth: '800px',
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

const listStyle = {
  listStyleType: 'none',
  padding: 0,
};

const listItem = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 0',
  borderBottom: '1px solid #ddd',
};
