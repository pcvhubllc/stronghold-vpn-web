import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Activity,
  Terminal,
  Lock,
  Server,
  Key,
  Copy,
  CheckCircle2,
  Power,
  Radio,
  Clock,
  ChevronRight
} from 'lucide-react';


// Custom Stronghold Logo from your Portal
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


export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [userId, setUserId] = useState('');
  const [citadelSecret, setCitadelSecret] = useState('');
  const [peerData, setPeerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([
    '[SYS] Initializing Privileged Comms. Vector... v1.24.3',
    '[SYS] Awaiting operator command.'
  ]);
  const [copiedKey, setCopiedKey] = useState(null);
  const [uptime, setUptime] = useState(0);


  const logsEndRef = useRef(null);


  // Auto-scroll terminal logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);


  // Uptime counter
  useEffect(() => {
    let interval;
    if (isConnected) {
      interval = setInterval(() => setUptime(prev => prev + 1), 1000);
    } else {
      setUptime(0);
    }
    return () => clearInterval(interval);
  }, [isConnected]);


  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };


  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    let prefix = '[SYS]';
    if (type === 'error') prefix = '[ERR]';
    if (type === 'success') prefix = '[NET]';
    if (type === 'warn') prefix = '[DEF]';
   
    setLogs(prev => [...prev, `${timestamp} ${prefix} ${message}`]);
  };


  // ------------------------------------------------------------------
  // WAILS BRIDGE MOCK
  // ------------------------------------------------------------------
  const handleToggleConnection = () => {
    if (isConnected) {
      addLog('Severing secure tunnel connection...', 'warn');
      setIsConnected(false);
      addLog('Interface wg0 offlined successfully.', 'info');
    } else {
      if (!peerData) {
        addLog('Engage aborted: No peer configuration detected in vector.', 'error');
        return;
      }
      setIsConnecting(true);
      addLog('Initiating cryptographic handshake...', 'info');
     
      setTimeout(() => {
        setIsConnecting(false);
        setIsConnected(true);
        addLog('AES-256-GCM tunnel integrity verified. Connection ACTIVE.', 'success');
      }, 1500);
    }
  };


  const handleGeneratePeer = async (e) => {
    e.preventDefault();
    if (!userId) {
      addLog('Operator ID required for provisioning.', 'error');
      return;
    }
    if (!citadelSecret) {
      addLog('Authorization override code required.', 'error');
      return;
    }


    setIsLoading(true);
    addLog(`Requesting node allocation for [${userId}]...`, 'info');


    setTimeout(() => {
      if (citadelSecret !== 'let_me_in_player') {
        addLog('Access Denied: Invalid Citadel clearance.', 'error');
        setIsLoading(false);
        return;
      }


      const mockResponse = {
        user_id: userId,
        ip_address: `10.8.0.${Math.floor(Math.random() * 250) + 2}`,
        public_key: generateMockKey(),
        private_key: generateMockKey(true)
      };


      setPeerData(mockResponse);
      addLog(`Allocation granted. Assigned IP Vector: ${mockResponse.ip_address}`, 'success');
      addLog(`WireGuard Interface sync complete.`, 'info');
      setIsLoading(false);
    }, 2000);
  };
