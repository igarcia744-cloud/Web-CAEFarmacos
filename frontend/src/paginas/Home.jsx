import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-principal.png';
import '../css/Home.css';
import '../css/App.css';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const formData = new URLSearchParams();
      formData.append("username", email);  
      formData.append("password", password);

      const res = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {

        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('nombre', data.nombre);

        navigate('/dashboard');

      } else {

        if (Array.isArray(data.detail)) {
          setMensaje(
            data.detail.map(err => `${err.loc.join('.')} - ${err.msg}`).join(', ')
          );
        } else {
          setMensaje(data.detail || JSON.stringify(data));
        }

      }

    } catch (err) {
      setMensaje('Error de conexión con el backend');
    }
  };

  return (
    <div className="home-container">
      <div className="home-image">
        <img src={logo} alt="Logo grande" />
        <p></p>
      </div>

      <div className="home-form">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <button type="submit">Entrar</button>
        </form>

        {mensaje && <p style={{ color: 'red' }}>{mensaje}</p>}

        <p>
          ¿No tienes cuenta? <Link to="/registrar" className="register-link">Regístrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
