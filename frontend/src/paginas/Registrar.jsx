import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Registrar.css';
import logo from '../assets/logo-principal.png';

const Registrar = () => {
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("usuario").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("http://localhost:8000/usuarios/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          password,
          es_admin: false
        }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/");
      } else {
        if (Array.isArray(data.detail)) {
          setMensaje(data.detail.map(err => `${err.loc.join('.')} - ${err.msg}`).join(', '));
        } else {
          setMensaje(data.detail || JSON.stringify(data));
        }
      }
    } catch (err) {
      setMensaje("Error de conexión con el backend");
    }
  };

  return (
    <div className="registrar-container">
      <div className="registrar-image">
        <img src={logo} alt="Logo grande" />
        <p></p>
      </div>

      <div className="registrar-form">
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="usuario">Usuario:</label>
            <input type="text" id="usuario" placeholder="Usuario" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" placeholder="Contraseña" required />
          </div>
          <button type="submit">Registrarse</button>
        </form>

        {mensaje && <p>{mensaje}</p>}

        <p>¿Ya tienes cuenta? <Link to="/" className="login-link">Iniciar sesión</Link></p>
      </div>
    </div>
  );
};

export default Registrar;
