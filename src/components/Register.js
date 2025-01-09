import React, { useState } from 'react';
import '../styles.css'; // Cambia la ruta según la estructura correcta

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('Las contraseñas no coinciden');
      return;
    }
    // Lógica de registro
  };

  return (
    <div className="register-container">
      <header className="register-header">
      <img src="/images/logo.png" alt="Logo" className="inicio-logo" />
      <h1>Crear cuenta</h1>
      </header>
      <form onSubmit={handleSubmit} className="register-form">
        
        <input
          type="nombre"
          placeholder="Nombre"
          value={email}
          onChange={(e) => setNombre(e.target.value)}
          className="register-input"
          />
        <input
          type="email"
          placeholder="Email"
          value={password}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="register-input"
        />
        <button type="submit" className="register-button">Registrarse</button>
      </form>
      <div className="register-footer">
        <a href="/login" className="footer-link">¿Ya tienes cuenta? Inicia sesión</a>
      </div>
    </div>
  );
}

export default Register;
