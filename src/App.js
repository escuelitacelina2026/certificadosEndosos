import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

function App() {
  const [formData, setFormData] = useState({
    fecha: '',
    poliza: '',
    asegurado: '',
    detalle: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    
    // Configuración de estilo y encabezado
    doc.setFontSize(18);
    doc.setTextColor(20, 40, 120); // Azul similar al logo
    doc.text("CERTIFICADO DE ENDOSO", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Fecha: ${formData.fecha}`, 20, 40);
    doc.text(`Póliza N°: ${formData.poliza}`, 20, 50);
    doc.text(`Asegurado: ${formData.asegurado}`, 20, 60);
    
    doc.setFont(undefined, 'bold');
    doc.text("DETALLE DEL ENDOSO:", 20, 80);
    
    doc.setFont(undefined, 'normal');
    // Multilínea para el detalle
    const splitText = doc.splitTextToSize(formData.detalle, 170);
    doc.text(splitText, 20, 90);

    doc.setFontSize(10);
    doc.text("Certificado de endoso que acompaña a la póliza original - Celina Bróker de Seguros", 105, 280, { align: "center" });

    doc.save(`Endoso_${formData.poliza}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-900 text-center mb-6">Generador de Endosos</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Fecha</label>
            <input 
              type="date" name="fecha" onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Número de Póliza</label>
            <input 
              type="text" name="poliza" placeholder="Ej: 123456" onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Nombre del Asegurado</label>
            <input 
              type="text" name="asegurado" placeholder="Nombre completo" onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Texto del Endoso</label>
            <textarea 
              name="detalle" rows="4" placeholder="Escriba aquí los cambios..." onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          <button 
            onClick={generarPDF}
            className="w-full bg-blue-900 text-white font-bold py-3 rounded hover:bg-blue-800 transition duration-300 uppercase tracking-wider"
          >
            Descargar Endoso PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
