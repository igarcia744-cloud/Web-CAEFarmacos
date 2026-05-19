import React, { useState, useEffect } from "react";
import api from "../api/api";
import "../css/Explorador.css";

import archivoIcono from "../assets/Archivo-tipo-MOL2.png";
import carpetaIcono from "../assets/Icono-de-carpeta.png";

function ExploradorArchivos({ filtros, modo = "normal", onSelect }) {

  const [ruta, setRuta] = useState(["compuestos"]);
  const [datos, setDatos] = useState([]);

  useEffect(() => {

        const cargarDatos = async () => {
            try {

            const rutaString = ruta.join("/");
            const res = await api.get(`/explorador?ruta=${rutaString}`);

            setDatos(res.data);

            } catch (error) {
            console.error(error);
            }
        };

        cargarDatos();

    }, [ruta]);

  const irAtras = () => {
    if (ruta.length > 1) {
      setRuta(ruta.slice(0, -1));
    }
  };

  const abrir = (item) => {
    if (item.tipo === "carpeta") {
      setRuta([...ruta, item.nombre]);
    }
  };

  const descargar = async (item) => {

    try {

        const tipo = item.tipo === "carpeta" ? "libreria" : "compuesto";

        const res = await api.get(`/download/${tipo}/${item.id}`, {
        responseType: "blob"
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");

        let nombreArchivo = item.nombre;

        if (item.tipo === "carpeta") {
        nombreArchivo += ".zip";
        }

        link.href = url;
        link.setAttribute("download", nombreArchivo);

        document.body.appendChild(link);
        link.click();

    } catch (error) {
        console.error(error);
    }

    };

    const [busqueda, setBusqueda] = useState("");

    let datosFiltrados = datos.filter(item =>
    item.nombre.toLowerCase().includes(
        (modo === "seleccion" ? busqueda : filtros.busqueda || "").toLowerCase()
    )
    );

    if (filtros.orden === "nombre_asc") {
    datosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    if (filtros.orden === "nombre_desc") {
    datosFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }

  return (

        <div className="explorador-container">
            
            <h2>Explorador de Archivos</h2>

            <div className="explorador-header">

            <button className="explorador-back" onClick={irAtras}>
                ⬅
            </button>

            <div className="ruta">
                {ruta.join(" / ")}
            </div>

            </div>

            {modo === "seleccion" && (
                <div className="explorador-busqueda">
                <input
                    type="text"
                    placeholder="🔍 Buscar archivo o carpeta..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                </div>
            )}

            <div className="explorador-grid">

            {datosFiltrados.map(item => (

                <div
                    key={item.id}
                    className="explorador-item"
                    onDoubleClick={() => abrir(item)}
                >

                    <img
                    src={item.tipo === "carpeta" ? carpetaIcono : archivoIcono}
                    alt="icono"
                    className="explorador-icono"
                    />

                    <p>{item.nombre}</p>

                    {modo === "normal" && (
                      <button onClick={() => descargar(item)}>
                        Descargar
                      </button>
                    )}

                    {modo === "seleccion" && item.tipo === "archivo" && (
                      <button
                        onClick={() => onSelect({
                          ...item,
                          rutaCompleta: [...ruta, item.nombre].join("/")
                        })}
                      >
                        Seleccionar
                      </button>
                    )}

                </div>

            ))}

            </div>

        </div>

        );

}

export default ExploradorArchivos;
