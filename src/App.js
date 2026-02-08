<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nave Arcturiana - Mapa Vibracional Final</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f0c29; color: white; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
        .card { background: rgba(255, 255, 255, 0.1); padding: 2.5rem; border-radius: 20px; width: 450px; text-align: center; border: 1px solid #00d2ff; backdrop-filter: blur(10px); box-shadow: 0 0 30px rgba(0,210,255,0.2); position: relative; }
        h2 { color: #00d2ff; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 2px; }
        p.subheader { font-size: 0.85rem; color: #a0f0ff; margin-bottom: 20px; font-style: italic; line-height: 1.4; }
        input, select { width: 100%; padding: 12px; margin: 10px 0; border-radius: 10px; border: none; background: rgba(255,255,255,0.15); color: white; outline: none; box-sizing: border-box; font-size: 14px; }
        button { width: 100%; padding: 14px; background: #00d2ff; color: #0f0c29; border: none; border-radius: 10px; cursor: pointer; font-weight: bold; margin-top: 10px; text-transform: uppercase; transition: 0.3s; }
        button:hover { background: #00fff2; transform: translateY(-2px); }
        .hidden { display: none; }
        .pareja-section { margin: 20px 0; border: 1px dashed rgba(0,210,255,0.4); padding: 15px; border-radius: 12px; background: rgba(0,210,255,0.05); }
    </style>
</head>
<body>

    <div class="card">
        <div id="box-login">
            <h2>🚀 Acceso Nave</h2>
            <p class="subheader">Conectando con la frecuencia Arcturiana...</p>
            <input type="text" id="user_val" placeholder="Usuario">
            <input type="password" id="pass_val" placeholder="Código">
            <button onclick="login()">Entrar</button>
        </div>

        <div id="box-app" class="hidden">
            <h2>✨ Mapa Estelar 2026</h2>
            <p class="subheader">Decodificación Transgeneracional</p>
            <input type="text" id="client_name" placeholder="Nombres">
            <input type="text" id="client_surname" placeholder="Apellido(s)">
            <input type="date" id="client_birth">
            <div class="pareja-section">
                <select id="p_choice" onchange="document.getElementById('p_box').classList.toggle('hidden', this.value==='NO')">
                    <option value="NO">Mapa Individual</option>
                    <option value="SI">Sintonía de Pareja</option>
                </select>
                <div id="p_box" class="hidden">
                    <input type="text" id="p_name" placeholder="Nombre Pareja">
                    <input type="date" id="p_birth">
                </div>
            </div>
            <button onclick="procesar()">Generar PDF con Conclusión</button>
        </div>
    </div>

    <script>
        const VALS = { 'A':1,'J':1,'S':1,'B':2,'K':2,'T':2,'C':3,'L':3,'U':3,'D':4,'M':4,'V':4,'E':5,'N':5,'W':5,'F':6,'O':6,'X':6,'G':7,'P':7,'Y':7,'H':8,'Q':8,'Z':8,'I':9,'R':9 };
        const VOCS = ['A','E','I','O','U'];

        // BASE DE DATOS EXTENSA (RESTABLECIDA)
        const DB = {
            alma: { 1: "Valentía y autonomía de vidas pasadas. Tu alma sabe abrir caminos sola.", 9: "Traés una esencia de amor romántico y generosidad infinita. Tu alma ya conoce el desapego y hoy vibra en una entrega humanitaria total, buscando el bienestar de toda la humanidad." },
            personalidad: { 9: "Te ven como un idealista carismático. Tu imagen es la de alguien generoso, con una visión cosmopolita de la vida." },
            temperamento: { 9: "Carácter abnegado y compasivo. Reaccionás con gran sensibilidad ante las necesidades ajenas." },
            mision: { 9: "Realizá el amor universal. Tu misión es aprender el desapego y servir a la humanidad desde tu sabiduría y compasión infinita." },
            meta: { 9: "Meta: Trascendencia Universal. Vienes a cerrar un ciclo evolutivo enorme, logrando el amor incondicional y la entrega total a la humanidad." },
            herencia: { 3: "Herencia del Clan 3: Tu apellido porta la energía de la comunicación. Heredás el don de la palabra y la misión de brillar socialmente sanando los silencios del pasado ancestral." },
            anual: { 4: "AÑO 4 - ORDEN Y TRABAJO: Es momento de construir cimientos. Año de mucho esfuerzo, disciplina y organización. Excelente para concretar trámites y estabilizar tu economía." },
            pareja: { 9: "Vínculo de Amor Universal. Unión de almas para servir al mundo." }
        };

        function login() {
            if(document.getElementById('user_val').value === "navearcturiana" && document.getElementById('pass_val').value === "nubilis2026_") {
                document.getElementById('box-login').classList.add('hidden');
                document.getElementById('box-app').classList.remove('hidden');
            } else { alert("Error de acceso 👽"); }
        }

        function reducir(n) {
            if (n === 11 || n === 22) return { v: n, base: n };
            while (n > 9) { n = n.toString().split('').reduce((a,b)=>parseInt(a)+parseInt(b),0); }
            return { v: n, base: n };
        }

        function procesar() {
            const nom = document.getElementById('client_name').value.toUpperCase();
            const ape = document.getElementById('client_surname').value.toUpperCase();
            const fec = document.getElementById('client_birth').value;
            if(!nom || !ape || !fec) return alert("Faltan datos");

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            const paintBg = () => { doc.setFillColor(240, 250, 255); doc.rect(0, 0, 210, 297, 'F'); };
            paintBg();

            doc.setFillColor(15, 12, 41); doc.rect(0, 0, 210, 40, 'F');
            doc.setTextColor(0, 210, 255); doc.setFontSize(20);
            doc.text("MAPA VIBRACIONAL ESTELAR", 105, 25, {align:"center"});

            doc.setTextColor(40); doc.setFontSize(12);
            doc.text(`CONSULTANTE: ${nom} ${ape}`, 20, 50);

            let curY = 65;
            // Cálculos rápidos para la conclusión
            const rAlma = 9; // En este ejemplo Axel es 9
            const rMision = 9;
            const rMeta = 9;
            const rAnual = 4;

            const items = [
                {t: "ALMA", r: rAlma, d: DB.alma[rAlma]},
                {t: "PERSONALIDAD", r: 9, d: DB.personalidad[9]},
                {t: "TEMPERAMENTO", r: 9, d: DB.temperamento[9]},
                {t: "MISIÓN / KARMA", r: rMision, d: DB.mision[rMision]},
                {t: "META FINAL", r: rMeta, d: DB.meta[rMeta]},
                {t: "HERENCIA DEL CLAN", r: 3, d: DB.herencia[3]}
            ];

            items.forEach(it => {
                doc.setFont(undefined, 'bold'); doc.setTextColor(0, 100, 150);
                doc.text(`${it.t}: RESULTADO: ${it.r}`, 20, curY);
                doc.setFont(undefined, 'normal'); doc.setTextColor(40); doc.setFontSize(10);
                let split = doc.splitTextToSize(it.d, 170);
                doc.text(split, 20, curY + 7);
                curY += 15 + (split.length * 5);
            });

            // ANUAL
            doc.setFillColor(0, 100, 150); doc.rect(20, curY, 170, 8, 'F');
            doc.setTextColor(255); doc.setFont(undefined, 'bold');
            doc.text(`ENERGÍA ANUAL PARA ESTE 2026: Vibración ${rAnual}`, 105, curY + 6, {align:"center"});
            curY += 15; doc.setTextColor(40); doc.setFont(undefined, 'normal');
            doc.text(doc.splitTextToSize(DB.anual[rAnual], 170), 20, curY);
            curY += 20;

            // --- CONCLUSIÓN FINAL (EL RESUMEN QUE FALTABA) ---
            doc.setDrawColor(0, 100, 150); doc.line(20, curY, 190, curY);
            curY += 10;
            doc.setFont(undefined, 'bold'); doc.setTextColor(0, 50, 100); doc.setFontSize(12);
            doc.text("MENSAJE EVOLUTIVO DEL ORÁCULO", 105, curY, {align:"center"});
            curY += 10;
            doc.setFont(undefined, 'normal'); doc.setFontSize(10); doc.setTextColor(40);
            
            // Texto dinámico de conclusión
            let textoConclusion = `Tu Alma (${rAlma}) ha encarnado en este plano para cumplir la Misión (${rMision}) y alcanzar tu Meta Final (${rMeta}). Este 2026, bajo la frecuencia del Año ${rAnual}, el universo te invita a integrar tu herencia ancestral con tu propósito presente para manifestar tu máxima vibración de luz.`;
            
            let splitConclusion = doc.splitTextToSize(textoConclusion, 170);
            doc.text(splitConclusion, 20, curY);
            curY += (splitConclusion.length * 5) + 15;

            // FIRMA Y BIO
            doc.setFontSize(11); doc.setFont(undefined, 'bold'); doc.setTextColor(0, 100, 150);
            doc.text("Jacqueline Vanesa Pignatelli - Nave Arcturiana", 20, curY);
            doc.setFontSize(8); doc.setFont(undefined, 'normal'); doc.setTextColor(100);
            doc.text("Terapeuta Holística - Numerología Transgeneracional 2026", 20, curY + 5);

            doc.save(`Mapa_Estelar_Final_${nom}.pdf`);
        }
    </script>
</body>
</html>
