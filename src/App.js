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
    
    // Asegúrate de que el logo se llame exactamente así en tu carpeta public
    img.src = '/logo_celina.PNG'; 

    img.onload = () => {
      // 1. EL LOGO: Configurado para ser alargado y nítido (Ancho 75, Alto 15)
      doc.addImage(img, 'PNG', 15, 12, 75, 15); 
      
      // 2. TEXTO DEL ENCABEZADO: Espaciado para que no se encime
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('CELINA Bróker de Seguros', 95, 18);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Certificados de Endoso', 95, 25);
      
      // 3. LA LÍNEA: Espacio visual limpio
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.line(15, 40, 195, 40); 

      // 4. TÍTULO DEL DOCUMENTO
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('CERTIFICADO DE ENDOSO', 105, 55, { align: 'center' });

      // 5. CUERPO DEL DOCUMENTO (DATOS INCLUYENDO COMPAÑÍA)
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Fecha: ${datos.fecha}`, 20, 70);
      doc.text(`Póliza N°: ${datos.poliza}`, 20, 90);
      doc.text(`Asegurado: ${datos.asegurado}`, 20, 100);

      doc.setFont('helvetica', 'bold');
      doc.text('DETALLE DEL ENDOSO:', 20, 115);
      
      doc.setFont('helvetica', 'normal');
      const splitEndoso = doc.splitTextToSize(datos.endoso, 170);
      doc.text(splitEndoso, 20, 125);

      // Pie de página
      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.text('Certificado de endoso que acompaña a la poliza original - Celina Bróker de Seguros', 105, 285, { align: 'center' });

      doc.save(`Endoso_${datos.poliza}.pdf`);
    };

    img.onerror = () => {
      alert("Error: No se pudo cargar el logo. Verifica que el nombre sea logo_celina.PNG");
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl border-t-4 border-blue-900">
        <h1 className="text-2xl font-bold text-blue-900 mb-6 text-center">Generador de Endosos</h1>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha</label>
            <input type="date" name="fecha" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm" />
          </div>
          
          <div>  
            <label className="block text-sm font-medium text-gray-700">Número de Póliza</label>
            <input type="text" name="poliza" placeholder="Ej: 123456" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Asegurado</label>
            <input type="text" name="asegurado" placeholder="Nombre completo" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Texto del Endoso</label>
            <textarea name="endoso" rows="5" placeholder="Escriba aquí los cambios..." onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"></textarea>
          </div>
          <button 
            onClick={generarPDF}
            className="mt-4 bg-blue-900 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-colors shadow-md"
          >
            DESCARGAR ENDOSO PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
