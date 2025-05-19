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
      background: '#2660B8', 
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


const navButtonStyle = {
  background: '#2660B8', 
  border: '1px solid #FFFFFF', 
  borderRadius: '6px',
  padding: '6px 14px',
  color: '#fff',
  fontWeight: 'bold',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'background 0.3s ease',
};

export default Header;