return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-teal-500/30 p-4 md:p-8 flex flex-col items-center">
     
      {/* Background ambient glow - matched to index/portal */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-teal-900/10 blur-[150px] pointer-events-none z-0"></div>


      <div className="max-w-5xl w-full z-10 flex flex-col gap-8 mt-4">
       
        {/* HEADER / BRANDING */}
        <header className="flex flex-col md:flex-row justify-between items-center pb-6 border-b border-slate-800/80 gap-4">
          <div className="flex items-center gap-4">
            <StrongholdLogo className="w-14 h-14 drop-shadow-[0_0_8px_rgba(202,138,4,0.3)]" />
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-white tracking-wide leading-none mb-1">
                STRONGHOLD<span className="text-teal-500">VPN</span>
              </h1>
              <span className="text-[0.6rem] text-yellow-600/90 tracking-[0.25em] font-bold uppercase mb-0.5">
                WG-MANAGER • DESKTOP CLIENT
              </span>
              <span className="text-[0.5rem] text-slate-500 tracking-wider uppercase">
                A PCV Hub LLC Property
              </span>
            </div>
          </div>
         
          <div className={`flex items-center space-x-3 px-4 py-2 border rounded-xl backdrop-blur-sm transition-colors ${isConnected ? 'bg-green-950/20 border-green-900/50' : 'bg-slate-900/50 border-slate-800'}`}>
            <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse' : 'bg-slate-600'}`}></div>
            <span className={`text-[0.65rem] font-bold tracking-widest uppercase ${isConnected ? 'text-green-400' : 'text-slate-500'}`}>
              {isConnected ? 'SECURE CHANNEL ACTIVE' : 'NETWORK IDLE'}
            </span>
          </div>
        </header>


        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         
          {/* LEFT COLUMN: CONNECTION CONTROL */}
          <div className="lg:col-span-5 flex flex-col gap-6">
           
            {/* TACTICAL CONNECTION TILE */}
            <div className={`bg-slate-900/60 border rounded-[2rem] p-8 relative overflow-hidden backdrop-blur-md transition-all duration-500 ${isConnected ? 'border-green-900/50 shadow-[0_0_30px_rgba(34,197,94,0.05)]' : 'border-slate-800'}`}>
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-10 opacity-20"></div>


              <div className="text-center mb-8 relative z-20">
                <span className="text-[0.65rem] font-bold tracking-[0.2em] text-slate-500 uppercase">
                  Primary Vector Interface
                </span>
              </div>


              {/* CRISP TOGGLE BUTTON */}
              <div className="flex justify-center mb-10 relative z-20">
                <button
                  onClick={handleToggleConnection}
                  disabled={isConnecting}
                  className={`relative flex items-center justify-center w-full max-w-[200px] h-16 rounded-xl transition-all duration-300 focus:outline-none font-bold tracking-widest uppercase text-xs overflow-hidden group ${
                    isConnecting
                      ? 'bg-yellow-600/20 text-yellow-500 border border-yellow-600/50 cursor-wait'
                      : isConnected
                        ? 'bg-green-500/10 text-green-400 border border-green-500/50 hover:bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                        : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-teal-500/50 hover:text-teal-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isConnecting ? (
                      <Activity className="w-5 h-5 animate-spin" />
                    ) : (
                      <Power className={`w-5 h-5 transition-transform ${isConnected ? 'drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'group-hover:scale-110'}`} />
                    )}
                    {isConnecting ? 'NEGOTIATING' : isConnected ? 'DISCONNECT' : 'ENGAGE TUNNEL'}
                  </div>
                </button>
              </div>


              {/* STATS */}
              <div className="grid grid-cols-2 gap-3 relative z-20">
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3">
                  <div className="text-[0.6rem] text-slate-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5"><Radio className="w-3 h-3"/> Active IP</div>
                  <div className={`text-sm font-mono ${isConnected ? 'text-green-400' : 'text-slate-600'}`}>
                    {isConnected ? peerData?.ip_address : '---.---.-.-'}
                  </div>
                </div>
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3">
                  <div className="text-[0.6rem] text-slate-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5"><Clock className="w-3 h-3"/> Uptime</div>
                  <div className={`text-sm font-mono ${isConnected ? 'text-teal-400' : 'text-slate-600'}`}>
                    {formatUptime(uptime)}
                  </div>
                </div>
              </div>
            </div>


            {/* LIVE TERMINAL LOG */}
            <div className="flex-1 bg-[#050b14] border border-slate-800/80 rounded-[2rem] overflow-hidden flex flex-col min-h-[250px] shadow-inner relative group hover:border-teal-900/50 transition-colors">
              <div className="h-10 bg-[#0a1220] border-b border-slate-800/50 flex items-center px-4 gap-2">
                <Terminal className="w-3 h-3 text-slate-500" />
                <span className="ml-1 text-[0.6rem] text-slate-500 font-mono tracking-widest uppercase">system_log.sh</span>
              </div>
              <div className="p-4 flex-1 overflow-y-auto font-mono text-[0.65rem] leading-relaxed flex flex-col justify-end space-y-1">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className={`animate-[fadeIn_0.3s_ease-in-out] ${
                      log.includes('[DEF]') || log.includes('[ERR]') ? 'text-yellow-500/90' :
                      log.includes('[SYS]') ? 'text-slate-400' :
                      'text-teal-400/90'
                    }`}
                  >
                    <ChevronRight className="inline w-3 h-3 opacity-50 mr-1" />
                    {log}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            </div>
          </div>


          {/* RIGHT COLUMN: PROVISIONING */}
          <div className="lg:col-span-7 flex flex-col">
           
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-[2rem] p-8 h-full relative overflow-hidden">
             
              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-[50px] rounded-full"></div>
             
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-teal-900/20 border border-teal-800/30">
                  <Key className="w-5 h-5 text-teal-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Node Provisioning</h3>
                  <p className="text-xs text-slate-500 font-mono">Generate cryptographic pairs</p>
                </div>
              </div>
             
              <form onSubmit={handleGeneratePeer} className="space-y-6 relative z-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[0.65rem] uppercase tracking-widest font-bold text-slate-400 mb-2">Subject Identifier</label>
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-700 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-teal-500 transition-colors text-sm font-mono placeholder:text-slate-600"
                      placeholder="e.g. PCV-ALPHA-001"
return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-teal-500/30 p-4 md:p-8 flex flex-col items-center">
     
      {/* Background ambient glow - matched to index/portal */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-teal-900/10 blur-[150px] pointer-events-none z-0"></div>


      <div className="max-w-5xl w-full z-10 flex flex-col gap-8 mt-4">
       
        {/* HEADER / BRANDING */}
        <header className="flex flex-col md:flex-row justify-between items-center pb-6 border-b border-slate-800/80 gap-4">
          <div className="flex items-center gap-4">
            <StrongholdLogo className="w-14 h-14 drop-shadow-[0_0_8px_rgba(202,138,4,0.3)]" />
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-white tracking-wide leading-none mb-1">
                STRONGHOLD<span className="text-teal-500">VPN</span>
              </h1>
              <span className="text-[0.6rem] text-yellow-600/90 tracking-[0.25em] font-bold uppercase mb-0.5">
                WG-MANAGER • DESKTOP CLIENT
              </span>
              <span className="text-[0.5rem] text-slate-500 tracking-wider uppercase">
                A PCV Hub LLC Property
              </span>
            </div>
          </div>
         
          <div className={`flex items-center space-x-3 px-4 py-2 border rounded-xl backdrop-blur-sm transition-colors ${isConnected ? 'bg-green-950/20 border-green-900/50' : 'bg-slate-900/50 border-slate-800'}`}>
            <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse' : 'bg-slate-600'}`}></div>
            <span className={`text-[0.65rem] font-bold tracking-widest uppercase ${isConnected ? 'text-green-400' : 'text-slate-500'}`}>
              {isConnected ? 'SECURE CHANNEL ACTIVE' : 'NETWORK IDLE'}
            </span>
          </div>
        </header>


        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         
          {/* LEFT COLUMN: CONNECTION CONTROL */}
          <div className="lg:col-span-5 flex flex-col gap-6">
           
            {/* TACTICAL CONNECTION TILE */}
            <div className={`bg-slate-900/60 border rounded-[2rem] p-8 relative overflow-hidden backdrop-blur-md transition-all duration-500 ${isConnected ? 'border-green-900/50 shadow-[0_0_30px_rgba(34,197,94,0.05)]' : 'border-slate-800'}`}>
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-10 opacity-20"></div>


              <div className="text-center mb-8 relative z-20">
                <span className="text-[0.65rem] font-bold tracking-[0.2em] text-slate-500 uppercase">
                  Primary Vector Interface
                </span>
              </div>


              {/* CRISP TOGGLE BUTTON */}
              <div className="flex justify-center mb-10 relative z-20">
                <button
                  onClick={handleToggleConnection}
                  disabled={isConnecting}
                  className={`relative flex items-center justify-center w-full max-w-[200px] h-16 rounded-xl transition-all duration-300 focus:outline-none font-bold tracking-widest uppercase text-xs overflow-hidden group ${
                    isConnecting
                      ? 'bg-yellow-600/20 text-yellow-500 border border-yellow-600/50 cursor-wait'
                      : isConnected
                        ? 'bg-green-500/10 text-green-400 border border-green-500/50 hover:bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                        : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-teal-500/50 hover:text-teal-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isConnecting ? (
                      <Activity className="w-5 h-5 animate-spin" />
                    ) : (
                      <Power className={`w-5 h-5 transition-transform ${isConnected ? 'drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'group-hover:scale-110'}`} />
                    )}
                    {isConnecting ? 'NEGOTIATING' : isConnected ? 'DISCONNECT' : 'ENGAGE TUNNEL'}
                  </div>
                </button>
              </div>


              {/* STATS */}
              <div className="grid grid-cols-2 gap-3 relative z-20">
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3">
                  <div className="text-[0.6rem] text-slate-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5"><Radio className="w-3 h-3"/> Active IP</div>
                  <div className={`text-sm font-mono ${isConnected ? 'text-green-400' : 'text-slate-600'}`}>
                    {isConnected ? peerData?.ip_address : '---.---.-.-'}
                  </div>
                </div>
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3">
                  <div className="text-[0.6rem] text-slate-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5"><Clock className="w-3 h-3"/> Uptime</div>
                  <div className={`text-sm font-mono ${isConnected ? 'text-teal-400' : 'text-slate-600'}`}>
                    {formatUptime(uptime)}
                  </div>
                </div>
              </div>
            </div>


            {/* LIVE TERMINAL LOG */}
            <div className="flex-1 bg-[#050b14] border border-slate-800/80 rounded-[2rem] overflow-hidden flex flex-col min-h-[250px] shadow-inner relative group hover:border-teal-900/50 transition-colors">
              <div className="h-10 bg-[#0a1220] border-b border-slate-800/50 flex items-center px-4 gap-2">
                <Terminal className="w-3 h-3 text-slate-500" />
                <span className="ml-1 text-[0.6rem] text-slate-500 font-mono tracking-widest uppercase">system_log.sh</span>
              </div>
              <div className="p-4 flex-1 overflow-y-auto font-mono text-[0.65rem] leading-relaxed flex flex-col justify-end space-y-1">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className={`animate-[fadeIn_0.3s_ease-in-out] ${
                      log.includes('[DEF]') || log.includes('[ERR]') ? 'text-yellow-500/90' :
                      log.includes('[SYS]') ? 'text-slate-400' :
                      'text-teal-400/90'
                    }`}
                  >
                    <ChevronRight className="inline w-3 h-3 opacity-50 mr-1" />
                    {log}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            </div>
          </div>


          {/* RIGHT COLUMN: PROVISIONING */}
          <div className="lg:col-span-7 flex flex-col">
           
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-[2rem] p-8 h-full relative overflow-hidden">
             
              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-[50px] rounded-full"></div>
             
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-teal-900/20 border border-teal-800/30">
                  <Key className="w-5 h-5 text-teal-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Node Provisioning</h3>
                  <p className="text-xs text-slate-500 font-mono">Generate cryptographic pairs</p>
                </div>
              </div>
             
              <form onSubmit={handleGeneratePeer} className="space-y-6 relative z-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[0.65rem] uppercase tracking-widest font-bold text-slate-400 mb-2">Subject Identifier</label>
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-700 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-teal-500 transition-colors text-sm font-mono placeholder:text-slate-600"
                      placeholder="e.g. PCV-ALPHA-001"


  const generateMockKey = (isPrivate = false) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let key = '';
    for (let i = 0; i < 43; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key + '=';
  };


  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(type);
    addLog(`Copied ${type} parameter to local clipboard.`, 'info');
    setTimeout(() => setCopiedKey(null), 2000);
  };
/>
                  </div>
                  <div>
                    <label className="block text-[0.65rem] uppercase tracking-widest font-bold text-slate-400 mb-2">Clearance Code</label>
                    <input
                      type="password"
                      value={citadelSecret}
                      onChange={(e) => setCitadelSecret(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-700 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-yellow-600 transition-colors text-sm font-mono placeholder:text-slate-600"
                      placeholder="Enter administrative override..."
                    />
                  </div>
                </div>
               
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-yellow-600 hover:bg-yellow-500 text-slate-950 font-bold py-4 px-8 rounded-xl shadow-[0_0_15px_rgba(202,138,4,0.1)] hover:shadow-[0_0_20px_rgba(202,138,4,0.3)] transition-all flex items-center justify-center gap-2 group tracking-widest text-xs uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Activity className="animate-spin h-4 w-4 mr-1" />
                  ) : (
                    <Server className="h-4 w-4 mr-1" />
                  )}
                  {isLoading ? 'ALLOCATING...' : 'PROVISION NEW PEER'}
                </button>
              </form>


              {/* RESULTS DISPLAY */}
              {peerData && (
                <div className="mt-8 pt-8 border-t border-slate-800/80 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-teal-400 font-bold flex items-center text-[0.65rem] uppercase tracking-widest">
                      <ShieldCheck className="w-4 h-4 mr-2" /> Parameters Generated
                    </h4>
                  </div>
                 
                  <div className="space-y-4">
                    {/* Public Key */}
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-500 text-[0.6rem] uppercase font-bold tracking-widest">Public Key</span>
                        <button onClick={() => copyToClipboard(peerData.public_key, 'public')} className="text-teal-500 hover:text-teal-400 flex items-center text-[0.6rem] font-bold tracking-widest uppercase transition-colors">
                          {copiedKey === 'public' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                          {copiedKey === 'public' ? 'COPIED' : 'COPY'}
                        </button>
                      </div>
                      <div className="font-mono text-xs text-slate-300 break-all">{peerData.public_key}</div>
                    </div>
                   
                    {/* Private Key */}
                    <div className="bg-slate-950 border border-yellow-900/30 rounded-xl p-4 group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-yellow-600/80 text-[0.6rem] uppercase font-bold tracking-widest flex items-center"><Lock className="w-3 h-3 mr-1"/> Private Key (Classified)</span>
                        <button onClick={() => copyToClipboard(peerData.private_key, 'private')} className="text-yellow-600 hover:text-yellow-500 flex items-center text-[0.6rem] font-bold tracking-widest uppercase transition-colors">
                          {copiedKey === 'private' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                          {copiedKey === 'private' ? 'COPIED' : 'COPY'}
                        </button>
                      </div>
                      <div className="font-mono text-xs text-slate-400 break-all blur-[3px] hover:blur-none transition-all duration-300 select-all cursor-text">
                        {peerData.private_key}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
     
      {/* Footer Text */}
      <div className="mt-8 text-[0.55rem] text-slate-600 tracking-widest uppercase font-mono text-center pb-4">
        SYSTEM SECURE • PCV HUB LLC
      </div>
    </div>
  );
}



