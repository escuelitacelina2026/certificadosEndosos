import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    fecha: '',
    poliza: '',
    asegurado: '',
    detalle: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDownload = () => {
    console.log("Generando PDF con:", formData);
    // Aquí iría tu lógica de jsPDF o similar
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      
      {/* CONTENEDOR DEL LOGO: Aquí es donde aplicamos el cambio para que no pierda forma */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img 
          src="/logo_celina.PNG" 
          alt="Logo Swiss Medical Seguros" 
          style={{ 
            width: '350px',      // Lo hacemos más alargado (ajusta este valor a tu gusto)
            height: 'auto',      // El alto se ajusta solo para NO deformar
            objectFit: 'contain', // Asegura que el contenido mantenga su proporción
            display: 'block',
            margin: '0 auto'
          }} 
        />
      </div>

      <h2 style={{ color: '#1a3a8a', textAlign: 'center' }}>Generador de Endosos</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Fecha</label>
          <input 
            type="date" 
            name="fecha" 
            style={inputStyle} 
            onChange={handleChange} 
          />
        </div>

        <div>
          <label>Número de Póliza</label>
          <input 
            type="text" 
            name="poliza" 
            placeholder="Ej: 123456" 
            style={inputStyle} 
            onChange={handleChange} 
          />
        </div>

        <div>
          <label>Nombre del Asegurado</label>
          <input 
            type="text" 
            name="asegurado" 
            placeholder="Nombre completo" 
            style={inputStyle} 
            onChange={handleChange} 
          />
        </div>

        <div>
          <label>Texto del Endoso</label>
          <textarea 
            name="detalle" 
            placeholder="Escriba aquí los cambios..." 
            style={{ ...inputStyle, height: '100px' }} 
            onChange={handleChange} 
          />
        </div>

        <button 
          onClick={handleDownload}
          style={{
            backgroundColor: '#1a3a8a',
            color: 'white',
            padding: '12px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '10px'
          }}
        >
          DESCARGAR ENDOSO PDF
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
  marginTop: '5px'
};

export default App;
