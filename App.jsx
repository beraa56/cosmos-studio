import { useState, useEffect } from "react";
const SESSION_TYPES = ["Familia", "Niños", "Retrato", "Marca Personal", "Producto", "Conceptu
const EMOTIONS = ["Calma", "Alegría", "Conexión", "Elegancia", "Minimalismo"];
const LOCATIONS = ["Naturaleza", "Parque", "Estudio", "Urbano"];
const INSPIRATION = [
"Deja que la emoción guíe. La luz sigue.",
"Antes de encuadrar, siente la escena.",
"La simplicidad es el lenguaje visual más poderoso.",
"El color no es decoración — es dirección.",
"Una sesión planificada con intención nunca parece accidental.",
];
const p = {
bg: "#FAFAF8",
surface: "#F3F1EC",
card: "#FFFFFF",
accent: "#B8894A",
accentSoft: "#D4A96A",
muted: "#9A9080",
text: "#1A1410",
textSoft: "#6B6258",
};
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #FAFAF8 !important; color: #1A1410; font-family: 'Jost', sans-seri
.app { min-height: 100vh; background: #FAFAF8 !important; position: relative; overflow: hid
.nebula { position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; z
.page { position: relative; z-index: 1; min-height: 100vh; display: flex; flex-direction: c
@keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transfo
.logo-mark { font-family:'Cormorant Garamond',serif; font-size:11px; font-weight:300; lette
.title { font-family:'Cormorant Garamond',serif; font-size:clamp(52px,10vw,88px); font-weig
.title em { font-style:italic; color:${p.accent}; }
.subtitle { font-family:'Jost',sans-serif; font-size:13px; font-weight:300; letter-spacing:
.btn { margin-top:48px; background:transparent; border:1px solid ${p.accent}; color:${p.acc
.btn::before { content:''; position:absolute; inset:0; background:${p.accent}; transform:tr
.btn:hover { color:#fff; }
.btn:hover::before { transform:translateX(0); }
.btn:disabled { opacity:0.4; cursor:not-allowed; }
.btn-ghost { background:transparent; border:1px solid ${p.muted}66; color:${p.textSoft}; fo
.btn-ghost:hover { border-color:${p.muted}; color:#1A1410; }
.insp { margin-top:64px; text-align:center; border-top:1px solid ${p.muted}33; padding-top:
.insp-label { font-size:9px; letter-spacing:0.4em; text-transform:uppercase; color:${p.mute
.insp-quote { font-family:'Cormorant Garamond',serif; font-size:20px; font-style:italic; fo
.question { font-family:'Cormorant Garamond',serif; font-size:clamp(22px,5vw,34px); font-we
.pills { display:flex; flex-wrap:wrap; gap:10px; justify-content:center; max-width:540px; m
.pill { background:transparent; border:1px solid ${p.muted}55; color:${p.textSoft}; font-fa
.pill:hover, .pill.on { border-color:${p.accent}; color:${p.accent}; background:${p.accent}
.steps { font-size:9px; letter-spacing:0.4em; text-transform:uppercase; color:${p.muted}; m
.dot { width:4px; height:4px; border-radius:50%; background:${p.muted}44; transition:backgr
.dot.on { background:${p.accent}; }
.back { position:fixed; top:24px; left:24px; background:transparent; border:none; color:${p
.back:hover { color:${p.accent}; }
.dual { display:flex; flex-direction:column; align-items:center; gap:40px; width:100%; max-
.q-block { width:100%; text-align:center; }
.q-label { font-family:'Cormorant Garamond',serif; font-size:clamp(18px,4vw,26px); font-wei
.ring { width:48px; height:48px; border:1px solid ${p.muted}44; border-top-color:${p.accent
@keyframes spin { to { transform:rotate(360deg); } }
.loading-text { font-family:'Cormorant Garamond',serif; font-size:20px; font-style:italic;
.card { background:#FFFFFF; border:1px solid ${p.muted}22; padding:40px; position:relative;
.card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; backgrou
.card-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:
.card-brand { font-size:8px; letter-spacing:0.5em; text-transform:uppercase; color:${p.acce
.card-type { font-size:9px; letter-spacing:0.25em; text-transform:uppercase; color:${p.mute
.grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:28px; }
@media(max-width:480px){ .grid { grid-template-columns:1fr; } }
.block { padding:20px; background:#F3F1EC; border:1px solid ${p.muted}18; }
.full { grid-column:1/-1; }
.bl { font-size:8px; letter-spacing:0.4em; text-transform:uppercase; color:${p.accent}; mar
.bv { font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:300; color:#1A141
.bvsm { font-family:'Jost',sans-serif; font-size:12px; font-weight:300; color:${p.textSoft}
.swatches { display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
.swatch { width:32px; height:32px; border-radius:2px; }
.swatch-name { font-size:7px; color:${p.muted}; margin-top:4px; text-align:center; }
.action-row { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:36
.sig { text-align:center; margin-top:48px; font-size:9px; letter-spacing:0.3em; text-transf
.result-wrap { padding:60px 24px 80px; max-width:700px; margin:0 auto; width:100%; }
.divider { width:40px; height:1px; background:${p.accent}44; margin:24px auto; }
.error-box { position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:
`;
function BgLayer() {
return (
<>
<div className="nebula" style={{ width:700, height:700, top:"-20%", right:"-15%", backg
<div className="nebula" style={{ width:500, height:500, bottom:"-15%", left:"-10%", bac
</>
);
}
function Dots({ n }) {
return (
<div className="steps">
{[1,2,3].map(i => <div key={i} className={`dot ${n>=i?"on":""}`} />)}
<span style={{marginLeft:8}}>Paso {n} de 3</span>
</div>
);
}
function Home({ onStart }) {
const [quote] = useState(() => INSPIRATION[Math.floor(Math.random()*INSPIRATION.length)]);
return (
<div className="page">
<div className="logo-mark">Cosmos · Studio</div>
<h1 className="title">Diseña<br /><em>con</em><br />Intención</h1>
<p className="subtitle">Tu asistente creativo para diseñar sesiones fotográficas <button className="btn" onClick={onStart}>Diseñar mi sesión</button>
<div className="insp">
<div className="insp-label">Inspiración del día</div>
<div className="insp-quote">"{quote}"</div>
</div>
<div className="sig" style={{marginTop:48,position:"relative",zIndex:1}}>Sistema </div>
con in
Creati
);
}
function TypeScreen({ onContinue, onBack }) {
const [sel, setSel] = useState(null);
return (
<div className="page">
<button className="back" onClick={onBack}>← Volver</button>
<Dots n={1} />
<h2 className="question">¿Qué tipo de sesión<br />estás planeando?</h2>
<div className="pills">
{SESSION_TYPES.map(t => (
<button key={t} className={`pill ${sel===t?"on":""}`} onClick={() => setSel(t)}>{t}
))}
</div>
<button className="btn" disabled={!sel} onClick={() => onContinue(sel)}>Continuar</butt
</div>
);
}
function DetailsScreen({ onGenerate, onBack }) {
const [emotion, setEmotion] = useState(null);
const [loc, setLoc] = useState(null);
return (
<div className="page">
<button className="back" onClick={onBack}>← Volver</button>
<Dots n={2} />
<div className="dual">
<div className="q-block">
<div className="q-label">¿Qué emoción quieres transmitir?</div>
<div className="pills" style={{marginBottom:0}}>
{EMOTIONS.map(e => <button key={e} className={`pill ${emotion===e?"on":""}`} onCl
</div>
</div>
<div className="q-block">
<div className="q-label">¿Dónde será la sesión?</div>
<div className="pills" style={{marginBottom:0}}>
{LOCATIONS.map(l => <button key={l} className={`pill ${loc===l?"on":""}`} onClick
</div>
</div>
<button className="btn" disabled={!emotion||!loc} onClick={() => onGenerate({emotion,
Generar plan de sesión
</button>
</div>
</div>
);
}
function Loading() {
const phrases = ["Leyendo la luz...","Componiendo la emoción...","Construyendo tu concepto
const [i, setI] = useState(0);
useEffect(() => { const t = setInterval(() => setI(x => (x+1)%phrases.length), 1800); retur
return (
<div className="page">
<div style={{textAlign:"center",padding:"60px 20px"}}>
<div className="ring" />
<div className="loading-text">{phrases[i]}</div>
</div>
</div>
);
}
function Result({ plan, sessionType, onReset }) {
if (!plan) return null;
const download = () => {
const text = `COSMOS STUDIO — PLAN DE SESIÓN\nSistema Creativo por Bernardita Aguirre\n${
const a = document.createElement("a");
a.href = URL.createObjectURL(new Blob([text], {type:"text/plain"}));
a.download = "COSMOS-Plan-de-Sesion.txt";
a.click();
};
return (
<div className="page" style={{justifyContent:"flex-start",paddingTop:60}}>
<div className="result-wrap">
<div style={{textAlign:"center",marginBottom:48}}>
<div className="logo-mark" style={{marginBottom:16}}>Cosmos · Studio</div>
<h2 className="title" style={{fontSize:"clamp(36px,7vw,60px)"}}>Tu Plan de <em>Sesi
<div className="divider" />
</div>
<div className="card">
<div className="card-top">
<span className="card-brand">COSMOS Studio</span>
<span className="card-type">Sesión de {sessionType}</span>
</div>
<div className="grid">
<div className="block full"><div className="bl">Concepto</div><div className="bv"
<div className="block"><div className="bl">Emoción</div><div className="bv">{plan
<div className="block"><div className="bl">Escenario</div><div className="bv">{pl
<div className="block full">
<div className="bl">Paleta de Color</div>
<div className="swatches">
{plan.colorPalette?.map((c,i) => (
<div key={i} style={{display:"flex",flexDirection:"column",alignItems:"cent
<div className="swatch" style={{background:c.hex,border:"1px solid #00000
<div className="swatch-name">{c.name}</div>
</div>
))}
</div>
{plan.colorRationale && <div className="bvsm" style={{marginTop:20}}>{plan.colo
</div>
<div className="block full"><div className="bl">Interacciones</div><div className
<div className="block"><div className="bl">Luz</div><div className="bvsm">{plan.l
<div className="block"><div className="bl">Estilo de Edición</div><div className=
<div className="block full"><div className="bl">Dirección de Moodboard</div><div
</div>
<div style={{textAlign:"center",paddingTop:20,borderTop:`1px solid #9A908022`}}>
<div style={{fontSize:8,letterSpacing:"0.4em",color:"#9A9080",textTransform:"uppe
</div>
</div>
<div className="action-row">
<button className="btn" onClick={download}>Descargar plan de sesión</button>
<button className="btn-ghost" onClick={onReset}>Diseñar otra sesión</button>
</div>
<div className="sig">cosmos-studio.com</div>
</div>
</div>
);
}
export default function App() {
const [screen, setScreen] = useState("home");
const [sessionType, setSessionType] = useState(null);
const [plan, setPlan] = useState(null);
const [error, setError] = useState(null);
const generate = async (sessionT, det) => {
setScreen("loading");
setError(null);
const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
const prompt = `Eres COSMOS Studio, un asistente creativo para sesiones fotográficas basa
Genera un plan estructurado de sesión fotográfica para:
- Tipo de sesión: ${sessionT}
- Emoción deseada: ${det.emotion}
- Locación: ${det.loc}
Responde SOLO con un objeto JSON válido (sin markdown, sin bloques de código) con estas clave
{
"concept": "Un concepto visual poético en una línea (menos de 15 palabras)",
"emotion": "Cómo se expresará esta emoción visualmente (2-3 oraciones)",
"scenario": "Configuración específica de la escena dentro de la locación elegida (2-3 oraci
"colorPalette": [
{"name": "Nombre del color", "hex": "#HEXCODE"},
{"name": "Nombre del color", "hex": "#HEXCODE"},
{"name": "Nombre del color", "hex": "#HEXCODE"},
{"name": "Nombre del color", "hex": "#HEXCODE"}
],
"colorRationale": "Por qué estos colores sirven a la emoción y el concepto (1-2 oraciones)"
"interactions": "3-4 direcciones de interacción específicas para crear momentos naturales n
"light": "Calidad de luz, dirección, hora del día y técnica (2-3 oraciones)",
"editingStyle": "Tono de postprocesamiento, contraste, dirección de gradación de color (2 o
"moodboardDirection": "Descripción de 4-5 referencias visuales o estéticas que inspiran est
}`;
try {
const res = await fetch("https://api.anthropic.com/v1/messages", {
method: "POST",
headers: {
"Content-Type": "application/json",
"x-api-key": apiKey,
"anthropic-version": "2023-06-01",
"anthropic-dangerous-direct-browser-access": "true"
},
body: JSON.stringify({
model: "claude-sonnet-4-20250514",
max_tokens: 1000,
messages: [{ role: "user", content: prompt }],
}),
});
const data = await res.json();
const raw = data.content?.map(b => b.text||"").join("") || "";
const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
setPlan(parsed);
setScreen("result");
} catch (e) {
setError("Algo salió mal. Por favor intenta de nuevo.");
setScreen("details");
}
};
return (
<>
<style dangerouslySetInnerHTML={{__html: css}} />
<div className="app">
<BgLayer />
{screen==="home" && <Home onStart={() => setScreen("type")} />}
{screen==="type" && <TypeScreen onContinue={t => { setSessionType(t); setScreen("deta
{screen==="details" && <DetailsScreen onGenerate={det => generate(sessionType, {screen==="loading" && <Loading />}
{screen==="result" && <Result plan={plan} sessionType={sessionType} onReset={() => {
{error && <div className="error-box">{error}</div>}
</div>
det)}
</>
);
}
