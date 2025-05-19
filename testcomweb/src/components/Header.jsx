import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import logo from '../assets/GuiliGuiliSchool.png'; // <-- Import de l'image

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header style={{ background: '#222', padding: '10px', color: 'white', display: 'flex', alignItems: 'center' }}>
      <img src={logo} alt="logo" style={{ height: '40px', marginRight: '20px' }} />
      <nav>
        <Link to="/" style={{ color: 'white', margin: '0 10px' }}>Accueil</Link>
        {currentUser?.role === 'student' && (
          <Link to="/student" style={{ color: 'white', margin: '0 10px' }}>Mes notes</Link>
        )}
        {currentUser?.role === 'teacher' && (
          <Link to="/teacher" style={{ color: 'white', margin: '0 10px' }}>Mes classes</Link>
        )}
        {currentUser ? (
          <button onClick={() => { logout(); navigate('/'); }} style={{ marginLeft: '10px' }}>Déconnexion</button>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
