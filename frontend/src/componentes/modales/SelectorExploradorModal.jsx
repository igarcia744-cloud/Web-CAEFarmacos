import React from "react";
import ExploradorArchivos from "../ExploradorArchivos";
import "../../css/Modal.css"; // 🔥 IMPORTANTE

function SelectorExploradorModal({ onClose, onCargar }) {

  return (
    <div className="modal-overlay">

      <div className="modal-content">

        <span className="modal-close" onClick={onClose}>✖</span>

        <h2>Seleccionar archivo</h2>

        <ExploradorArchivos
          modo="seleccion"
          filtros={{ busqueda: "", orden: "" }} // 🔥 obligatorio
          onSelect={(item) => { onCargar(item); onClose();}}
        />

        <div style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>

        </div>

      </div>

    </div>
  );
}

export default SelectorExploradorModal;