import React, { useEffect, useRef, useState } from "react";

// ─── STYLES ──────────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600&display=swap');
  :root {
    --bg: #020c04; --bg2: #050f06; --green: #00ff41; --cyan: #00e5ff;
    --orange: #ff6d00; --card: #071209; --border: #0d2b10;
    --glow-g: 0 0 8px #00ff4180, 0 0 20px #00ff4130;
    --glow-c: 0 0 8px #00e5ff80, 0 0 20px #00e5ff30;
    --glow-o: 0 0 8px #ff6d0080, 0 0 20px #ff6d0030;
    --font-mono: 'Share Tech Mono', monospace;
    --font-hud: 'Orbitron', sans-serif;
    --font-body: 'Rajdhani', sans-serif;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: #c8e6c9; font-family: var(--font-body); overflow-x: hidden; cursor: none; }
  body::before {
    content: ''; position: fixed; inset: 0;
    background: repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,65,.015) 2px,rgba(0,255,65,.015) 4px);
    pointer-events: none; z-index: 1000;
  }
  body::after {
    content: ''; position: fixed; inset: 0;
    background-image: linear-gradient(rgba(0,255,65,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,65,.03) 1px,transparent 1px);
    background-size: 40px 40px; pointer-events: none; z-index: 0;
  }
  @keyframes spin { from { transform: rotateX(0) rotateY(0); } to { transform: rotateX(360deg) rotateY(360deg); } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes blink { 50% { opacity: 0; } }
  @keyframes expand { to { transform: scaleX(1); } }
  @keyframes rain-fall { 0% { transform: translateY(-100%); } 100% { transform: translateY(200vh); } }
  @keyframes pulse-line { 0%,100% { opacity: .4; } 50% { opacity: 1; } }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const ROLES = ["AI Builder", "Software Engineer", "Automation Expert", "Ethical Hacker", "SaaS Architect"];

const PROJECTS = [
  { id: "001", title: "AI DEV TEAM ORCHESTRATOR", desc: "Multi-agent AI system using local Ollama models. Routes tasks to specialized agents — planner, coder, reviewer — running entirely on-device.", tags: [["AI","ai"],["AUTOMATION","auto"],["TOOLS","tools"]] },
  { id: "002", title: "ONE-SCRIPT SALES ENGINE", desc: "End-to-end lead automation pipeline. One script handles outreach, follow-ups, and CRM updates — zero manual work in the funnel.", tags: [["AUTOMATION","auto"],["TOOLS","tools"]] },
  { id: "003", title: "TERMINAL AI SYSTEM", desc: "Local AI assistant running via terminal. Fully offline, built on Ollama. Responds to commands, reads files, and executes scripted workflows.", tags: [["AI","ai"],["TOOLS","tools"]] },
  { id: "004", title: "3D WEB EXPERIMENTS", desc: "Interactive 3D UI concepts built with Spline. CSS-driven animations and spatial interfaces — exploring the future of the web, lightweight.", tags: [["WEB","web"],["CREATIVE","ai"]] },
];

const SKILLS = [
  { icon: "🤖", name: "AI & AUTOMATION", tags: ["Ollama","LangChain","Multi-Agent","Prompt Eng.","Claude API"] },
  { icon: "⚡", name: "FRONTEND", tags: ["React","Tailwind","CSS Animations","HTML5","JavaScript"] },
  { icon: "🔧", name: "BACKEND & TOOLS", tags: ["Python","Node.js","REST APIs","Bash","Git"] },
  { icon: "🔐", name: "ETHICAL HACKING", tags: ["Recon","OSINT","Network Analysis","Kali Linux","CTF"] },
];

const TERMINAL_LINES = [
  { cls: "comment", text: "# ABDULHAMEED AMIN — SYSTEM PROFILE" },
  { cls: "prompt",  text: "$ whoami" },
  { cls: "out",     text: "> abdulhameed :: ai-builder :: software-engineer :: ethical-hacker" },
  { cls: "prompt",  text: "$ ls projects/" },
  { cls: "out",     text: "> ai-dev-team-orchestrator/   one-script-sales-engine/" },
  { cls: "out",     text: "> terminal-ai-system/         3d-web-experiments/" },
  { cls: "prompt",  text: "$ cat mission.txt" },
  { cls: "out",     text: "> Help people buy back their time through AI & automation." },
  { cls: "prompt",  text: "$ status --all" },
  { cls: "out",     text: "> [✓] AI Systems: ONLINE  [✓] Automation: RUNNING  [✓] Hacking: ACTIVE" },
  { cls: "prompt",  text: "$ _" },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Cursor() {
  const curRef = useRef(null);
  const trailRef = useRef(null);
  useEffect(() => {
    const move = e => {
      if (curRef.current) { curRef.current.style.left = e.clientX + "px"; curRef.current.style.top = e.clientY + "px"; }
      setTimeout(() => { if (trailRef.current) { trailRef.current.style.left = e.clientX + "px"; trailRef.current.style.top = e.clientY + "px"; } }, 80);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div ref={curRef} style={{ position:"fixed",width:12,height:12,border:"2px solid var(--green)",borderRadius:"50%",pointerEvents:"none",zIndex:9999,transform:"translate(-50%,-50%)",boxShadow:"var(--glow-g)",transition:"transform .1s" }} />
      <div ref={trailRef} style={{ position:"fixed",width:30,height:30,border:"1px solid #00ff4140",borderRadius:"50%",pointerEvents:"none",zIndex:9998,transform:"translate(-50%,-50%)",transition:"left .12s, top .12s" }} />
    </>
  );
}

function Cube() {
  const faces = ["REACT","AI","BUILD","AUTO","CODE","HACK"];
  const transforms = ["rotateY(0deg) translateZ(80px)","rotateY(90deg) translateZ(80px)","rotateY(180deg) translateZ(80px)","rotateY(270deg) translateZ(80px)","rotateX(90deg) translateZ(80px)","rotateX(-90deg) translateZ(80px)"];
  const bgs = ["rgba(0,255,65,.05)","rgba(0,229,255,.05)","rgba(255,109,0,.05)","rgba(0,255,65,.03)","rgba(0,229,255,.03)","rgba(255,109,0,.03)"];
  return (
    <div style={{ width:160,height:160,perspective:600,margin:"50px auto 0",animation:"fadeIn 1s 1.2s ease both",opacity:0 }}>
      <div style={{ width:"100%",height:"100%",position:"relative",transformStyle:"preserve-3d",animation:"spin 12s linear infinite" }}>
        {faces.map((f,i) => (
          <div key={i} style={{ position:"absolute",width:"100%",height:"100%",border:"1px solid #00ff4160",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--font-hud)",fontSize:10,letterSpacing:2,color:"#00ff4180",transform:transforms[i],background:bgs[i] }}>{f}</div>
        ))}
      </div>
    </div>
  );
}

function TypingRole() {
  const [text, setText] = useState("");
  const [ri, setRi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = ROLES[ri];
    const delay = deleting ? 60 : (ci === word.length ? 1800 : 100);
    const t = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, ci + 1));
        if (ci + 1 === word.length) setDeleting(true);
        else setCi(c => c + 1);
      } else {
        setText(word.slice(0, ci - 1));
        if (ci - 1 === 0) { setDeleting(false); setRi(r => (r + 1) % ROLES.length); setCi(0); }
        else setCi(c => c - 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, ri, ci, deleting]);
  return (
    <div style={{ fontFamily:"var(--font-mono)",fontSize:"clamp(14px,2.5vw,20px)",color:"var(--cyan)",textShadow:"var(--glow-c)",minHeight:28,animation:"fadeIn 1s .6s ease both",opacity:0 }}>
      {text}<span style={{ display:"inline-block",width:2,height:"1em",background:"var(--cyan)",marginLeft:2,animation:"blink .7s step-end infinite",verticalAlign:"middle" }} />
    </div>
  );
}

function Rain() {
  const chars = "01アイウエオカキABCDEFGHIJKLMN";
  return (
    <div style={{ position:"absolute",inset:0,overflow:"hidden",zIndex:0 }}>
      {Array.from({length:20},(_,i) => (
        <div key={i} style={{ position:"absolute",top:"-100%",left:`${i*5.5}%`,width:20,fontFamily:"var(--font-mono)",fontSize:12+Math.random()*4,color:"var(--green)",opacity:.15,whiteSpace:"nowrap",lineHeight:1.4,animation:`rain-fall ${8+Math.random()*10}s linear ${-Math.random()*10}s infinite` }}>
          {Array.from({length:30},(_,j) => <div key={j}>{chars[Math.floor(Math.random()*chars.length)]}</div>)}
        </div>
      ))}
    </div>
  );
}

function Terminal({ onClose }) {
  const bodyRef = useRef(null);
  const [lines, setLines] = useState([]);
  useEffect(() => {
    TERMINAL_LINES.forEach((l, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, l]);
        if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }, i * 130);
    });
  }, []);
  const colorMap = { comment:"#2e7d32", prompt:"var(--cyan)", out:"#69f0ae" };
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.95)",zIndex:800,display:"flex",alignItems:"center",justifyContent:"center" }}>
      <div style={{ width:"min(700px,90vw)",background:"#020c04",border:"1px solid #00ff4150",overflow:"hidden",boxShadow:"0 0 60px rgba(0,255,65,.15)" }}>
        <div style={{ background:"#0a1a0b",padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #0d2b10" }}>
          <div style={{ display:"flex",gap:8 }}>
            {["#ff5f57","#febc2e","#28c840"].map((c,i) => <span key={i} style={{ width:12,height:12,borderRadius:"50%",background:c,display:"block" }} />)}
          </div>
          <span style={{ fontFamily:"var(--font-mono)",fontSize:11,color:"#4caf50",letterSpacing:3 }}>ABDULHAMEED@ETCHERO:~</span>
          <button onClick={onClose} style={{ background:"none",border:"none",color:"#4caf50",fontFamily:"var(--font-mono)",fontSize:16,cursor:"pointer" }}>✕</button>
        </div>
        <div ref={bodyRef} style={{ padding:24,fontFamily:"var(--font-mono)",fontSize:13,lineHeight:2,maxHeight:400,overflowY:"auto" }}>
          {lines.map((l,i) => (
            <div key={i} style={{ color:colorMap[l.cls],animation:"fadeIn .3s ease both" }}>
              {l.text}{i===lines.length-1 && <span style={{ display:"inline-block",width:8,height:13,background:"var(--green)",animation:"blink .7s step-end infinite",verticalAlign:"middle" }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [termOpen, setTermOpen] = useState(false);
  const tagColors = { ai:"#00e5ff", auto:"#ff6d00", web:"#00ff41", tools:"#e040fb" };

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity="1"; e.target.style.transform="translateY(0)"; } });
    }, { threshold: .1 });
    els.forEach(el => { el.style.opacity="0"; el.style.transform="translateY(30px)"; el.style.transition="opacity .6s ease, transform .6s ease"; obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{globalStyles}</style>
      <Cursor />
      {termOpen && <Terminal onClose={() => setTermOpen(false)} />}

      {/* NAV */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:500,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 40px",background:"linear-gradient(180deg,rgba(2,12,4,.95) 0%,transparent 100%)",borderBottom:"1px solid #00ff4115" }}>
        <span style={{ fontFamily:"var(--font-hud)",fontSize:13,color:"var(--green)",letterSpacing:4,textShadow:"var(--glow-g)" }}>ETCH/ERO</span>
        <div style={{ display:"flex",gap:32 }}>
          {["ABOUT","SKILLS","PROJECTS","CONTACT"].map(s => (
            <a key={s} href={`#${s.toLowerCase()}`} style={{ fontFamily:"var(--font-mono)",fontSize:12,color:"#4caf50",textDecoration:"none",letterSpacing:2,transition:"color .2s" }}
              onMouseEnter={e=>e.target.style.color="var(--green)"} onMouseLeave={e=>e.target.style.color="#4caf50"}>{s}</a>
          ))}
        </div>
        <button onClick={() => setTermOpen(true)} style={{ fontFamily:"var(--font-mono)",fontSize:11,padding:"6px 14px",background:"transparent",border:"1px solid var(--orange)",color:"var(--orange)",cursor:"none",letterSpacing:2,transition:"all .2s",textShadow:"var(--glow-o)" }}
          onMouseEnter={e=>{e.target.style.background="var(--orange)";e.target.style.color="#000";}} onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color="var(--orange)";}}>[ TERMINAL ]</button>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",zIndex:1 }}>
        <Rain />
        <div style={{ position:"relative",zIndex:2,textAlign:"center",padding:20 }}>
          <div style={{ fontFamily:"var(--font-mono)",fontSize:12,color:"var(--orange)",letterSpacing:4,marginBottom:16,textShadow:"var(--glow-o)",animation:"fadeIn .8s ease both" }}>// SYSTEM ONLINE — PORTFOLIO v2.0</div>
          <h1 style={{ fontFamily:"var(--font-hud)",fontSize:"clamp(36px,6vw,72px)",fontWeight:900,letterSpacing:6,lineHeight:1.1,marginBottom:8,background:"linear-gradient(135deg,#00ff41,#00e5ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",filter:"drop-shadow(0 0 20px #00ff4160)",animation:"fadeIn 1s .2s ease both",opacity:0 }}>ABDULHAMEED AMIN</h1>
          <div style={{ width:200,height:2,background:"linear-gradient(90deg,transparent,var(--orange),transparent)",margin:"20px auto",animation:"expand .8s .4s ease both",transform:"scaleX(0)" }} />
          <TypingRole />
          <div style={{ marginTop:40,display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap",animation:"fadeIn 1s 1s ease both",opacity:0 }}>
            <button onClick={()=>document.querySelector('#projects').scrollIntoView({behavior:'smooth'})} style={{ fontFamily:"var(--font-mono)",fontSize:13,padding:"12px 28px",background:"transparent",border:"1px solid var(--green)",color:"var(--green)",cursor:"none",letterSpacing:2,transition:"all .25s" }}
              onMouseEnter={e=>{e.target.style.background="var(--green)";e.target.style.color="#000";e.target.style.boxShadow="var(--glow-g)";}} onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color="var(--green)";e.target.style.boxShadow="none";}}>VIEW_PROJECTS</button>
            <button onClick={()=>document.querySelector('#contact').scrollIntoView({behavior:'smooth'})} style={{ fontFamily:"var(--font-mono)",fontSize:13,padding:"12px 28px",background:"transparent",border:"1px solid var(--cyan)",color:"var(--cyan)",cursor:"none",letterSpacing:2,transition:"all .25s" }}
              onMouseEnter={e=>{e.target.style.background="var(--cyan)";e.target.style.color="#000";}} onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color="var(--cyan)";}}>INIT_CONTACT</button>
          </div>
          <Cube />
        </div>
        <div style={{ position:"absolute",bottom:30,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,animation:"fadeIn 1s 2s ease both",opacity:0 }}>
          <span style={{ fontFamily:"var(--font-mono)",fontSize:10,color:"#4caf50",letterSpacing:3 }}>SCROLL</span>
          <div style={{ width:1,height:40,background:"linear-gradient(180deg,var(--green),transparent)",animation:"pulse-line 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ position:"relative",zIndex:1,padding:"100px 40px",background:"linear-gradient(180deg,var(--bg) 0%,var(--bg2) 100%)" }}>
        <div style={{ textAlign:"center",marginBottom:60 }}>
          <span style={{ fontFamily:"var(--font-mono)",fontSize:11,color:"var(--orange)",letterSpacing:5,display:"block",marginBottom:12 }}>// 01 — ABOUT_ME</span>
          <h2 style={{ fontFamily:"var(--font-hud)",fontSize:"clamp(24px,4vw,40px)",fontWeight:700,letterSpacing:4,background:"linear-gradient(135deg,#fff,#c8e6c9)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>WHO AM I</h2>
          <div style={{ width:80,height:2,background:"linear-gradient(90deg,var(--orange),var(--cyan))",margin:"16px auto 0" }} />
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,maxWidth:900,margin:"0 auto",alignItems:"center" }} className="about-grid">
          <div>
            {["I'm a <software engineer> and <AI builder> based in Abuja, Nigeria operating at the intersection of automation, intelligence, and systems design.","I build tools that <eliminate repetitive work>, orchestrate AI agents, and help founders and freelancers buy back their time.","Passionate about <ethical hacking>, clean architecture, and turning complex ideas into working software — fast."].map((p,i) => (
              <p key={i} className="reveal" style={{ fontSize:16,lineHeight:1.9,color:"#a5d6a7",marginBottom:16,fontWeight:300 }}
                dangerouslySetInnerHTML={{ __html: p.replace(/<([^>]+)>/g, '<span style="color:var(--cyan);font-family:var(--font-mono);font-size:14px">$1</span>') }} />
            ))}
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
            {[["4+","PROJECTS SHIPPED"],["AI","CORE FOCUS"],["∞","AUTOMATION IDEAS"],["01","BUY BACK TIME"]].map(([n,l],i) => (
              <div key={i} className="reveal" style={{ background:"var(--card)",border:"1px solid var(--border)",padding:20,textAlign:"center",position:"relative",overflow:"hidden",transition:"border-color .3s" }}>
                <div style={{ position:"absolute",top:0,left:0,width:"100%",height:2,background:"linear-gradient(90deg,var(--green),var(--cyan))" }} />
                <div style={{ fontFamily:"var(--font-hud)",fontSize:28,fontWeight:900,color:"var(--green)",textShadow:"var(--glow-g)" }}>{n}</div>
                <div style={{ fontFamily:"var(--font-mono)",fontSize:10,color:"#4caf50",letterSpacing:2,marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ position:"relative",zIndex:1,padding:"100px 40px",background:"var(--bg)" }}>
        <div style={{ textAlign:"center",marginBottom:60 }}>
          <span style={{ fontFamily:"var(--font-mono)",fontSize:11,color:"var(--orange)",letterSpacing:5,display:"block",marginBottom:12 }}>// 02 — SKILL_SET</span>
          <h2 style={{ fontFamily:"var(--font-hud)",fontSize:"clamp(24px,4vw,40px)",fontWeight:700,letterSpacing:4,background:"linear-gradient(135deg,#fff,#c8e6c9)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>CAPABILITIES</h2>
          <div style={{ width:80,height:2,background:"linear-gradient(90deg,var(--orange),var(--cyan))",margin:"16px auto 0" }} />
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:24,maxWidth:1000,margin:"0 auto" }}>
          {SKILLS.map((s,i) => (
            <div key={i} className="reveal" style={{ background:"var(--card)",border:"1px solid var(--border)",padding:28,transition:"all .3s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#00ff4140";e.currentTarget.style.transform="translateY(-4px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.transform="";}}>
              <div style={{ fontSize:24,marginBottom:12 }}>{s.icon}</div>
              <div style={{ fontFamily:"var(--font-hud)",fontSize:13,letterSpacing:3,color:"var(--cyan)",marginBottom:16,textShadow:"var(--glow-c)" }}>{s.name}</div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                {s.tags.map((t,j) => <span key={j} style={{ fontFamily:"var(--font-mono)",fontSize:10,padding:"4px 10px",border:"1px solid #00ff4130",color:"#69f0ae",background:"rgba(0,255,65,.04)",letterSpacing:1 }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ position:"relative",zIndex:1,padding:"100px 40px",background:"var(--bg2)" }}>
        <div style={{ textAlign:"center",marginBottom:60 }}>
          <span style={{ fontFamily:"var(--font-mono)",fontSize:11,color:"var(--orange)",letterSpacing:5,display:"block",marginBottom:12 }}>// 03 — PROJECTS</span>
          <h2 style={{ fontFamily:"var(--font-hud)",fontSize:"clamp(24px,4vw,40px)",fontWeight:700,letterSpacing:4,background:"linear-gradient(135deg,#fff,#c8e6c9)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>WHAT I'VE BUILT</h2>
          <div style={{ width:80,height:2,background:"linear-gradient(90deg,var(--orange),var(--cyan))",margin:"16px auto 0" }} />
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24,maxWidth:1100,margin:"0 auto" }}>
          {PROJECTS.map((p,i) => (
            <div key={i} className="reveal" style={{ background:"var(--card)",border:"1px solid var(--border)",padding:28,position:"relative",overflow:"hidden",transition:"all .35s",cursor:"none" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#00ff4130";e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 20px 40px rgba(0,0,0,.6),0 0 30px rgba(0,255,65,.05)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
              <div style={{ fontFamily:"var(--font-hud)",fontSize:11,color:"var(--orange)",letterSpacing:3,marginBottom:12,opacity:.8 }}>PROJECT_{p.id}</div>
              <div style={{ fontFamily:"var(--font-hud)",fontSize:17,fontWeight:700,letterSpacing:2,color:"#e8f5e9",marginBottom:10 }}>{p.title}</div>
              <div style={{ fontSize:14,color:"#81c784",lineHeight:1.7,marginBottom:20,fontWeight:300 }}>{p.desc}</div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:20 }}>
                {p.tags.map(([label,type],j) => <span key={j} style={{ fontFamily:"var(--font-mono)",fontSize:9,padding:"3px 10px",letterSpacing:1.5,border:`1px solid ${tagColors[type]}40`,color:tagColors[type],background:`${tagColors[type]}10` }}>{label}</span>)}
              </div>
              <a href="#" style={{ fontFamily:"var(--font-mono)",fontSize:11,color:"var(--green)",letterSpacing:2,textDecoration:"none" }}>EXPLORE →</a>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ position:"relative",zIndex:1,padding:"100px 40px",background:"var(--bg)" }}>
        <div style={{ textAlign:"center",marginBottom:60 }}>
          <span style={{ fontFamily:"var(--font-mono)",fontSize:11,color:"var(--orange)",letterSpacing:5,display:"block",marginBottom:12 }}>// 04 — CONTACT</span>
          <h2 style={{ fontFamily:"var(--font-hud)",fontSize:"clamp(24px,4vw,40px)",fontWeight:700,letterSpacing:4,background:"linear-gradient(135deg,#fff,#c8e6c9)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>INIT CONNECTION</h2>
          <div style={{ width:80,height:2,background:"linear-gradient(90deg,var(--orange),var(--cyan))",margin:"16px auto 0" }} />
        </div>
        <div style={{ maxWidth:600,margin:"0 auto",textAlign:"center" }}>
          <p style={{ fontSize:16,color:"#81c784",lineHeight:1.9,marginBottom:40,fontWeight:300 }}>Got a project? Want to collaborate? Ready to automate something? Let's talk.</p>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:16,marginBottom:40 }}>
            {[["📧","EMAIL","abdulhameed@etchero.com"],["🐙","GITHUB","github.com/ethical"],["💼","LINKEDIN","in/abdulhameedamin"]].map(([icon,label,val],i) => (
              <div key={i} className="reveal" style={{ background:"var(--card)",border:"1px solid var(--border)",padding:20,transition:"all .3s",cursor:"none" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#00ff4140";e.currentTarget.style.transform="translateY(-4px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.transform="";}}>
                <div style={{ fontSize:22,marginBottom:8 }}>{icon}</div>
                <div style={{ fontFamily:"var(--font-mono)",fontSize:10,color:"var(--orange)",letterSpacing:2,marginBottom:4 }}>{label}</div>
                <div style={{ fontFamily:"var(--font-mono)",fontSize:12,color:"var(--cyan)" }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:16,textAlign:"left" }}>
            {[["YOUR_NAME","text","Enter identifier..."],["YOUR_EMAIL","email","Enter contact address..."]].map(([label,type,ph]) => (
              <div key={label} style={{ display:"flex",flexDirection:"column",gap:6 }}>
                <label style={{ fontFamily:"var(--font-mono)",fontSize:10,color:"var(--orange)",letterSpacing:3 }}>{label}</label>
                <input type={type} placeholder={ph} style={{ background:"var(--card)",border:"1px solid var(--border)",color:"#c8e6c9",padding:"12px 16px",fontFamily:"var(--font-mono)",fontSize:13,outline:"none" }} onFocus={e=>e.target.style.borderColor="#00ff4140"} onBlur={e=>e.target.style.borderColor="var(--border)"} />
              </div>
            ))}
            <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
              <label style={{ fontFamily:"var(--font-mono)",fontSize:10,color:"var(--orange)",letterSpacing:3 }}>MESSAGE</label>
              <textarea rows={4} placeholder="Describe your mission..." style={{ background:"var(--card)",border:"1px solid var(--border)",color:"#c8e6c9",padding:"12px 16px",fontFamily:"var(--font-mono)",fontSize:13,outline:"none",resize:"none" }} onFocus={e=>e.target.style.borderColor="#00ff4140"} onBlur={e=>e.target.style.borderColor="var(--border)"} />
            </div>
            <button style={{ fontFamily:"var(--font-hud)",fontSize:13,padding:14,background:"transparent",border:"1px solid var(--green)",color:"var(--green)",cursor:"none",letterSpacing:4,transition:"all .25s",marginTop:8 }}
              onMouseEnter={e=>{e.target.style.background="var(--green)";e.target.style.color="#000";e.target.style.boxShadow="var(--glow-g)";}} onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color="var(--green)";e.target.style.boxShadow="none";}}>TRANSMIT_MESSAGE</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"var(--bg)",borderTop:"1px solid var(--border)",padding:"30px 40px",textAlign:"center",position:"relative",zIndex:1 }}>
        <p style={{ fontFamily:"var(--font-mono)",fontSize:11,color:"#2e7d32",letterSpacing:2 }}>
          © 2025 <span style={{ color:"var(--green)" }}>ABDULHAMEED AMIN</span> — BUILT WITH REACT — <span style={{ color:"var(--green)" }}>ETCHERO</span>
        </p>
      </footer>
    </>
  );
}
