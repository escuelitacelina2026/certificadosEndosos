import React, { useState } from 'react';
import { jsPDF } from "jspdf";

function App() {
  const [formData, setFormData] = useState({
    fechaEmision: new Date().toISOString().split('T')[0],
    tipoPoliza: '',
    numeroPoliza: '',
    asegurado: '',
    endosoAclaratorio: ''
  });
  
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      // Formato A4 Horizontal
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4"
      });

      // 1. Cargar el Logo desde public/logo_celina.PNG
      const img = new Image();
      img.src = '/logo_celina.PNG'; 
      
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = () => {
          console.error("Error cargando logo");
          resolve();
        };
      });

      // Dibujar Logo (ajustado a las proporciones de tu imagen)
      try {
        doc.addImage(img, 'PNG', 40, 20, 80, 80); 
      } catch (e) {
        doc.setTextColor(0, 51, 102);
        doc.setFontSize(20);
        doc.text("CELINA", 40, 40);
      }

      // 2. Encabezado Azul Celina
      doc.setFillColor(0, 51, 102);
      doc.rect(0, 100, 842, 50, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(25);
      doc.setFont("helvetica", "bold");
      doc.text("ENDOSO ACLARATORIO", 421, 132, { align: "center" });

      // 3. Datos del Certificado
      doc.setTextColor(0, 51, 102);
      doc.setFontSize(16);
      let y = 190;

      const fields = [
        ["FECHA DE EMISIÓN:", formatDate(formData.fechaEmision)],
        ["TIPO DE PÓLIZA:", formData.tipoPoliza],
        ["NÚMERO DE PÓLIZA:", formData.numeroPoliza],
        ["ASEGURADO:", formData.asegurado]
      ];

      fields.forEach(([label, value]) => {
        doc.setFont("helvetica", "bold");
        doc.text(label, 60, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(60, 60, 60);
        doc.text(value.toString().toUpperCase(), 230, y);
        doc.setDrawColor(230, 230, 230);
        doc.line(60, y + 8, 780, y + 8);
        y +=
