import React, { useState, useEffect } from 'react';
import { ShieldCheck, Activity, Globe, Terminal, Lock, Server, Settings, LogOut, Radio, Key, Clock, ChevronRight } from 'lucide-react';


// Main Shield Logo Component
const StrongholdLogo = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 15 L80 32.5 L80 67.5 L50 85 L20 67.5 L20 32.5 Z" stroke="#0f766e" strokeWidth="6" strokeLinejoin="round"/>
    <path d="M50 25 L70 37.5 L70 62.5 L50 75 L30 62.5 L30 37.5 Z" stroke="#1e3a8a" strokeWidth="4" strokeLinejoin="round"/>
    <circle cx="50" cy="15" r="5" fill="#0f766e"/>
    <circle cx="80" cy="32.5" r="5" fill="#0f766e"/>
    <circle cx="80" cy="67.5" r="5" fill="#1e3a8a"/>
    <circle cx="50" cy="85" r="5" fill="#1e3a8a"/>
    <circle cx="20" cy="67.5" r="5" fill="#1e3a8a"/>
    <circle cx="20" cy="32.5" r="5" fill="#0f766e"/>
    <path d="M38 40 L62 40 L62 52 C62 65 50 72 50 72 C50 72 38 65 38 52 Z" fill="#ca8a04" stroke="#eab308" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);


// Monolith Keep Logo Component (Tower with 'S' cutout)
const MonolithLogo = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <mask id="s-cutout">
        <rect width="100" height="100" fill="white" />
        <path d="M 65 35 L 35 35 L 35 52 L 55 52 L 55 58 L 35 58 L 35 65 L 65 65 L 65 48 L 45 48 L 45 42 L 65 42 Z" fill="black" />
      </mask>
    </defs>
    <path d="M 15 85 L 85 85 L 85 75 L 75 75 L 70 35 L 80 35 L 80 20 L 65 20 L 65 28 L 55 28 L 55 20 L 45 20 L 45 28 L 35 28 L 35 20 L 20 20 L 20 35 L 30 35 L 25 75 L 15 75 Z" fill="#ca8a04" mask="url(#s-cutout)"/>
  </svg>
);


// Simulated Terminal Logs
const MOCK_LOGS = [
  "[NET] Handshake established with Node 42 (Miami, FL).",
  "[ENC] AES-256-GCM tunnel integrity verified.",
  "[ROUT] Bypassing localized ISP deep packet inspection...",
  "[SYS] Perfect Forward Secrecy key rotation complete.",
  "[DEF] Anomalous ping deflected from external IP 198.51.x.x",
  "[NET] Packet latency stabilized at 12ms.",
  "[DEF] Tracker payload nullified on incoming HTTPS request.",
  "[ENC] Cryptographic handshake re-negotiated seamlessly."
];


