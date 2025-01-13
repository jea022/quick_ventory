import React, { useState } from 'react';
import '../styles.css'; // Cambia la ruta según la estructura correcta

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getfirestore();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticación
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <img src="/images/logo.png" alt="Logo" className="inicio-logo" />
        <h1>Iniciar sesión</h1>
      </header>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Iniciar sesión</button>
      </form>
      <div className="login-footer">
        <a href="/register" className="footer-link">¿No tienes cuenta? Regístrate</a>
      </div>
    </div>
  );
}

export default Login;
