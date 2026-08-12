import React, { useState } from 'react';
import { Code, Check, Copy, RefreshCw, Key, Palette, FileText, Terminal, AlertCircle } from 'lucide-react';

interface DevToolsLabProps {
  defaultTool?: 'json' | 'regex' | 'password' | 'palette';
}

export const DevToolsLab: React.FC<DevToolsLabProps> = ({ defaultTool = 'json' }) => {
  const [activeTool, setActiveTool] = useState<'json' | 'regex' | 'password' | 'palette'>(defaultTool);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-800 pb-5 mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Feko Michael Developer Utility Suite</h2>
          <p className="text-xs text-slate-400">Real working developer utilities and conversion tools.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTool('json')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTool === 'json' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            JSON Formatter
          </button>
          <button
            onClick={() => setActiveTool('regex')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTool === 'regex' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Regex Tester
          </button>
          <button
            onClick={() => setActiveTool('password')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTool === 'password' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Token Generator
          </button>
          <button
            onClick={() => setActiveTool('palette')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTool === 'palette' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Palette Generator
          </button>
        </div>
      </div>

      {activeTool === 'json' && <JSONTool />}
      {activeTool === 'regex' && <RegexTool />}
      {activeTool === 'password' && <PasswordTool />}
      {activeTool === 'palette' && <PaletteTool />}
    </div>
  );
};

const JSONTool: React.FC = () => {
  const [input, setInput] = useState('{"studio":"Feko Michael","status":"LIVE","projects":["Automotive","CRM","AI Lab"]}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (err: any) {
      setError(err?.message || 'Invalid JSON syntax');
      setOutput('');
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (err: any) {
      setError(err?.message || 'Invalid JSON syntax');
      setOutput('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={formatJSON} className="px-3.5 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-cyan-400">
          Beautify JSON
        </button>
        <button onClick={minifyJSON} className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg">
          Minify JSON
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Input Raw JSON:</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={10}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Formatted Output:</label>
          <textarea
            readOnly
            value={error ? `ERROR: ${error}` : output}
            rows={10}
            className={`w-full bg-slate-950 border rounded-xl p-3 font-mono text-xs focus:outline-none resize-none ${
              error ? 'border-rose-500 text-rose-400' : 'border-slate-800 text-cyan-400'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

const RegexTool: React.FC = () => {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [text, setText] = useState('Contact Feko Michael at contact@fekomichael.com or support@studio.dev for enterprise inquiries.');
  const [matches, setMatches] = useState<string[]>([]);

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, 'g');
      const found = text.match(regex);
      setMatches(found || []);
    } catch (e) {
      setMatches([]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Regex Pattern:</label>
          <input
            type="text"
            value={pattern}
            onChange={e => setPattern(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 font-mono text-xs text-cyan-400 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Test Action:</label>
          <button onClick={testRegex} className="w-full py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-400">
            Execute Regex Match
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1">Test Text Payload:</label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={4}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
        />
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Matches Found ({matches.length}):</span>
        <div className="flex flex-wrap gap-2">
          {matches.map((m, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-xs font-bold">
              {m}
            </span>
          ))}
          {matches.length === 0 && <span className="text-xs text-slate-500">No matches found for pattern.</span>}
        </div>
      </div>
    </div>
  );
};

const PasswordTool: React.FC = () => {
  const [token, setToken] = useState('fm_sec_89321_x9f823a01');
  const [length, setLength] = useState(24);

  const generate = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    let result = 'fm_';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setToken(result);
  };

  return (
    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 max-w-lg mx-auto text-center">
      <h3 className="text-lg font-bold text-white">Secure Secret & Password Generator</h3>
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl font-mono text-sm text-cyan-400 font-bold break-all">
        {token}
      </div>
      <div className="flex items-center justify-center gap-3">
        <span className="text-xs text-slate-400">Length: {length}</span>
        <input
          type="range"
          min={12}
          max={48}
          value={length}
          onChange={e => setLength(parseInt(e.target.value, 10))}
          className="accent-cyan-500"
        />
      </div>
      <button onClick={generate} className="px-6 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-400">
        Generate New Token
      </button>
    </div>
  );
};

const PaletteTool: React.FC = () => {
  const [colors, setColors] = useState(['#0f172a', '#06b6d4', '#3b82f6', '#10b981', '#f59e0b']);

  const randomize = () => {
    const randomHex = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColors(['#0f172a', randomHex(), randomHex(), randomHex(), randomHex()]);
  };

  return (
    <div className="space-y-4 text-center">
      <button onClick={randomize} className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-400 mb-2">
        Generate Studio Color Scheme
      </button>

      <div className="grid grid-cols-5 gap-3">
        {colors.map((c, idx) => (
          <div key={idx} className="space-y-2">
            <div className="h-24 rounded-xl border border-slate-800 shadow-md" style={{ backgroundColor: c }} />
            <span className="font-mono text-xs text-slate-300 font-semibold block">{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
