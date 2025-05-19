import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { login, currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, mdp);
      // La redirection se fera automatiquement dans useEffect juste après
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Redirection automatique en fonction du rôle
  useEffect(() => {
    if (currentUser?.role === 'student') {
      navigate('/student');
    } else if (currentUser?.role === 'teacher') {
      navigate('/teacher');
    }
  }, [currentUser, navigate]);

  return (
    <Layout>
      <h1>Connexion</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={mdp}
          onChange={e => setMdp(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
    </Layout>
  );
}
