import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Trophy, Gamepad2, Zap, Shield, Sparkles } from 'lucide-react';

interface InteractiveGamesProps {
  gameType?: 'endless-runner' | 'space-shooter' | 'math';
}

export const InteractiveGames: React.FC<InteractiveGamesProps> = ({ gameType = 'endless-runner' }) => {
  const [activeGame, setActiveGame] = useState<'endless-runner' | 'space-shooter' | 'math'>(gameType);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl max-w-5xl mx-auto">
      {/* Game Selector Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-800 pb-5 mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Feko Michael Game Studio</h2>
            <p className="text-xs text-slate-400">Genuinely playable HTML5 Canvas & Web physics games.</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveGame('endless-runner')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeGame === 'endless-runner' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Cyber Runner
          </button>
          <button
            onClick={() => setActiveGame('space-shooter')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeGame === 'space-shooter' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Space Shooter
          </button>
          <button
            onClick={() => setActiveGame('math')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeGame === 'math' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Math Arena
          </button>
        </div>
      </div>

      {activeGame === 'endless-runner' && <CyberRunnerGame />}
      {activeGame === 'space-shooter' && <SpaceShooterGame />}
      {activeGame === 'math' && <MathArenaGame />}
    </div>
  );
};

// --- Cyber Runner Game Component ---
const CyberRunnerGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  const gameLoopRef = useRef<number | null>(null);
  const playerRef = useRef({ y: 180, vy: 0, isJumping: false, doubleJumping: false });
  const obstaclesRef = useRef<Array<{ x: number; w: number; h: number }>>([]);
  const coinsRef = useRef<Array<{ x: number; y: number; collected: boolean }>>([]);
  const frameCountRef = useRef(0);
  const currentScoreRef = useRef(0);

  const JUMP_FORCE = -11;
  const GRAVITY = 0.6;
  const GROUND_Y = 180;

  const jump = () => {
    if (gameState !== 'PLAYING') return;
    const p = playerRef.current;
    if (!p.isJumping) {
      p.vy = JUMP_FORCE;
      p.isJumping = true;
    } else if (!p.doubleJumping) {
      p.vy = JUMP_FORCE * 0.85;
      p.doubleJumping = true;
    }
  };

  const startGame = () => {
    playerRef.current = { y: GROUND_Y, vy: 0, isJumping: false, doubleJumping: false };
    obstaclesRef.current = [];
    coinsRef.current = [];
    frameCountRef.current = 0;
    currentScoreRef.current = 0;
    setScore(0);
    setGameState('PLAYING');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const update = () => {
      if (gameState !== 'PLAYING') return;

      frameCountRef.current++;
      currentScoreRef.current = Math.floor(frameCountRef.current / 5);
      setScore(currentScoreRef.current);

      // Player Physics
      const p = playerRef.current;
      p.vy += GRAVITY;
      p.y += p.vy;
      if (p.y >= GROUND_Y) {
        p.y = GROUND_Y;
        p.vy = 0;
        p.isJumping = false;
        p.doubleJumping = false;
      }

      // Spawn Obstacles
      if (frameCountRef.current % 110 === 0) {
        const height = 25 + Math.floor(Math.random() * 25);
        obstaclesRef.current.push({ x: 640, w: 20, h: height });
      }

      // Spawn Coins
      if (frameCountRef.current % 70 === 0) {
        coinsRef.current.push({ x: 640, y: GROUND_Y - 30 - Math.random() * 50, collected: false });
      }

      // Move Obstacles & Coins
      const speed = 5 + Math.floor(currentScoreRef.current / 200);
      obstaclesRef.current.forEach(obs => obs.x -= speed);
      coinsRef.current.forEach(c => c.x -= speed);

      // Remove offscreen
      obstaclesRef.current = obstaclesRef.current.filter(obs => obs.x + obs.w > 0);
      coinsRef.current = coinsRef.current.filter(c => c.x > 0);

      // Collision Check
      const playerBox = { x: 50, y: p.y, w: 30, h: 40 };

      for (const obs of obstaclesRef.current) {
        const obsBox = { x: obs.x, y: GROUND_Y + 40 - obs.h, w: obs.w, h: obs.h };
        if (
          playerBox.x < obsBox.x + obsBox.w &&
          playerBox.x + playerBox.w > obsBox.x &&
          playerBox.y < obsBox.y + obsBox.h &&
          playerBox.y + playerBox.h > obsBox.y
        ) {
          // Crash! Game Over
          setGameState('GAMEOVER');
          setHighScore(prev => Math.max(prev, currentScoreRef.current));
          return;
        }
      }

      // Coin Collection Check
      for (const coin of coinsRef.current) {
        if (!coin.collected && Math.abs(playerBox.x - coin.x) < 25 && Math.abs(playerBox.y - coin.y) < 25) {
          coin.collected = true;
          frameCountRef.current += 50; // Bonus score
        }
      }
    };

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 640, 260);

      // Draw Grid / Ground
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, GROUND_Y + 40, 640, 40);

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y + 40);
      ctx.lineTo(640, GROUND_Y + 40);
      ctx.stroke();

      // Draw Obstacles
      ctx.fillStyle = '#ef4444';
      obstaclesRef.current.forEach(obs => {
        ctx.fillRect(obs.x, GROUND_Y + 40 - obs.h, obs.w, obs.h);
      });

      // Draw Coins
      ctx.fillStyle = '#f59e0b';
      coinsRef.current.forEach(c => {
        if (!c.collected) {
          ctx.beginPath();
          ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw Player
      const p = playerRef.current;
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(50, p.y, 30, 40);

      // Player Visor
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(68, p.y + 8, 10, 8);
    };

    const loop = () => {
      update();
      draw();
      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-[640px] mb-3 text-sm font-semibold">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>Score: <strong className="text-cyan-400">{score}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>High Score: <strong className="text-amber-400">{highScore}</strong></span>
        </div>
      </div>

      <div className="relative border-2 border-slate-700 rounded-xl overflow-hidden shadow-2xl bg-slate-950">
        <canvas
          ref={canvasRef}
          width={640}
          height={260}
          onClick={jump}
          className="cursor-pointer block max-w-full"
        />

        {gameState === 'IDLE' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">Cyber Runner 2088</h3>
            <p className="text-xs text-slate-300 mb-4 max-w-xs">Press Space or Tap screen to jump & double-jump over obstacles. Collect energy cores for extra points!</p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Start Running
            </button>
          </div>
        )}

        {gameState === 'GAMEOVER' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-2xl font-bold text-rose-500 mb-1">System Crash!</h3>
            <p className="text-sm text-slate-300 mb-2">Final Score: <strong className="text-cyan-400">{score}</strong></p>
            <p className="text-xs text-slate-400 mb-5">High Score: {highScore}</p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-3">Controls: Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-200">Space</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-200">Up Arrow</kbd> or click canvas to jump.</p>
    </div>
  );
};

// --- Space Shooter Game Component ---
const SpaceShooterGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
  const [score, setScore] = useState<number>(0);
  const [health, setHealth] = useState<number>(100);

  const shipRef = useRef({ x: 300, y: 210 });
  const lasersRef = useRef<Array<{ x: number; y: number }>>([]);
  const enemiesRef = useRef<Array<{ x: number; y: number; hp: number }>>([]);
  const gameLoopRef = useRef<number | null>(null);
  const keysRef = useRef<Record<string, boolean>>({});

  const startSpaceGame = () => {
    shipRef.current = { x: 300, y: 210 };
    lasersRef.current = [];
    enemiesRef.current = [];
    setScore(0);
    setHealth(100);
    setGameState('PLAYING');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { keysRef.current[e.code] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { keysRef.current[e.code] = false; };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let frameCount = 0;

    const loop = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (gameState === 'PLAYING') {
        frameCount++;

        // Ship Movement
        const speed = 6;
        if (keysRef.current['ArrowLeft'] || keysRef.current['KeyA']) shipRef.current.x = Math.max(20, shipRef.current.x - speed);
        if (keysRef.current['ArrowRight'] || keysRef.current['KeyD']) shipRef.current.x = Math.min(620, shipRef.current.x + speed);

        // Shoot Laser
        if ((keysRef.current['Space'] || keysRef.current['ArrowUp']) && frameCount % 12 === 0) {
          lasersRef.current.push({ x: shipRef.current.x, y: shipRef.current.y - 15 });
        }

        // Move Lasers
        lasersRef.current.forEach(l => l.y -= 9);
        lasersRef.current = lasersRef.current.filter(l => l.y > 0);

        // Spawn Enemies
        if (frameCount % 45 === 0) {
          enemiesRef.current.push({ x: 30 + Math.random() * 580, y: -20, hp: 1 });
        }

        // Move Enemies
        enemiesRef.current.forEach(e => e.y += 3);

        // Collision: Laser vs Enemy
        for (const laser of lasersRef.current) {
          for (const enemy of enemiesRef.current) {
            if (Math.abs(laser.x - enemy.x) < 20 && Math.abs(laser.y - enemy.y) < 20) {
              enemy.hp -= 1;
              laser.y = -100;
              setScore(s => s + 10);
            }
          }
        }

        // Filter Dead Enemies
        enemiesRef.current = enemiesRef.current.filter(e => e.hp > 0 && e.y < 280);

        // Collision: Enemy vs Player
        for (const enemy of enemiesRef.current) {
          if (Math.abs(shipRef.current.x - enemy.x) < 25 && Math.abs(shipRef.current.y - enemy.y) < 20) {
            enemy.hp = 0;
            setHealth(h => {
              const nextH = h - 25;
              if (nextH <= 0) {
                setGameState('GAMEOVER');
              }
              return nextH;
            });
          }
        }
      }

      // Draw
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, 640, 260);

      // Draw Lasers
      ctx.fillStyle = '#38bdf8';
      lasersRef.current.forEach(l => {
        ctx.fillRect(l.x - 2, l.y, 4, 12);
      });

      // Draw Enemies
      ctx.fillStyle = '#f43f5e';
      enemiesRef.current.forEach(e => {
        ctx.beginPath();
        ctx.arc(e.x, e.y, 12, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Ship
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(shipRef.current.x, shipRef.current.y - 15);
      ctx.lineTo(shipRef.current.x - 15, shipRef.current.y + 15);
      ctx.lineTo(shipRef.current.x + 15, shipRef.current.y + 15);
      ctx.closePath();
      ctx.fill();

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-[640px] mb-3 text-sm font-semibold">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>Score: <strong className="text-cyan-400">{score}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Shield: <strong className="text-emerald-400">{health}%</strong></span>
        </div>
      </div>

      <div className="relative border-2 border-slate-700 rounded-xl overflow-hidden shadow-2xl bg-slate-950">
        <canvas ref={canvasRef} width={640} height={260} className="block max-w-full" />

        {gameState === 'IDLE' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">Galaxy Defender</h3>
            <p className="text-xs text-slate-300 mb-4 max-w-xs">Use Left/Right keys to move and Spacebar to shoot enemy armadas!</p>
            <button
              onClick={startSpaceGame}
              className="px-6 py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Launch Starfighter
            </button>
          </div>
        )}

        {gameState === 'GAMEOVER' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-2xl font-bold text-rose-500 mb-1">Ship Destroyed</h3>
            <p className="text-sm text-slate-300 mb-4">Final Score: <strong className="text-cyan-400">{score}</strong></p>
            <button
              onClick={startSpaceGame}
              className="px-6 py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Restart Battle
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-3">Controls: <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-200">A / D / Left / Right</kbd> to move, <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-200">Space</kbd> to fire lasers.</p>
    </div>
  );
};

// --- Math Arena Game Component ---
const MathArenaGame: React.FC = () => {
  const [num1, setNum1] = useState(5);
  const [num2, setNum2] = useState(7);
  const [op, setOp] = useState<'+' | '-' | '*'>('+');
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateProblem = () => {
    const ops: Array<'+' | '-' | '*'> = ['+', '-', '*'];
    const chosenOp = ops[Math.floor(Math.random() * ops.length)];
    let a = Math.floor(Math.random() * 12) + 1;
    let b = Math.floor(Math.random() * 12) + 1;
    if (chosenOp === '-' && b > a) {
      [a, b] = [b, a];
    }
    setNum1(a);
    setNum2(b);
    setOp(chosenOp);
    setUserAnswer('');
  };

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setTimeLeft(30);
    setIsPlaying(true);
    generateProblem();
  };

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setIsPlaying(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPlaying) return;

    let expected = 0;
    if (op === '+') expected = num1 + num2;
    if (op === '-') expected = num1 - num2;
    if (op === '*') expected = num1 * num2;

    if (parseInt(userAnswer.trim(), 10) === expected) {
      setScore(s => s + 10 + streak * 2);
      setStreak(s => s + 1);
      generateProblem();
    } else {
      setStreak(0);
      setUserAnswer('');
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-950 p-6 rounded-xl border border-slate-800 text-center max-w-lg mx-auto">
      <div className="flex justify-between w-full mb-6 text-sm font-semibold">
        <div>Score: <span className="text-cyan-400">{score}</span></div>
        <div>Streak: <span className="text-amber-400">x{streak}</span></div>
        <div>Time Left: <span className="text-rose-400">{timeLeft}s</span></div>
      </div>

      {!isPlaying ? (
        <div className="py-8">
          <h3 className="text-2xl font-bold text-white mb-2">Math Mind Arena</h3>
          <p className="text-xs text-slate-400 mb-6">Solve rapid mental arithmetic problems before time runs out!</p>
          <button
            onClick={startGame}
            className="px-6 py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition"
          >
            Start Speed Challenge
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="text-4xl font-extrabold text-cyan-400 font-mono py-4 bg-slate-900 rounded-xl border border-slate-800">
            {num1} {op} {num2} = ?
          </div>

          <input
            type="number"
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            autoFocus
            placeholder="Type answer & hit Enter"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-center text-xl font-bold text-white focus:outline-none focus:border-cyan-500"
          />

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition"
          >
            Submit Answer
          </button>
        </form>
      )}
    </div>
  );
};
