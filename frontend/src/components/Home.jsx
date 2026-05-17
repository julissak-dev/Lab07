import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

export default function Home() {
  const { user, token, role } = useAuth();

  return (
    <div className="home-container">
      <h1>Bienvenido a Mi App</h1>
      
      {!token ? (
        <div className="home-guest">
          <p>Por favor, inicia sesión o regístrate para acceder a todas las funciones.</p>
          <div className="buttons">
            <a href="/login" className="btn btn-primary">Iniciar Sesión</a>
            <a href="/register" className="btn btn-secondary">Registrarse</a>
          </div>
        </div>
      ) : (
        <div className="home-user">
          <div className="user-card">
            <h2>Información del Usuario</h2>
            <p><strong>Rol:</strong> {role === 'admin' ? 'Administrador' : role === 'moderador' ? 'Moderador' : 'Usuario'}</p>
            <p><strong>Estado:</strong> ✅ Autenticado</p>
          </div>

          {role === 'admin' && (
            <div className="role-section">
              <h3>🔧 Panel del Administrador</h3>
              <p>Tienes acceso completo a todas las funciones del sistema.</p>
              <ul>
                <li>Gestión de usuarios</li>
                <li>Configuración del sistema</li>
                <li>Reportes</li>
              </ul>
            </div>
          )}

          {role === 'moderador' && (
            <div className="role-section">
              <h3>⚖️ Panel del Moderador</h3>
              <p>Puedes moderar contenido y generar reportes.</p>
              <ul>
                <li>Moderar contenido</li>
                <li>Ver reportes</li>
                <li>Gestionar usuarios reportados</li>
              </ul>
            </div>
          )}

          {role === 'user' && (
            <div className="role-section">
              <h3>👤 Mi Área</h3>
              <p>Acceso a tu perfil y funciones básicas.</p>
              <ul>
                <li>Ver perfil</li>
                <li>Editar información</li>
                <li>Ver mi contenido</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
