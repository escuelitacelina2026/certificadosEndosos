import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const App = () => {
  const [datos, setDatos] = useState({
    fecha: '',
    poliza: '',
    asegurado: '',
    endoso: ''
  });

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    const img = new Image();
    
    // IMPORTANTE: El nombre del archivo debe ser exacto en tu carpeta public
    img.src = '/logo_celina.PNG'; 

    img.onload = () => {
      // Encabezado con Logo
      doc.addImage(img, 'PNG',15, 10, 60, 15);
      doc.setFontSize(10);
      doc.text('CELINA Bróker de Seguros', 70, 15);
      doc.text('Generador de Certificados de Endoso', 70, 22);
      
      doc.line(10, 35, 200, 35); // Línea divisoria

      // Cuerpo del documento
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('CERTIFICADO DE ENDOSO', 105, 50, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.text(`Fecha: ${datos.fecha}`, 15, 65);
      doc.text(`Póliza N°: ${datos.poliza}`, 15, 75);
      doc.text(`Asegurado: ${datos.asegurado}`, 15, 85);

      doc.setFont('helvetica', 'bold');
      doc.text('DETALLE DEL ENDOSO:', 15, 100);
      
      doc.setFont('helvetica', 'normal');
      // Texto con ajuste de línea automático
      const splitEndoso = doc.splitTextToSize(datos.endoso, 180);
      doc.text(splitEndoso, 15, 110);

      // Pie de página
      doc.setFontSize(10);
      doc.text('Documento generado para uso interno - Celina Bróker', 105, 280, { align: 'center' });

      doc.save(`Endoso_${datos.poliza}.pdf`);
    };

    img.onerror = () => {
      alert("Error: No se pudo cargar el logo. Revisa que el nombre del archivo sea logo_celina.PNG en la carpeta public.");
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl border-t-4 border-blue-600">
        <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">Generador de Endosos</h1>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha</label>
            <input type="date" name="fecha" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Número de Póliza</label>
            <input type="text" name="poliza" placeholder="Ej: 123456" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Asegurado</label>
            <input type="text" name="asegurado" placeholder="Nombre completo" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Texto del Endoso</label>
            <textarea name="endoso" rows="6" placeholder="Escriba aquí los cambios de la póliza..." onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
          </div>
          <button 
            onClick={generarPDF}
            className="mt-4 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            DESCARGAR ENDOSO PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