export default function App() {
  const [currentTab, setCurrentTab] = useState("Live Telemetry");
  const [logs, setLogs] = useState(["[SYS] Initializing Privileged Comms. Vector..."]);
  const [packetsSecured, setPacketsSecured] = useState(1482934);
  const [uptime, setUptime] = useState(0);
  const [topologyText, setTopologyText] = useState("POINT CONTROL VECTORS");
  const [fadeClass, setFadeClass] = useState("opacity-100");


  // PCV Acronym Cycler
  useEffect(() => {
    const pcvPhrases = [
      "POINT CONTROL VECTORS",
      "PORTAL CONNECTIVITY VISUAL",
      "PACKET CAPTURE VISUALIZED",
      "PROXY CLIENT VANGUARD",
      "PASSTHROUGH COMPLEXITY",
      "PROACTIVE CONFIGURATION",
      "PRIVATE CHANNEL VERIFIED"
    ];
    let i = 0;
   
    const interval = setInterval(() => {
      setFadeClass("opacity-0");
     
      setTimeout(() => {
        i = (i + 1) % pcvPhrases.length;
        setTopologyText(pcvPhrases[i]);
        setFadeClass("opacity-100");
      }, 300);
     
    }, 8500);


    return () => clearInterval(interval);
  }, []);


  // Simulate active dashboard data
  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [...prev, MOCK_LOGS[Math.floor(Math.random() * MOCK_LOGS.length)]];
        return newLogs.slice(-8);
      });
    }, 3500);


    const packetInterval = setInterval(() => {
      if (currentTab === "Live Telemetry") {
        setPacketsSecured(prev => prev + Math.floor(Math.random() * 85) + 10);
      }
    }, 150);


    const uptimeInterval = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);


    return () => {
      clearInterval(logInterval);
      clearInterval(packetInterval);
      clearInterval(uptimeInterval);
    };
  }, [currentTab]);


  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };


  return (
    <div className="flex h-screen bg-[#020617] text-slate-300 font-sans overflow-hidden selection:bg-teal-500/30">
     
      {/* Background ambient glow - deepened blue/teal mix */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-900/10 blur-[150px] pointer-events-none z-0"></div>


      {/* Sidebar */}
      <aside className="w-20 lg:w-64 border-r border-slate-800/80 bg-[#020617]/90 backdrop-blur-xl relative z-20 flex flex-col justify-between py-6 transition-all">
        <div>
          <div className="flex justify-center lg:justify-start lg:px-6 items-center gap-3 mb-12 cursor-pointer" onClick={() => setCurrentTab("Live Telemetry")}>
            <StrongholdLogo className="w-10 h-10 drop-shadow-[0_0_8px_rgba(202,138,4,0.3)]" />
            <div className="hidden lg:block">
              <h1 className="text-sm font-bold text-white tracking-widest leading-none">STRONGHOLD</h1>
              <span className="text-[0.55rem] text-teal-500 tracking-[0.2em] font-bold uppercase">PORTAL_OS v1.0</span>
            </div>
          </div>


          <nav className="flex flex-col gap-2 px-3">
            <NavItem icon={<Activity />} label="Live Telemetry" active={currentTab === "Live Telemetry"} onClick={() => setCurrentTab("Live Telemetry")} />
            <NavItem icon={<Globe />} label="Global Topology" active={currentTab === "Global Topology"} onClick={() => setCurrentTab("Global Topology")} />
            <NavItem icon={<Terminal />} label="Protocol Audit" active={currentTab === "Protocol Audit"} onClick={() => setCurrentTab("Protocol Audit")} />
            <NavItem icon={<Server />} label="Vector Control" active={currentTab === "Vector Control"} onClick={() => setCurrentTab("Vector Control")} />
            <NavItem icon={<Settings />} label="Core Settings" active={currentTab === "Core Settings"} onClick={() => setCurrentTab("Core Settings")} />
          </nav>
        </div>


        <div className="px-3">
          <NavItem icon={<LogOut />} label="Sever Connection" danger onClick={() => console.log("Disconnecting...")} />
        </div>
      </aside>


      {/* Main Dashboard Content */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
       
        {/* Top Header */}
        <header className="h-20 border-b border-slate-800/50 flex items-center justify-between px-8 bg-slate-950/30 backdrop-blur-sm">
         
          {/* Sneaky Monolith Branding */}
          <div className="flex flex-col gap-1.5 justify-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse"></div>
              <span className="text-[0.65rem] font-bold tracking-widest text-green-400 uppercase drop-shadow-[0_0_2px_rgba(34,197,94,0.4)]">
                PRIVATE CONNECTION VIA
              </span>
            </div>
            <div className="flex items-center gap-2 pl-5 opacity-70">
              <MonolithLogo className="w-4 h-4 drop-shadow-md" />
              <span className="text-[0.65rem] font-black tracking-widest text-slate-300 uppercase">Stronghold VPN</span>
            </div>
          </div>


          {/* User ID */}
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-white">Phil Carpenter</div>
              <div className="text-[0.6rem] text-slate-500 uppercase tracking-widest font-mono">ID: PCV-ALPHA-001</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden shadow-inner">
              <span className="text-teal-500 font-bold font-mono">PC</span>
            </div>
          </div>
        </header>


        {/* Dashboard Grid - Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {currentTab === "Live Telemetry" ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto h-full animate-[fadeIn_0.3s_ease-in-out]">
             
              {/* Left Column (Stats & Map) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
               
                {/* Top Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <StatCard
                    title="Packets Secured"
                    value={packetsSecured.toLocaleString()}
                    icon={<ShieldCheck className="w-5 h-5 text-teal-400" />}
                    color="teal"
                  />
                  <StatCard
                    title="Active Uptime"
                    value={formatUptime(uptime)}
                    icon={<Clock className="w-5 h-5 text-yellow-500" />}
                    color="yellow"
                    valueClassName="font-mono font-black tracking-tight"
                  />
                  <StatCard
                    title="Current Node"
                    value="Miami, FL"
                    subtitle="Latency: 12ms"
                    icon={<Radio className="w-5 h-5 text-indigo-400" />}
                    color="indigo"
                    valueClassName="font-medium text-xl tracking-wide"
                  />
                </div>


                {/* Node Network Map (Hero Element) */}
                <div className="flex-1 min-h-[400px] bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
                 
                  <div className="flex justify-between items-start relative z-10 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Global Routing Topology</h3>
                      <p className={`text-xs text-slate-500 uppercase tracking-widest font-mono transition-opacity duration-300 ${fadeClass}`}>
                        {topologyText}
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-green-950/30 border border-green-900/50 rounded-md text-[0.6rem] text-green-400 font-mono tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      ROUTING OPTIMAL
                    </div>
                  </div>


                  {/* Abstract Glowing Node SVG Map - Deep Indigo */}
                  <div className="absolute inset-0 flex items-center justify-center mt-10">
                    <svg className="w-full max-w-2xl h-auto opacity-80" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M150 200 Q 250 100 400 200 T 650 200" stroke="#0f766e" strokeWidth="2" strokeDasharray="5 5" className="animate-[dash_20s_linear_infinite]" />
                      <path d="M250 300 Q 400 250 550 150" stroke="#4338ca" strokeWidth="2" strokeDasharray="4 6" opacity="0.6" />
                      <path d="M400 200 L 400 350" stroke="#ca8a04" strokeWidth="1" strokeDasharray="2 4" opacity="0.4" />
                     
                      <circle r="4" fill="#2dd4bf">
                        <animateMotion dur="3s" repeatCount="indefinite" path="M150 200 Q 250 100 400 200 T 650 200" />
                      </circle>


                      <g className="drop-shadow-[0_0_15px_rgba(45,212,191,0.6)]">
                        <circle cx="150" cy="200" r="8" fill="#020617" stroke="#2dd4bf" strokeWidth="3"/>
                        <circle cx="150" cy="200" r="3" fill="#2dd4bf" className="animate-pulse"/>
                      </g>
                     
                      <g className="drop-shadow-[0_0_15px_rgba(67,56,202,0.6)]">
                        <circle cx="250" cy="300" r="6" fill="#020617" stroke="#4f46e5" strokeWidth="2"/>
                        <circle cx="250" cy="300" r="2" fill="#4f46e5"/>
                      </g>


                      <g className="drop-shadow-[0_0_15px_rgba(67,56,202,0.6)]">
                        <circle cx="550" cy="150" r="6" fill="#020617" stroke="#4f46e5" strokeWidth="2"/>
                        <circle cx="550" cy="150" r="2" fill="#4f46e5"/>
                      </g>


                      <g className="drop-shadow-[0_0_15px_rgba(202,138,4,0.6)]">
                        <circle cx="400" cy="350" r="5" fill="#020617" stroke="#ca8a04" strokeWidth="2"/>
                      </g>


                      <g className="drop-shadow-[0_0_30px_rgba(20,184,166,0.8)] cursor-pointer">
                        <circle cx="400" cy="200" r="24" fill="#0f766e" opacity="0.2" className="animate-ping"/>
                        <circle cx="400" cy="200" r="16" fill="#020617" stroke="#2dd4bf" strokeWidth="4"/>
                        <circle cx="400" cy="200" r="6" fill="#2dd4bf"/>
                        <text x="400" y="240" fill="#2dd4bf" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="0.1em">NODE_42</text>
                      </g>


                      <g className="drop-shadow-[0_0_15px_rgba(45,212,191,0.6)]">
                        <circle cx="650" cy="200" r="8" fill="#020617" stroke="#2dd4bf" strokeWidth="3"/>
                        <circle cx="650" cy="200" r="3" fill="#2dd4bf" className="animate-pulse"/>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>


              {/* Right Column (Terminal & Security) */}
              <div className="lg:col-span-4 flex flex-col gap-6">
               
                {/* Encryption Status Card */}
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-yellow-900/20 border border-yellow-700/30">
                      <Key className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest">Encryption</h3>
                      <p className="text-xs text-slate-500 font-mono">AES-256-GCM Active</p>
                    </div>
                  </div>


                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-slate-400">Key Rotation Cycle</span>
                        <span className="text-teal-400">04:12</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 w-[70%] shadow-[0_0_10px_rgba(20,184,166,0.8)]"></div>
                      </div>
                    </div>
                   
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-slate-400">DNS Leak Protection</span>
                        <span className="text-green-400">SECURE</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[100%] shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Live Terminal Log */}
                <div className="flex-1 bg-[#050b14] border border-slate-800/80 rounded-3xl overflow-hidden flex flex-col min-h-[300px] shadow-inner relative group hover:border-teal-900/50 transition-colors">
                 
                  <div className="h-10 bg-[#0a1220] border-b border-slate-800/50 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <span className="ml-2 text-[0.6rem] text-slate-500 font-mono tracking-widest uppercase">system_log.sh</span>
                  </div>


                  <div className="p-5 flex-1 overflow-y-auto font-mono text-[0.65rem] leading-relaxed flex flex-col justify-end">
                    {logs.map((log, index) => (
                      <div
                        key={index}
                        className={`mb-2 animate-[fadeIn_0.3s_ease-in-out] ${
                          log.includes('[DEF]') ? 'text-yellow-500/90' :
                          log.includes('[SYS]') ? 'text-slate-400' :
                          'text-teal-400/90'
                        }`}
                      >
                        <span className="text-slate-600 mr-2">{new Date().toISOString().substring(11, 19)}</span>
                        {log}
                      </div>
                    ))}
                    <div className="flex items-center mt-2">
                      <span className="text-teal-500 mr-2">root@stronghold:~#</span>
                      <span className="w-2 h-3 bg-teal-500 animate-pulse"></span>
                    </div>
                  </div>


                  {/* Scanline overlay effect */}
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] z-10 opacity-50 mix-blend-overlay"></div>
                </div>


              </div>
            </div>
          ) : (
            /* Standby Placeholder for unbuilt tabs */
            <div className="h-full flex flex-col items-center justify-center animate-[fadeIn_0.3s_ease-in-out]">
              <div className="w-24 h-24 rounded-full bg-slate-900/50 border border-slate-800 flex items-center justify-center mb-6 shadow-inner relative">
                <div className="absolute inset-0 rounded-full border border-teal-500/20 animate-ping opacity-20"></div>
                <ShieldCheck className="w-10 h-10 text-slate-700" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-widest">{currentTab}</h2>
              <div className="flex items-center gap-3 text-slate-500 font-mono text-xs">
                <span className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></span>
                MODULE_STANDBY // AWAITING_INITIALIZATION
              </div>
            </div>
          )}
        </div>
      </main>
     
      {/* Required style block for custom animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0f766e;
        }
      `}} />
    </div>
  );
}


// Reusable Components
const NavItem = ({ icon, label, active, danger, onClick }) => {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-center lg:justify-start gap-3 p-3 lg:px-4 rounded-xl transition-all group ${
      active
        ? 'bg-teal-900/20 border border-teal-800/50 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
        : danger
          ? 'hover:bg-red-900/20 text-slate-500 hover:text-red-400'
          : 'hover:bg-slate-800/50 text-slate-500 hover:text-slate-300'
    }`}>
      <span className={`${active ? 'text-teal-400' : danger ? 'group-hover:text-red-400' : 'group-hover:text-teal-500'}`}>
        {icon}
      </span>
      <span className="hidden lg:block text-xs font-bold tracking-widest uppercase">{label}</span>
    </button>
  );
}


const StatCard = ({ title, value, subtitle, icon, color, valueClassName }) => {
  const colorMap = {
    teal: 'bg-teal-900/20 border-teal-800/30 text-teal-500',
    yellow: 'bg-yellow-900/20 border-yellow-800/30 text-yellow-500',
    indigo: 'bg-indigo-950/40 border-indigo-800/40 text-indigo-400',
  };


  return (
    <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition-colors">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="text-xs text-slate-400 font-bold uppercase tracking-widest">{title}</h3>
        <div className={`p-2 rounded-xl border ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
      <div className="relative z-10">
        <div className={`text-white ${valueClassName || 'text-2xl font-black'}`}>
          {value}
        </div>
        {subtitle && (
          <div className="text-[0.65rem] text-slate-500 font-mono mt-1">{subtitle}</div>
        )}
      </div>
      <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none ${color === 'teal' ? 'bg-teal-500' : color === 'yellow' ? 'bg-yellow-500' : 'bg-indigo-600'}`}></div>
    </div>
  );
}



