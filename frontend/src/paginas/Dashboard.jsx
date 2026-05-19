import React, { useState, useRef, useEffect } from "react";
import "../css/Dashboard.css";
import logo from "../assets/logo-principal.png";
import { useNavigate } from "react-router-dom";

import ModalListarLibrerias from "../componentes/modales/ModalListarLibrerias";

import ModalListarCompuestos from "../componentes/modales/ModalListarCompuestos";

import ModalCrearEtiqueta from "../componentes/modales/ModalCrearEtiqueta";
import ModalListarEtiquetas from "../componentes/modales/ModalListarEtiquetas";

import ModalSubirZip from "../componentes/modales/ModalSubirZip";
import ModalSubirMol2 from "../componentes/modales/ModalSubirMol2";

import ExploradorArchivos from "../componentes/ExploradorArchivos";
import FiltrosExplorador from "../componentes/FiltrosExplorador";

import TablaDatos from "../componentes/TablaDatos";
import FiltrosTabla from "../componentes/FiltrosTabla"

import ModalLog from "../componentes/modales/ModalLog";

const Dashboard = () => {

  const navigate = useNavigate();

  const [menuEtiquetas, setMenuEtiquetas] = useState(false);
  const [menuUpload, setMenuUpload] = useState(false);

  const etiquetasRef = useRef(null);
  const uploadRef = useRef(null);

  const [modalLibrerias, setModalLibrerias] = useState(false);

  const [modalCompuestos, setModalCompuestos] = useState(false);

  const [modalCrearEtiqueta, setModalCrearEtiqueta] = useState(false);
  const [modalListarEtiquetas, setModalListarEtiquetas] = useState(false);

  const [modalZip, setModalZip] = useState(false);
  const [modalMol2, setModalMol2] = useState(false);

  const [vista, setVista] = useState("tabla");

  const [filtrosExplorador, setFiltrosExplorador] = useState({
    busqueda: "",
    orden: "nombre_asc"
  });

  const [filtrosTabla, setFiltrosTabla] = useState({
    mostrarLibrerias: true,
    mostrarCompuestos: true,
    busquedaLibrerias: "",
    busquedaCompuestos: "",
    etiquetas: [],
    orden: "nombre_asc",

    filtroTipo: "",
    filtroNombreLibreria: "",
    minCompuestos: 0,
    maxCompuestos: 100,
    filtroUsuario: ""
  });

  const [mostrarLog, setMostrarLog] = useState(false);


  useEffect(() => {

    function handleClickOutside(event) {

      if (
        etiquetasRef.current &&
        !etiquetasRef.current.contains(event.target)
      ) {
        setMenuEtiquetas(false);
      }

      if (
        uploadRef.current &&
        !uploadRef.current.contains(event.target)
      ) {
        setMenuUpload(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  const [nombreUsuario, setNombreUsuario] = useState("");

  useEffect(() => {
    const nombre = localStorage.getItem("nombre");

    if (nombre) {
      setNombreUsuario(nombre);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("nombre");

    navigate("/"); 
  };

  return (
    <div className="dashboard">

      <header className="dashboard-header">

        <div className="logo-container">
          <img src={logo} alt="logo"/>
        </div>

        <nav className="nav-menu">

          <button className="nav-item" onClick={()=>setModalLibrerias(true)}>
            Compuestos
          </button>

          <button className="nav-item" onClick={() => setModalCompuestos(true)}>
            Conformaciones
          </button>

          <div className="dropdown" ref={etiquetasRef}>

            <button
              className="nav-item"
              onClick={() => {
                setMenuEtiquetas(!menuEtiquetas);
                setMenuUpload(false);
              }}
            >
              Etiquetas ▼
            </button>

            {menuEtiquetas && (
              <div className="dropdown-menu">
                <button onClick={() => setModalCrearEtiqueta(true)}>
                  Crear etiqueta
                </button>
                <button onClick={() => setModalListarEtiquetas(true)}>
                  Listar etiquetas
                </button>
              </div>
            )}

          </div>

          <div className="dropdown" ref={uploadRef}>

            <button
              className="nav-item"
              onClick={() => {
                setMenuUpload(!menuUpload);
                setMenuEtiquetas(false);
              }}
            >
              Subir archivo ▼
            </button>

            {menuUpload && (
              <div className="dropdown-menu">
                <button onClick={()=>setModalZip(true)}>
                  Subir .zip
                </button>

                <button onClick={()=>setModalMol2(true)}>
                  Subir .mol2
                </button>
              </div>
            )}

          </div> 

          <button 
            className="nav-item"
            onClick={() => navigate("/visor")}
          >
            Visor de Moléculas
          </button>    

          <button 
            className="nav-item"
            onClick={() => setMostrarLog(true)}
          >
            Log
          </button>  

        </nav>

        <div className="usuario">
          {nombreUsuario} | 
          <span 
            onClick={handleLogout} 
            style={{ cursor: "pointer" }}
          >
            Salir
          </span>
        </div>

      </header>
      
      <div className="dashboard-main">

        <div className="sidebar">

          <h2>Filtro</h2>

          <div className="sidebar-section">

            <p className="sidebar-title">Muestreo de Datos</p>

            <div
              className={`sidebar-item ${vista === "explorador" ? "active" : ""}`}
              onClick={() => setVista("explorador")}
            >
              Explorador de Archivos
            </div>

            <div
              className={`sidebar-item ${vista === "tabla" ? "active" : ""}`}
              onClick={() => setVista("tabla")}
            >
              Tabla
            </div>

          </div>

          {vista === "explorador" && (
            <FiltrosExplorador
              filtros={filtrosExplorador}
              setFiltros={setFiltrosExplorador}
            />
          )}

          {vista === "tabla" && (
            <FiltrosTabla
              filtros={filtrosTabla}
              setFiltros={setFiltrosTabla}
            />
          )}

        </div>

        <div className="dashboard-content">

          {vista === "tabla" && (
            <TablaDatos filtros={filtrosTabla} />
          )}

          {vista === "explorador" && (
            <ExploradorArchivos filtros={filtrosExplorador} modo="normal"/>
          )}

        </div>

      </div>



      <ModalListarLibrerias
        isOpen={modalLibrerias}
        onClose={()=>setModalLibrerias(false)}
      />

      <ModalListarCompuestos
        isOpen={modalCompuestos}
        onClose={() => setModalCompuestos(false)}
      />

      <ModalCrearEtiqueta
        isOpen={modalCrearEtiqueta}
        onClose={() => setModalCrearEtiqueta(false)}
      />

      <ModalListarEtiquetas
        isOpen={modalListarEtiquetas}
        onClose={() => setModalListarEtiquetas(false)}
      />

      <ModalSubirZip
        isOpen={modalZip}
        onClose={()=>setModalZip(false)}
      />

      <ModalSubirMol2
        isOpen={modalMol2}
        onClose={()=>setModalMol2(false)}
      />

      <ModalLog
        isOpen={mostrarLog}
        onClose={() => setMostrarLog(false)}
      />
      
    </div>
  );
};

export default Dashboard;
