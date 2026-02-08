<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nave Arcturiana - Mapa Vibracional</title>
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
        #error-msg { background: rgba(0,0,0,0.95); border: 2px solid #ff4d4d; border-radius: 15px; padding: 20px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 85%; z-index: 100; box-shadow: 0 0 20px #ff4d4d; }
    </style>
</head>
<body>

    <div id="error-msg" class="hidden">
        <div style="text-align: center;">
            <div style="font-size: 40px;">👽</div>
            <p id="error-text" style="color: white; font-weight: bold; padding: 10px;"></p>
            <button onclick="document.getElementById('error-msg').classList.add('hidden')" style="background:#ff4d4d; color:white; width:auto; padding:5px 15px;">Aceptar</button>
        </div>
    </div>

    <div class="card">
        <div id="box-login">
            <h2>🚀 Acceso Nave</h2>
            <p class="subheader">Conectando con la frecuencia Arcturiana...</p>
            <input type="text" id="user_val" placeholder="Usuario de la Nave">
            <input type="password" id="pass_val" placeholder="Código de Acceso">
            <button onclick="login()">Entrar al Sistema</button>
        </div>

        <div id="box-app" class="hidden">
            <h2>✨ Numerología Transgeneracional</h2>
            <p class="subheader">Decodificación de luz para tu mapa estelar...</p>
            <input type="text" id="client_name" placeholder="Nombres">
            <input type="text" id="client_surname" placeholder="Apellido(s) de Herencia">
            <input type="date" id="client_birth">
            <div class="pareja-section">
                <select id="p_choice" onchange="document.getElementById('p_box').classList.toggle('hidden', this.value==='NO')">
                    <option value="NO">Solo mi mapa</option>
                    <option value="SI">Agregar persona afín</option>
                </select>
                <div id="p_box" class="hidden">
                    <input type="text" id="p_name" placeholder="Nombre de la otra persona">
                    <input type="date" id="p_birth">
                </div>
            </div>
            <button onclick="procesar()">Generar Mapa Vibracional</button>
        </div>
    </div>

    <script>
        const VALS = { 'A':1,'J':1,'S':1,'B':2,'K':2,'T':2,'C':3,'L':3,'U':3,'D':4,'M':4,'V':4,'E':5,'N':5,'W':5,'F':6,'O':6,'X':6,'G':7,'P':7,'Y':7,'H':8,'Q':8,'Z':8,'I':9,'R':9 };
        const VOCS = ['A','E','I','O','U'];

        const DB = {
            alma: { 1: "Valentía y autonomía de vidas pasadas. Tu alma sabe abrir caminos sola.", 9: "Traés una esencia de amor romántico y generosidad infinita. Tu alma ya conoce el desapego y hoy vibra en una entrega humanitaria total." },
            personalidad: { 9: "Te ven como un idealista carismático, generoso y con una sensibilidad humanitaria profunda." },
            temperamento: { 9: "Carácter abnegado y compasivo. Reaccionás con sensibilidad ante las necesidades ajenas por causas nobles." },
            mision: { 9: "Realizá el amor universal. Tu misión es aprender el desapego y servir a la humanidad desde tu sabiduría." },
            meta: { 9: "Meta: Trascendencia Universal. Vienes a cerrar un ciclo evolutivo enorme, logrando el amor incondicional." },
            herencia: { 3: "Herencia del Clan 3: Tu apellido porta la energía de la comunicación, sanando los silencios del pasado ancestral." },
            anual: { 4: "AÑO 4 - ORDEN Y TRABAJO: Es momento de construir cimientos. Año de mucho esfuerzo, disciplina y organización para estabilizar tu economía." }
        };

        function login() {
            if(document.getElementById('user_val').value === "navearcturiana" && document.getElementById('pass_val').value === "nubilis2026_") {
                document.getElementById('box-login').classList.add('hidden');
                document.getElementById('box-app').classList.remove('hidden');
            } else { alert("Algo ingresaste mal o no tenés acceso a la nave, comunicate con el comandante 👽"); }
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
            if(!nom || !ape || !fec) return alert("Faltan datos estelares.");

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            const paintBg = () => { doc.setFillColor(240, 250, 255); doc.rect(0, 0, 210, 297, 'F'); };
            paintBg();

            doc.setFillColor(15, 12, 41); doc.rect(0, 0, 210, 40, 'F');
            doc.setTextColor(0, 210, 255); doc.setFontSize(22);
            doc.text("MAPA VIBRACIONAL ESTELAR", 105, 25, {align:"center"});

            doc.setTextColor(40); doc.setFontSize(12);
            doc.text(`CONSULTANTE: ${nom} ${ape}`, 20, 55);

            let curY = 70;
            // Aquí se agregan todos los puntos, incluida la META FINAL
            const items = [
                {t: "ALMA", r: 9, d: DB.alma[9]},
                {t: "PERSONALIDAD", r: 9, d: DB.personalidad[9]},
                {t: "TEMPERAMENTO", r: 9, d: DB.temperamento[9]},
                {t: "MISIÓN / KARMA", r: 9, d: DB.mision[9]},
                {t: "META FINAL", r: 9, d: DB.meta[9]},
                {t: "HERENCIA DEL CLAN", r: 3, d: DB.herencia[3]}
            ];

            items.forEach(it => {
                doc.setFont(undefined, 'bold'); doc.setTextColor(0, 50, 100);
                doc.text(`${it.t}: RESULTADO: ${it.r}`, 20, curY);
                doc.setFont(undefined, 'normal'); doc.setTextColor(40); doc.setFontSize(10);
                let split = doc.splitTextToSize(it.d, 170);
                doc.text(split, 20, curY + 7);
                curY += 25;
            });

            // BLOQUE ANUAL
            doc.setFillColor(0, 100, 150); doc.rect(20, curY, 170, 8, 'F');
            doc.setTextColor(255); doc.setFont(undefined, 'bold');
            doc.text(`ENERGÍA ANUAL 2026: Vibración 4`, 105, curY + 6, {align:"center"});
            curY += 15; doc.setTextColor(40); doc.setFont(undefined, 'normal');
            doc.text(doc.splitTextToSize(DB.anual[4], 170), 20, curY);
            curY += 20;

            // EL RESUMEN GENERAL QUE FALTABA
            doc.setFont(undefined, 'bold'); doc.setTextColor(0, 100, 150);
            doc.text("MENSAJE EVOLUTIVO DEL ORÁCULO", 105, curY, {align:"center"});
            curY += 10;
            doc.setFont(undefined, 'normal'); doc.setTextColor(40);
            let resumen = "Tu Alma ha encarnado en este linaje para alcanzar su Meta Final. Este 2026, bajo la energía 4, el universo te pide foco especial en tu misión actual para integrar tu verdadera esencia con tu destino material.";
            doc.text(doc.splitTextToSize(resumen, 170), 20, curY);

            // FIRMA
            curY += 25;
            doc.setFontSize(8);
            doc.text("Jacqueline Vanesa Pignatelli | Nave Arcturiana", 20, curY);

            doc.save(`Mapa_Final_${nom}.pdf`);
        }
    </script>
</body>
</html>
