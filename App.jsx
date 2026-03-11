import { useState, useEffect } from "react";

const starPositions = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  opacity: Math.random() * 0.6 + 0.2,
  delay: Math.random() * 4,
}));

const SESSION_TYPES = ["Family", "Children", "Portrait", "Personal Brand", "Product", "Conceptual"];
const EMOTIONS = ["Calm", "Joy", "Connection", "Elegance", "Minimalism"];
const LOCATIONS = ["Nature", "Park", "Indoor Studio", "Urban"];

const INSPIRATION = [
  "Let emotion lead. Light follows.",
  "Before you frame, feel the scene.",
  "Simplicity is the loudest visual language.",
  "Color is not decoration — it's direction.",
  "A session planned with intention never looks accidental.",
];

const p = {
  bg: "#05040F",
  surface: "#0D0B1E",
  card: "#13102A",
  accent: "#C9A96E",
  accentSoft: "#E8D5A8",
  muted: "#4A4470",
  text: "#F0ECE8",
  textSoft: "#9A94B8",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${p.bg}; color: ${p.text}; font-family: 'Jost', sans-serif; }
  .app { min-height: 100vh; background: ${p.bg}; position: relative; overflow: hidden; }
  .stars { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
  .star { position: absolute; border-radius: 50%; background: white; animation: twinkle var(--delay,3s) ease-in-out infinite alternate; }
  @keyframes twinkle { from { opacity: var(--op,0.3); transform: scale(1); } to { opacity: calc(var(--op,0.3)*0.3); transform: scale(0.8); } }
  .nebula { position: fixed; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; }
  .page { position: relative; z-index: 1; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 24px; animation: fadeUp 0.7s ease forwards; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  .logo-mark { font-family:'Cormorant Garamond',serif; font-size:11px; font-weight:300; letter-spacing:0.4em; text-transform:uppercase; color:${p.accent}; margin-bottom:8px; }
  .title { font-family:'Cormorant Garamond',serif; font-size:clamp(52px,10vw,88px); font-weight:300; line-height:0.95; letter-spacing:-0.01em; color:${p.text}; text-align:center; }
  .title em { font-style:italic; color:${p.accent}; }
  .subtitle { font-family:'Jost',sans-serif; font-size:13px; font-weight:300; letter-spacing:0.15em; color:${p.textSoft}; text-align:center; max-width:340px; line-height:1.8; margin-top:20px; }
  .btn { margin-top:48px; background:transparent; border:1px solid ${p.accent}; color:${p.accent}; font-family:'Jost',sans-serif; font-size:11px; font-weight:400; letter-spacing:0.3em; text-transform:uppercase; padding:16px 48px; cursor:pointer; transition:all 0.4s ease; position:relative; overflow:hidden; }
  .btn::before { content:''; position:absolute; inset:0; background:${p.accent}; transform:translateX(-101%); transition:transform 0.4s ease; z-index:-1; }
  .btn:hover { color:${p.bg}; }
  .btn:hover::before { transform:translateX(0); }
  .btn:disabled { opacity:0.4; cursor:not-allowed; }
  .btn-ghost { background:transparent; border:1px solid ${p.muted}66; color:${p.textSoft}; font-family:'Jost',sans-serif; font-size:11px; font-weight:300; letter-spacing:0.2em; text-transform:uppercase; padding:14px 36px; cursor:pointer; transition:all 0.3s ease; margin-top:12px; }
  .btn-ghost:hover { border-color:${p.textSoft}; color:${p.text}; }
  .insp { margin-top:64px; text-align:center; border-top:1px solid ${p.muted}44; padding-top:32px; max-width:400px; width:100%; }
  .insp-label { font-size:9px; letter-spacing:0.4em; text-transform:uppercase; color:${p.muted}; margin-bottom:16px; }
  .insp-quote { font-family:'Cormorant Garamond',serif; font-size:20px; font-style:italic; font-weight:300; color:${p.textSoft}; line-height:1.5; }
  .question { font-family:'Cormorant Garamond',serif; font-size:clamp(22px,5vw,34px); font-weight:300; color:${p.text}; text-align:center; margin-bottom:36px; max-width:500px; }
  .pills { display:flex; flex-wrap:wrap; gap:10px; justify-content:center; max-width:520px; margin-bottom:40px; }
  .pill { background:transparent; border:1px solid ${p.muted}66; color:${p.textSoft}; font-family:'Jost',sans-serif; font-size:11px; font-weight:300; letter-spacing:0.15em; text-transform:uppercase; padding:12px 24px; cursor:pointer; transition:all 0.3s ease; }
  .pill:hover, .pill.on { border-color:${p.accent}; color:${p.accent}; background:${p.accent}11; }
  .steps { font-size:9px; letter-spacing:0.4em; text-transform:uppercase; color:${p.muted}; margin-bottom:48px; display:flex; gap:8px; align-items:center; }
  .dot { width:4px; height:4px; border-radius:50%; background:${p.muted}; transition:background 0.3s; }
  .dot.on { background:${p.accent}; box-shadow:0 0 8px ${p.accent}66; }
  .back { position:fixed; top:24px; left:24px; background:transparent; border:none; color:${p.muted}; font-family:'Jost',sans-serif; font-size:10px; letter-spacing:0.3em; text-transform:uppercase; cursor:pointer; display:flex; align-items:center; gap:8px; transition:color 0.3s; z-index:10; }
  .back:hover { color:${p.accent}; }
  .dual { display:flex; flex-direction:column; align-items:center; gap:40px; width:100%; max-width:560px; }
  .q-block { width:100%; text-align:center; }
  .q-label { font-family:'Cormorant Garamond',serif; font-size:clamp(18px,4vw,26px); font-weight:300; color:${p.text}; margin-bottom:20px; }
  .ring { width:48px; height:48px; border:1px solid ${p.muted}44; border-top-color:${p.accent}; border-radius:50%; animation:spin 1.2s linear infinite; margin:0 auto 24px; }
  @keyframes spin { to { transform:rotate(360deg); } }
  .loading-text { font-family:'Cormorant Garamond',serif; font-size:20px; font-style:italic; color:${p.textSoft}; }
  .card { background:${p.card}; border:1px solid ${p.muted}33; padding:40px; position:relative; overflow:hidden; }
  .card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,${p.accent}88,transparent); }
  .card-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:32px; padding-bottom:20px; border-bottom:1px solid ${p.muted}22; }
  .card-brand { font-size:8px; letter-spacing:0.5em; text-transform:uppercase; color:${p.accent}; }
  .card-type { font-size:9px; letter-spacing:0.25em; text-transform:uppercase; color:${p.muted}; }
  .grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:28px; }
  @media(max-width:480px){ .grid { grid-template-columns:1fr; } }
  .block { padding:20px; background:${p.surface}; border:1px solid ${p.muted}22; }
  .full { grid-column:1/-1; }
  .bl { font-size:8px; letter-spacing:0.4em; text-transform:uppercase; color:${p.accent}; margin-bottom:10px; }
  .bv { font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:300; color:${p.text}; line-height:1.4; }
  .bvsm { font-family:'Jost',sans-serif; font-size:12px; font-weight:300; color:${p.textSoft}; line-height:1.7; }
  .swatches { display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
  .swatch { width:32px; height:32px; border-radius:2px; }
  .swatch-name { font-size:7px; color:${p.muted}; margin-top:4px; text-align:center; letter-spacing:0.05em; }
  .action-row { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:36px; }
  .sig { text-align:center; margin-top:48px; font-size:9px; letter-spacing:0.3em; text-transform:uppercase; color:${p.muted}; }
  .result-wrap { padding:60px 24px 80px; max-width:700px; margin:0 auto; width:100%; }
`;

function Stars() {
  return (
    <div className="stars">
      {starPositions.map(s => (
        <div key={s.id} className="star" style={{ top:`${s.top}%`, left:`${s.left}%`, width:s.size, height:s.size, "--op":s.opacity, "--delay":`${s.delay}s` }} />
      ))}
      <div className="nebula" style={{ width:600, height:600, top:"-20%", right:"-15%", background:"#2A1060", opacity:0.25 }} />
      <div className="nebula" style={{ width:400, height:400, bottom:"-10%", left:"-10%", background:"#0D2B60", opacity:0.2 }} />
    </div>
  );
}

function Dots({ n }) {
  return (
    <div className="steps">
      {[1,2,3].map(i => <div key={i} className={`dot ${n>=i?"on":""}`} />)}
      <span style={{marginLeft:8}}>Step {n} of 3</span>
    </div>
  );
}

function Home({ onStart }) {
  const [quote] = useState(() => INSPIRATION[Math.floor(Math.random()*INSPIRATION.length)]);
  return (
    <div className="page">
      <div className="logo-mark">Cosmos · Studio</div>
      <h1 className="title">Design<br /><em>with</em><br />Intention</h1>
      <p className="subtitle">Your creative assistant to design photography sessions with intention</p>
      <button className="btn" onClick={onStart}>Design my session</button>
      <div className="insp">
        <div className="insp-label">Inspiration of the day</div>
        <div className="insp-quote">"{quote}"</div>
      </div>
      <div className="sig" style={{marginTop:48,position:"relative",zIndex:1}}>Creative System by Bernardita Aguirre</div>
    </div>
  );
}

function TypeScreen({ onContinue, onBack }) {
  const [sel, setSel] = useState(null);
  return (
    <div className="page">
      <button className="back" onClick={onBack}>← Back</button>
      <Dots n={1} />
      <h2 className="question">What type of session<br />are you planning?</h2>
      <div className="pills">
        {SESSION_TYPES.map(t => (
          <button key={t} className={`pill ${sel===t?"on":""}`} onClick={() => setSel(t)}>{t}</button>
        ))}
      </div>
      <button className="btn" disabled={!sel} onClick={() => onContinue(sel)}>Continue</button>
    </div>
  );
}

function DetailsScreen({ onGenerate, onBack }) {
  const [emotion, setEmotion] = useState(null);
  const [loc, setLoc] = useState(null);
  return (
    <div className="page">
      <button className="back" onClick={onBack}>← Back</button>
      <Dots n={2} />
      <div className="dual">
        <div className="q-block">
          <div className="q-label">What emotion do you want to transmit?</div>
          <div className="pills" style={{marginBottom:0}}>
            {EMOTIONS.map(e => <button key={e} className={`pill ${emotion===e?"on":""}`} onClick={() => setEmotion(e)}>{e}</button>)}
          </div>
        </div>
        <div className="q-block">
          <div className="q-label">Where will the session happen?</div>
          <div className="pills" style={{marginBottom:0}}>
            {LOCATIONS.map(l => <button key={l} className={`pill ${loc===l?"on":""}`} onClick={() => setLoc(l)}>{l}</button>)}
          </div>
        </div>
        <button className="btn" disabled={!emotion||!loc} onClick={() => onGenerate({emotion, loc})} style={{marginTop:8}}>
          Generate session plan
        </button>
      </div>
    </div>
  );
}

function Loading() {
  const phrases = ["Reading the light...","Composing the emotion...","Building your visual concept...","Defining the palette..."];
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(x => (x+1)%phrases.length), 1800); return () => clearInterval(t); }, []);
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
    const text = `COSMOS STUDIO — SESSION PLAN\nCreative System by Bernardita Aguirre\n${"─".repeat(40)}\n\nSESSION TYPE: ${sessionType}\n\nCONCEPT\n${plan.concept}\n\nEMOTION\n${plan.emotion}\n\nSCENARIO\n${plan.scenario}\n\nCOLOR PALETTE\n${plan.colorPalette?.map(c=>`${c.name}: ${c.hex}`).join("\n")}\n\nINTERACTIONS\n${plan.interactions}\n\nLIGHT\n${plan.light}\n\nEDITING STYLE\n${plan.editingStyle}\n\nMOODBOARD DIRECTION\n${plan.moodboardDirection}\n\n${"─".repeat(40)}\nMethod C.R.E.A.R · cosmos-studio.com`;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], {type:"text/plain"}));
    a.download = "COSMOS-Session-Plan.txt";
    a.click();
  };

  return (
    <div className="page" style={{justifyContent:"flex-start",paddingTop:60}}>
      <div className="result-wrap">
        <div style={{textAlign:"center",marginBottom:48}}>
          <div className="logo-mark" style={{marginBottom:16}}>Cosmos · Studio</div>
          <h2 className="title" style={{fontSize:"clamp(36px,7vw,60px)"}}>Your <em>Session</em> Plan</h2>
        </div>

        <div className="card">
          <div className="card-top">
            <span className="card-brand">COSMOS Studio</span>
            <span className="card-type">{sessionType} Session</span>
          </div>
          <div className="grid">
            <div className="block full"><div className="bl">Concept</div><div className="bv">{plan.concept}</div></div>
            <div className="block"><div className="bl">Emotion</div><div className="bv">{plan.emotion}</div></div>
            <div className="block"><div className="bl">Scenario</div><div className="bv">{plan.scenario}</div></div>
            <div className="block full">
              <div className="bl">Color Palette</div>
              <div className="swatches">
                {plan.colorPalette?.map((c,i) => (
                  <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <div className="swatch" style={{background:c.hex}} />
                    <div className="swatch-name">{c.name}</div>
                  </div>
                ))}
              </div>
              {plan.colorRationale && <div className="bvsm" style={{marginTop:20}}>{plan.colorRationale}</div>}
            </div>
            <div className="block full"><div className="bl">Interactions</div><div className="bvsm">{plan.interactions}</div></div>
            <div className="block"><div className="bl">Light</div><div className="bvsm">{plan.light}</div></div>
            <div className="block"><div className="bl">Editing Style</div><div className="bvsm">{plan.editingStyle}</div></div>
            <div className="block full"><div className="bl">Moodboard Direction</div><div className="bvsm">{plan.moodboardDirection}</div></div>
          </div>
          <div style={{textAlign:"center",paddingTop:20,borderTop:`1px solid ${p.muted}22`}}>
            <div style={{fontSize:8,letterSpacing:"0.4em",color:p.muted,textTransform:"uppercase"}}>Method C.R.E.A.R · Creative System by Bernardita Aguirre</div>
          </div>
        </div>

        <div className="action-row">
          <button className="btn" onClick={download}>Download session plan</button>
          <button className="btn-ghost" onClick={onReset}>Design another session</button>
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

    const prompt = `You are COSMOS Studio, a creative assistant for photography sessions based on the C.R.E.A.R method by fine art photographer Bernardita Aguirre.

Generate a structured photography session plan for:
- Session type: ${sessionT}
- Desired emotion: ${det.emotion}
- Location: ${det.loc}

Respond ONLY with a valid JSON object (no markdown, no code blocks) with these exact keys:
{
  "concept": "A poetic one-line visual concept (under 15 words)",
  "emotion": "How this emotion will be expressed visually (2-3 sentences)",
  "scenario": "Specific scene setup within the chosen location (2-3 sentences)",
  "colorPalette": [
    {"name": "Color name", "hex": "#HEXCODE"},
    {"name": "Color name", "hex": "#HEXCODE"},
    {"name": "Color name", "hex": "#HEXCODE"},
    {"name": "Color name", "hex": "#HEXCODE"}
  ],
  "colorRationale": "Why these colors serve the emotion and concept (1-2 sentences)",
  "interactions": "3-4 specific interaction directions to create natural non-posed moments",
  "light": "Light quality, direction, time of day, and technique (2-3 sentences)",
  "editingStyle": "Post-processing tone, contrast, color grading direction (2 sentences)",
  "moodboardDirection": "Description of 4-5 visual references or aesthetics that inspire this session"
}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
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
      setError("Something went wrong. Please try again.");
      setScreen("details");
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: css}} />
      <div className="app">
        <Stars />
        {screen==="home" && <Home onStart={() => setScreen("type")} />}
        {screen==="type" && <TypeScreen onContinue={t => { setSessionType(t); setScreen("details"); }} onBack={() => setScreen("home")} />}
        {screen==="details" && <DetailsScreen onGenerate={det => generate(sessionType, det)} onBack={() => setScreen("type")} />}
        {screen==="loading" && <Loading />}
        {screen==="result" && <Result plan={plan} sessionType={sessionType} onReset={() => { setScreen("home"); setPlan(null); setSessionType(null); }} />}
        {error && (
          <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"#1a0a0a",border:"1px solid #ff6b6b44",color:"#ff9999",padding:"12px 24px",fontSize:12,fontFamily:"Jost,sans-serif",letterSpacing:"0.1em",zIndex:100}}>
            {error}
          </div>
        )}
      </div>
    </>
  );
}
