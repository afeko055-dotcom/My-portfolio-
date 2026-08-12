import React, { useState, useEffect, useRef } from 'react';
import { Eye, RotateCcw, Palette, Circle, DollarSign, Car, Sparkles } from 'lucide-react';

export const Interactive3DLab: React.FC = () => {
  const [color, setColor] = useState('#06b6d4'); // Cyan body
  const [wheelType, setWheelType] = useState('Sport Alloy 19"');
  const [autoRotate, setAutoRotate] = useState(true);
  const [angle, setAngle] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (autoRotate) {
        setAngle(prev => (prev + 1) % 360);
      }

      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, 640, 300);

      // Draw Grid / Floor Reflection
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < 640; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 220);
        ctx.lineTo(x + (x - 320) * 0.5, 300);
        ctx.stroke();
      }

      const rad = (angle * Math.PI) / 180;
      const scaleX = Math.cos(rad);
      const width = 220 * Math.abs(scaleX) + 40;

      // Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.beginPath();
      ctx.ellipse(320, 225, width * 0.6, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      // Car Chassis Body
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(320 - width / 2, 150, width, 55, [15, 15, 5, 5]);
      ctx.fill();

      // Cabin Glass Roof
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.roundRect(320 - width / 3, 115, width / 1.6, 40, [15, 15, 0, 0]);
      ctx.fill();

      // Glass Tint Reflection
      ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.beginPath();
      ctx.roundRect(320 - width / 3.2, 120, width / 1.8, 30, [10, 10, 0, 0]);
      ctx.fill();

      // Headlight Glow
      const headlightX = scaleX >= 0 ? 320 + width / 2 - 10 : 320 - width / 2 + 10;
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(headlightX, 170, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Wheels
      const wheelOffset = width * 0.3;
      ctx.fillStyle = wheelType.includes('Sport') ? '#475569' : '#0f172a';
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;

      // Left Wheel
      ctx.beginPath();
      ctx.arc(320 - wheelOffset, 205, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Right Wheel
      ctx.beginPath();
      ctx.arc(320 + wheelOffset, 205, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrameId);
  }, [angle, color, wheelType, autoRotate]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-800 pb-5 mb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase mb-1">
            <Car className="w-3.5 h-3.5" /> Interactive 3D Configurator
          </div>
          <h2 className="text-xl font-bold text-white">Honda Josh GT Performance Configurator</h2>
        </div>

        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> {autoRotate ? 'Pause Rotation' : 'Rotate 360°'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Canvas Display */}
        <div className="lg:col-span-2 relative border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
          <canvas ref={canvasRef} width={640} height={300} className="w-full h-auto block" />
          <div className="absolute bottom-3 left-3 text-[11px] text-slate-400 font-mono bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 backdrop-blur-sm">
            Rotation Angle: {angle}°
          </div>
        </div>

        {/* Customization Options */}
        <div className="space-y-5 bg-slate-950 p-5 rounded-2xl border border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Exterior Paint Color</label>
            <div className="flex gap-2">
              {[
                { name: 'Cyan GT', hex: '#06b6d4' },
                { name: 'Red Flame', hex: '#ef4444' },
                { name: 'Emerald', hex: '#10b981' },
                { name: 'Stealth Black', hex: '#334155' },
                { name: 'Gold Pulse', hex: '#f59e0b' }
              ].map(c => (
                <button
                  key={c.hex}
                  onClick={() => setColor(c.hex)}
                  className={`w-8 h-8 rounded-full border-2 transition ${color === c.hex ? 'border-cyan-400 scale-110 shadow-lg' : 'border-transparent'}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Alloy Wheel Option</label>
            <select
              value={wheelType}
              onChange={e => setWheelType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option>Sport Alloy 19"</option>
              <option>Stealth Matte Carbon 20"</option>
              <option>Chrome Luxury 18"</option>
            </select>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-400">Base MSRP:</span>
              <span className="font-semibold text-slate-200">$54,000</span>
            </div>
            <div className="flex justify-between items-center text-xs mb-3">
              <span className="text-slate-400">Custom Paint & Trim:</span>
              <span className="font-semibold text-cyan-400">+$2,400</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold pt-2 border-t border-slate-800 text-emerald-400">
              <span>Configured Price:</span>
              <span>$56,400</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
