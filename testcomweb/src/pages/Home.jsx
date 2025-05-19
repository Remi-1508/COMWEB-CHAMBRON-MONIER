import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { login, currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const [role, setRole] = useState('student'); // par défaut Élève
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, mdp, role); // Assure-toi que `login` accepte aussi `role` si nécessaire
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (currentUser?.role === 'student') {
      navigate('/student');
    } else if (currentUser?.role === 'teacher') {
      navigate('/teacher');
    }
  }, [currentUser, navigate]);

  return (
    <Layout>
      <div style={containerStyle}>
        <form onSubmit={handleLogin} style={formCard}>
          <h2 style={titleStyle}>Connexion</h2>
          {error && <p style={errorStyle}>{error}</p>}
          <input
            type="email"
            placeholder="Identifiant"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={mdp}
            onChange={e => setMdp(e.target.value)}
            required
            style={inputStyle}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={inputStyle}
          >
            <option value="student">Élève</option>
            <option value="teacher">Professeur</option>
          </select>
          <button type="submit" style={buttonStyle}>Se connecter</button>
        </form>
      </div>
    </Layout>
  );
}

// 💅 STYLES
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '70vh',
};

const formCard = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const titleStyle = {
  textAlign: 'center',
  color: '#2660B8',
  marginBottom: '10px',
};

const inputStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontSize: '16px',
  outline: 'none',
  transition: 'border 0.2s ease-in-out',
};

const buttonStyle = {
  padding: '12px',
  border: '1px #2660B8',
  borderRadius: '8px',
  backgroundColor: '#2660B8',
  color: 'white',
  fontSize: '16px',
  cursor: 'pointer',
};

const errorStyle = {
  color: 'red',
  fontSize: '14px',
  textAlign: 'center',
};
