import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import logo from '../assets/GuiliGuiliSchool.png';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{
      background: '#2660B8', // Bleu plus foncé pastel
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Logo + titre */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="logo" style={{ height: '40px', marginRight: '10px' }} />
        <h2 style={{ margin: 0, fontSize: '20px', color: '#fff' }}>Gestion des Notes</h2>
      </div>

      {/* Boutons à droite */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {!currentUser && (
          <Link to="/" style={navButtonStyle}>Connexion</Link>
        )}

        {currentUser?.role === 'student' && (
          <>
            <Link to="/student" style={navButtonStyle}>Mes Notes</Link>
            <button onClick={handleLogout} style={navButtonStyle}>Déconnexion</button>
          </>
        )}

        {currentUser?.role === 'teacher' && (
          <>
            <Link to="/teacher" style={navButtonStyle}>Gestion Notes</Link>
            <button onClick={handleLogout} style={navButtonStyle}>Déconnexion</button>
          </>
        )}
      </div>
    </header>
  );
};

// Nouveau style des boutons
const navButtonStyle = {
  background: '#2660B8', // même bleu que le header
  border: '1px solid #FFFFFF', // bleu foncé très fin
  borderRadius: '6px',
  padding: '6px 14px',
  color: '#fff',
  fontWeight: 'bold',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'background 0.3s ease',
};

export default Header;
