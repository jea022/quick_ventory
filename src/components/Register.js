import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { CContainer, CRow, CCol, CForm, CFormInput, CButton, CAlert } from '@coreui/react';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        nombre,
        email
      });
      navigate('/'); // Redirige al inicio después de registrarse
    } catch (error) {
      setError('Error al registrarse. Inténtalo de nuevo.');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirige a la página de inicio de sesión
  };

  return (
    <CContainer>
      <CRow>
        <CCol>
          <h1>Crear cuenta</h1>
          {error && <CAlert color="danger">{error}</CAlert>}
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <CFormInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CFormInput
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CFormInput
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <CButton type="submit" color="primary">Registrar</CButton>
          </CForm>
          <p className="login-redirect">
            ¿Ya tienes cuenta? <CButton color="link" onClick={handleLoginRedirect}>Inicia sesión aquí</CButton>
          </p>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Register;