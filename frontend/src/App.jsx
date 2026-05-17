import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rutas protegidas - por implementar */}
          <Route path="/admin" element={<div style={{padding: '2rem', textAlign: 'center'}}><h1>Panel Admin</h1></div>} />
          <Route path="/moderacion" element={<div style={{padding: '2rem', textAlign: 'center'}}><h1>Panel Moderador</h1></div>} />
          <Route path="/perfil" element={<div style={{padding: '2rem', textAlign: 'center'}}><h1>Mi Perfil</h1></div>} />
          <Route path="/dashboard" element={<div style={{padding: '2rem', textAlign: 'center'}}><h1>Dashboard</h1></div>} />
          
          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
