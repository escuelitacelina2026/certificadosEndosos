import React, { useState } from 'react';
import './App.css';

function App() {
  const [esLibreDeuda, setEsLibreDeuda] = useState(false);
  const [formData, setFormData] = useState({
    fecha: '',
    poliza: '',
    asegurado: '',
    ramo: 'Accidentes Personales',
    detalle: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para formatear la fecha a DD/MM/AAAA [Petición del usuario]
  const formatearFecha = (fechaRaw) => {
    if (!fechaRaw) return '';
    const [year, month, day] = fechaRaw.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleDownload = () => {
    const fechaFormateada = formatearFecha(formData.fecha);
    
    // Leyenda específica si es Libre Deuda [Petición del usuario]
    const contenidoPDF = esLibreDeuda 
      ? "Por el presente certificado se informa que la póliza de referencia a la fecha no registra deuda."
      : formData.detalle;

    console.log("Generando PDF...", {
      Tipo: esLibreDeuda ? "LIBRE DEUDA" : "ENDOSO",
      Ramo: formData.ramo,
      Fecha: fechaFormateada,
      Texto: contenidoPDF
    });
    alert(`Generando ${esLibreDeuda ? 'Certificado Libre Deuda' : 'Endoso'}...`);
  };

  return (
    <div className="App" style={containerStyle}>
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img 
          src="/logo_celina.PNG" 
          alt="Swiss Medical" 
          style={{ width: '380px', height: 'auto', objectFit: 'contain' }} 
        />
      </div>

      <h2 style={{ color: '#1a3a8a', textAlign: 'center' }}>
        {esLibreDeuda ? 'Certificado Libre Deuda' : 'Generador de Endosos'}
      </h2>

      {/* Checkbox para alternar modo [Petición del usuario] */}
      <div style={{ marginBottom: '20px', textAlign: 'center', backgroundColor: '#e9ecef', padding: '10px', borderRadius: '5px' }}>
        <label style={{ fontWeight: 'bold', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={esLibreDeuda} 
            onChange={() => setEsLibreDeuda(!esLibreDeuda)}
            style={{ marginRight: '10px' }}
          />
          ¿Necesita Libre Deuda?
        </label>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={labelStyle}>Fecha</label>
          <input type="date" name="fecha" style={inputStyle} onChange={handleChange} />
        </div>

        <div>
          <label style={labelStyle}>Nombre del Asegurado</label>
          <input type="text" name="asegurado" placeholder="Nombre completo" style={inputStyle} onChange={handleChange} />
        </div>

        {/* Selector de Ramo [Petición del usuario] */}
        <div>
          <label style={labelStyle}>Ramo</label>
          <select name="ramo" style={inputStyle} onChange={handleChange}>
            <option value="Accidentes Personales">Accidentes Personales</option>
            <option value="Responsabilidad Civil">Responsabilidad Civil</option>
            <option value="Automotor">Automotor</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Número de Póliza</label>
          <input type="text" name="poliza" placeholder="Ej: 123456" style={inputStyle} onChange={handleChange} />
        </div>

        {/* Solo muestra el detalle si NO es Libre Deuda [Petición del usuario] */}
        {!esLibreDeuda && (
          <div>
            <label style={labelStyle}>Texto del Endoso</label>
            <textarea 
              name="detalle" 
              placeholder="Escriba aquí los cambios..." 
              style={{ ...inputStyle, height: '100px' }} 
              onChange={handleChange} 
            />
          </div>
        )}

        <button onClick={handleDownload} style={buttonStyle}>
          {esLibreDeuda ? 'DESCARGAR LIBRE DEUDA' : 'DESCARGAR ENDOSO PDF'}
        </button>
      </div>
    </div>
  );
}

// Estilos
const containerStyle = { padding: '30px 20px', fontFamily: 'Arial', maxWidth: '500px', margin: '20px auto', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' };
const labelStyle = { display: 'block', fontWeight: 'bold', marginBottom: '5px' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' };
const buttonStyle = { backgroundColor: '#1a3a8a', color: 'white', padding: '15px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' };

export default App;
