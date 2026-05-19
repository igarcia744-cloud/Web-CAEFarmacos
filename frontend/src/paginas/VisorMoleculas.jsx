import React, { useEffect, useState } from "react";
import SelectorExploradorModal from "../componentes/modales/SelectorExploradorModal";
import "../css/Dashboard.css";
import "../css/VisorMoleculas.css"
import { useNavigate } from "react-router-dom";

function VisorMoleculas() {

  const [appletHtml, setAppletHtml] = useState("");
  const [applet, setApplet] = useState(null);
  const [mostrarSelector, setMostrarSelector] = useState(false);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    if (!window.Jmol) {
      console.error("JSmol no cargado");
      return;
    }

    window.Jmol.setDocument(0);

    const Info = {
      width: "100%",
      height: "100%",
      use: "HTML5",
      j2sPath: "/jsmol/j2s",
    };

    const app = window.Jmol.getApplet("visorPrincipal", Info);

    setApplet(app);
    setAppletHtml(window.Jmol.getAppletHtml(app));

  }, []);

  const cargarMolecula = async (archivo) => {

  if (!archivo || !applet) {
    console.log("Falta archivo o applet");
    return;
  }

  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const url = `${API_URL}/archivo_mol/compuesto/${archivo.id}`;

  try {

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error("No autorizado o error en la petición");
    }

    let data = await res.text();

    data = data
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n");

    const script = `
      load inline "${data}";
      select all;
      spacefill 23%;
      wireframe 0.15;
      zoom 120;
      center;
    `;

    window.Jmol.script(applet, script);

    setArchivoSeleccionado(archivo);

  } catch (error) {
    console.error("Error cargando molécula:", error);
  }
};

  return (
    <div className="dashboard-container">

      <div className="dashboard-content">

        <h2 style={{ color: "#438e23", marginBottom: "20px" }}>
          Visor de Moléculas
        </h2>

        <div className="visor-controles">

        <button onClick={() => navigate("/dashboard")}>
            ⬅ Volver
        </button>

        <button onClick={() => window.location.reload()}>
          Recargar
        </button>

        <button onClick={() => setMostrarSelector(true)}>
            Seleccionar archivo
        </button>

        {archivoSeleccionado && (
            <span style={{ color: "#aaa" }}>
            {archivoSeleccionado.nombre}
            </span>
        )}

        </div>

        <div className="visor-container">

            <div className="visor-box">

                <div
                className="visor-jmol"
                dangerouslySetInnerHTML={{ __html: appletHtml }}
                />

            </div>

        </div>

      </div>

      {mostrarSelector && (
        <SelectorExploradorModal
          onClose={() => setMostrarSelector(false)}
          onCargar={(archivo) => {
            setMostrarSelector(false);
            cargarMolecula(archivo);
          }}
        />
      )}

    </div>
  );
}

export default VisorMoleculas;
