import React, { useState } from 'react';
import { Bot, Sparkles, Code, FileText, Briefcase, GraduationCap, Compass, Send, Check, Copy, RefreshCw, AlertCircle } from 'lucide-react';

interface AILabSuiteProps {
  defaultSuite?: string;
}

export const AILabSuite: React.FC<AILabSuiteProps> = ({ defaultSuite = 'business' }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultSuite);
  const [prompt, setPrompt] = useState<string>('');
  const [taskType, setTaskType] = useState<string>('plan');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Set default prompt based on selected task
  const handleSelectTask = (tab: string, task: string, samplePrompt: string) => {
    setActiveTab(tab);
    setTaskType(task);
    if (!prompt || prompt.length < 5) {
      setPrompt(samplePrompt);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          suite: activeTab,
          taskType,
          systemInstruction: `You are Feko Michael AI Engine (Gemini 3.6 Flash). Provide clear, detailed, professional outputs with markdown headers, bullet points, and high technical quality for ${activeTab} (${taskType}).`
        })
      });

      const data = await response.json();
      if (data.success && data.result) {
        setResult(data.result);
      } else {
        setError(data.error || 'Failed to generate AI response. Make sure GEMINI_API_KEY is configured in server environment.');
      }
    } catch (err: any) {
      setError('Network connection error or backend API unavailable. ' + (err?.message || ''));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-5 mb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Gemini 3.6 Flash Powered
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Feko Michael AI Product Laboratory</h2>
          <p className="text-sm text-slate-400">Live AI Suite executing real server-side prompt engineering and generation.</p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSelectTask('business', 'plan', 'Generate a detailed business plan for an AI-powered SaaS inventory platform for auto repair shops.')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              activeTab === 'business' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Business Suite
          </button>

          <button
            onClick={() => handleSelectTask('developer', 'explain', 'Explain how Express.js middleware handles errors and async handlers in Node.js TypeScript.')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              activeTab === 'developer' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Code className="w-3.5 h-3.5" /> Developer Assistant
          </button>

          <button
            onClick={() => handleSelectTask('content', 'article', 'Write a persuasive launch post for Feko Michael Digital Studio highlighting custom full-stack solutions.')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              activeTab === 'content' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Content Studio
          </button>

          <button
            onClick={() => handleSelectTask('education', 'quiz', 'Generate 5 multiple-choice quiz questions on React Hooks, useEffect cleanup, and state immutability with answers.')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              activeTab === 'education' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" /> Education Suite
          </button>

          <button
            onClick={() => handleSelectTask('career', 'resume', 'Create a tailored senior full-stack engineer resume summary emphasizing TypeScript, React, Express, and AI integration.')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              activeTab === 'career' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Bot className="w-3.5 h-3.5" /> Career & Resume
          </button>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleGenerate} className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Enter Prompt / Technical Directive
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="Describe what you want the AI to analyze, generate, or build..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Server Route: <code className="text-cyan-400">POST /api/ai/generate</code>
          </div>

          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm rounded-xl hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Executing AI Model...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Generate AI Output
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error display */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-start gap-3 mb-6">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-1">AI Generation Error</span>
            {error}
          </div>
        </div>
      )}

      {/* Result Output Area */}
      {result && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 relative">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Generated Response
            </div>
            <button
              onClick={handleCopy}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Output
                </>
              )}
            </button>
          </div>

          <div className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed font-mono overflow-x-auto max-h-[500px]">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};
