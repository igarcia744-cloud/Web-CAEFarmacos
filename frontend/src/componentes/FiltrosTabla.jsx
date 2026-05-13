import React, { useState, useEffect, useRef } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import api from "../api/api";
import "../css/FiltrosTabla.css"

function FiltrosTabla({ filtros, setFiltros }) {

  const [etiquetas, setEtiquetas] = useState([]);
  const [busquedaEtiqueta, setBusquedaEtiqueta] = useState("");
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const refMenu = useRef(null);

  useEffect(() => {
    const cargar = async () => {
      const res = await api.get("/etiquetas/");
      setEtiquetas(res.data);
    };
    cargar();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (refMenu.current && !refMenu.current.contains(e.target)) {
        setMenuAbierto(false);

        setFiltros(prev => ({
          ...prev,
          etiquetas: seleccionadas
        }));
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [seleccionadas, setFiltros]);

  const toggleEtiqueta = (id) => {
    if (seleccionadas.includes(id)) {
      setSeleccionadas(seleccionadas.filter(e => e !== id));
    } else {
      setSeleccionadas([...seleccionadas, id]);
    }
  };


  return (

    <div className="sidebar-filtros">

      <p className="sidebar-title">Filtros Tabla</p>

      {/* 🔹 BLOQUE MOSTRAR */}
      <div className="filtro-bloque">

        <p className="filtro-titulo">Mostrar:</p>

        <label>
          <input
            type="checkbox"
            checked={filtros.mostrarLibrerias}
            onChange={() =>
              setFiltros({
                ...filtros,
                mostrarLibrerias: !filtros.mostrarLibrerias
              })
            }
          />
          Compuestos
        </label>

        <label>
          <input
            type="checkbox"
            checked={filtros.mostrarCompuestos}
            onChange={() =>
              setFiltros({
                ...filtros,
                mostrarCompuestos: !filtros.mostrarCompuestos
              })
            }
          />
          Conformaciones
        </label>

      </div>

      {/* 🔹 BLOQUE BUSCAR */}
      <div className="filtro-bloque">

        <p className="filtro-titulo">Buscar por nombre:</p>

        <input
          type="text"
          placeholder="Buscar compuestos..."
          value={filtros.busquedaLibrerias}
          onChange={(e) =>
            setFiltros({
              ...filtros,
              busquedaLibrerias: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Buscar conformaciones..."
          value={filtros.busquedaCompuestos}
          onChange={(e) =>
            setFiltros({
              ...filtros,
              busquedaCompuestos: e.target.value
            })
          }
        />

      </div>

      <div className="filtro-bloque" ref={refMenu}>

        <p className="filtro-titulo">Filtrar por etiqueta</p>

        <div
          className="dropdown-etiquetas"
          onClick={async () => {
            const nuevoEstado = !menuAbierto;
            setMenuAbierto(nuevoEstado);

            if (nuevoEstado) {
              try {
                const res = await api.get("/etiquetas/");
                setEtiquetas(res.data);
              } catch (err) {
                console.error(err);
              }
            }
          }}
        >
          Seleccionar etiquetas ▼
        </div>

        {menuAbierto && (
          <div className="dropdown-contenido">

            {/* 🔍 BUSCADOR */}
            <input
              type="text"
              placeholder="Buscar etiqueta..."
              value={busquedaEtiqueta}
              onChange={(e) => setBusquedaEtiqueta(e.target.value)}
            />

            {/* 🟢 SELECCIONADAS */}
            <div className="etiquetas-seleccionadas">
              {seleccionadas.map(id => {
                const et = etiquetas.find(e => e.id === id);
                return (
                  <span key={id} className="tag seleccionada">
                    {et?.nombre}
                    <span onClick={() => toggleEtiqueta(id)}>✖</span>
                  </span>
                );
              })}
            </div>

            {/* 📋 LISTA */}
            <div className="lista-etiquetas">
              {etiquetas
                .filter(e =>
                  e.nombre.toLowerCase().includes(busquedaEtiqueta.toLowerCase())
                )
                .map(et => (
                  <label key={et.id}>
                    <input
                      type="checkbox"
                      checked={seleccionadas.includes(et.id)}
                      onChange={() => toggleEtiqueta(et.id)}
                    />
                    {et.nombre}
                  </label>
                ))}
            </div>

          </div>
        )}

      </div>

      <div className="filtro-bloque">

        <p className="filtro-titulo">Ordenar</p>

        <select
          value={filtros.orden}
          onChange={(e) =>
            setFiltros({
              ...filtros,
              orden: e.target.value
            })
          }
        >
          <option value="nombre_asc">Nombre A-Z</option>
          <option value="nombre_desc">Nombre Z-A</option>
        </select>

      </div>

      <div className="filtro-bloque">

          <p className="filtro-titulo">Filtrado de atributos</p>

          <select
            value={filtros.filtroTipo}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                filtroTipo: e.target.value
              })
            }
          >
            <option value="">Seleccionar filtro</option>
            <option value="libreria_nombre">Conformaciones por compuesto</option>
            <option value="num_compuestos">Compuestos por nº conformaciones</option>
          </select>

          {filtros.filtroTipo === "libreria_nombre" && (
            <input
              type="text"
              placeholder="Buscar por compuesto..."
              value={filtros.filtroNombreLibreria}
              onChange={(e) =>
                setFiltros({
                  ...filtros,
                  filtroNombreLibreria: e.target.value
                })
              }
            />
          )}

          {filtros.filtroTipo === "num_compuestos" && (
            <div className="range-container">

              <div className="range-values">
                <span>{filtros.minCompuestos}</span>
                <span>{filtros.maxCompuestos}</span>
              </div>

              <Slider
                range
                min={0}
                max={100}
                value={[filtros.minCompuestos, filtros.maxCompuestos]}
                onChange={(value) =>
                  setFiltros({
                    ...filtros,
                    minCompuestos: value[0],
                    maxCompuestos: value[1]
                  })
                }
              />

            </div>
          )}

      </div>

    </div>

  );

}

export default FiltrosTabla;