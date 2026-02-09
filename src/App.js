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
    const logoUrl = '/logo_celina.PNG'; 
    const img = new Image();
    img.src = logoUrl;

    img.onload = () => {
      // --- ENCABEZADO ---
      // Logo (posicionado a la derecha)
      doc.addImage(img, 'PNG', 140, 10, 50, 20);

      doc.setFontSize(9);
      doc.setTextColor(100);
      doc.setFont(undefined, 'bold');
      doc.text("SWISS MEDICAL SEGUROS", 20, 15);
      doc.setFont(undefined, 'normal');
      doc.text("CELINA Bróker de Seguros", 20, 20);

      // --- TÍTULO ---
      doc.setFontSize(18);
      doc.setTextColor(20, 40, 120);
      doc.text("CERTIFICADO DE ENDOSO", 105, 45, { align: "center" });

      // --- CUERPO DEL DOCUMENTO ---
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      
      doc.setFont(undefined, 'bold');
      doc.text("Fecha:", 20, 60);
      doc.setFont(undefined, 'normal');
      doc.text(formData.fecha || "-", 50, 60);

      doc.setFont(undefined, 'bold');
      doc.text("Póliza N°:", 20, 70);
      doc.setFont(undefined, 'normal');
      doc.text(formData.poliza || "-", 50, 70);

      doc.setFont(undefined, 'bold');
      doc.text("Asegurado:", 20, 80);
      doc.setFont(undefined, 'normal');
      doc.text(formData.asegurado || "-", 50, 80);

      // --- DETALLE ---
      doc.setDrawColor(200);
      doc.line(20, 90, 190, 90); // Línea divisoria

      doc.setFont(undefined, 'bold');
      doc.text("DETALLE DEL ENDOSO:", 20, 100);
      
      doc.setFont(undefined, 'normal');
      const splitText = doc.splitTextToSize(formData.detalle || "Sin detalle especificado.", 170);
      doc.text(splitText, 20, 110);

      // --- PIE DE PÁGINA ---
      doc.setFontSize(8);
      doc.setTextColor(150);
      const footerText = "Certificado de endoso que acompaña a la poliza original - Celina Bróker de Seguros";
      doc.text(footerText, 105, 285, { align: "center" });

      doc.save(`Endoso_${formData.poliza || 'S-N'}.pdf`);
    };

    img.onerror = () => {
      alert("Error: No se encontró el logo en 'public/logo_celina.PNG'. Asegúrate de que el nombre coincida exactamente.");
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg border-t-4 border-blue-900">
        <h1 className="text-3xl font-extrabold text-blue-900 text-center mb-8 tracking-tight">
          Generador de Endosos
        </h1>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase">Fecha</label>
            <input type="date" name="fecha" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase">Número de Póliza</label>
            <input type="text" name="poliza" placeholder="Ej: 123456" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase">Nombre del Asegurado</label>
            <input type="text" name="asegurado" placeholder="Nombre completo" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase">Texto del Endoso</label>
            <textarea name="detalle" rows="5" placeholder="Escriba aquí los cambios detallados..." onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"></textarea>
          </div>

          <button onClick={generarPDF} className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-lg shadow-lg transform active:scale-95 transition-all uppercase text-sm tracking-widest">
            Descargar Endoso PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
