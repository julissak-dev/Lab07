import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

export default function Navbar() {
  const { user, token, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🔐 Mi App
        </Link>

        <ul className="navbar-menu">
          {/* Menú público */}
          <li><Link to="/">Inicio</Link></li>

          {/* Menú si NO está autenticado */}
          {!token && (
            <>
              <li><Link to="/login" className="btn-login">Iniciar Sesión</Link></li>
              <li><Link to="/register" className="btn-register">Registrarse</Link></li>
            </>
          )}

          {/* Menú si ESTÁ autenticado */}
          {token && (
            <>
              <li className="user-info">
                👤 Usuario ({role})
              </li>

              {/* Menú para ADMIN */}
              {role === 'admin' && (
                <>
                  <li><Link to="/admin">Panel Admin</Link></li>
                  <li><Link to="/usuarios">Gestionar Usuarios</Link></li>
                </>
              )}

              {/* Menú para MODERADOR */}
              {role === 'moderador' && (
                <>
                  <li><Link to="/moderacion">Moderación</Link></li>
                  <li><Link to="/reportes">Reportes</Link></li>
                </>
              )}

              {/* Menú para USUARIO */}
              {role === 'user' && (
                <li><Link to="/perfil">Mi Perfil</Link></li>
              )}

              {/* Menú común para autenticados */}
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
