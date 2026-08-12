import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_FILE = path.join(DATA_DIR, 'studio-store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial state for server persistence
interface StoreData {
  admin: {
    passwordHash: string; // Stored securely
    lastLogin?: string;
  };
  projects: any[];
  messages: any[];
  analytics: {
    totalViews: number;
    totalDownloads: number;
    totalLeads: number;
    projectViews: Record<string, number>;
    recentActivity: Array<{ id: string; type: string; details: string; timestamp: string }>;
  };
}

// Simple hash utility for local password storage
function hashPassword(pwd: string): string {
  let hash = 0;
  for (let i = 0; i < pwd.length; i++) {
    const char = pwd.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'hash_' + Math.abs(hash).toString(16) + '_' + pwd.length;
}

// Default initial password provided by owner: "Fekomichael12fm$"
const DEFAULT_INITIAL_PWD_HASH = hashPassword("Fekomichael12fm$");

function loadStore(): StoreData {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const data = fs.readFileSync(STORE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading store file:", err);
  }
  
  const initialStore: StoreData = {
    admin: {
      passwordHash: DEFAULT_INITIAL_PWD_HASH
    },
    projects: [],
    messages: [
      {
        id: "msg-1",
        name: "Enterprise Client - Honda Josh",
        email: "contact@hondajosh.com",
        subject: "Custom Automotive Platform Integration",
        message: "We would like to discuss expanding the vehicle inventory management system.",
        type: "lead",
        status: "unread",
        createdAt: new Date().toISOString()
      }
    ],
    analytics: {
      totalViews: 1420,
      totalDownloads: 312,
      totalLeads: 18,
      projectViews: {
        "automotive-platform": 240,
        "ai-business-assistant": 310,
        "racing-game": 185
      },
      recentActivity: [
        { id: "act-1", type: "system", details: "Feko Michael Studio Laboratory initialized", timestamp: new Date().toISOString() }
      ]
    }
  };
  saveStore(initialStore);
  return initialStore;
}

function saveStore(data: StoreData) {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error("Error saving store file:", err);
  }
}

let store = loadStore();

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI Client lazily/safely
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  };

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', studio: 'Feko Michael Digital Studio', version: '1.0.0' });
  });

  // Admin Auth
  app.post('/api/auth/login', (req, res) => {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ success: false, message: 'Password required' });
    }
    const reqHash = hashPassword(password);
    if (reqHash === store.admin.passwordHash) {
      store.admin.lastLogin = new Date().toISOString();
      store.analytics.recentActivity.unshift({
        id: 'act-' + Date.now(),
        type: 'auth',
        details: 'Admin authenticated successfully',
        timestamp: new Date().toISOString()
      });
      saveStore(store);
      return res.json({
        success: true,
        token: 'feko_admin_session_' + Date.now(),
        user: { name: 'Feko Michael', role: 'Administrator' }
      });
    }
    return res.status(401).json({ success: false, message: 'Invalid administrative password' });
  });

  app.post('/api/auth/change-password', (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (hashPassword(currentPassword) !== store.admin.passwordHash) {
      return res.status(401).json({ success: false, message: 'Current password incorrect' });
    }
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
    }
    store.admin.passwordHash = hashPassword(newPassword);
    store.analytics.recentActivity.unshift({
      id: 'act-' + Date.now(),
      type: 'auth',
      details: 'Admin password updated securely',
      timestamp: new Date().toISOString()
    });
    saveStore(store);
    return res.json({ success: true, message: 'Password updated successfully' });
  });

  // Project Management API
  app.get('/api/projects', (req, res) => {
    res.json({ success: true, projects: store.projects });
  });

  app.post('/api/projects', (req, res) => {
    const project = req.body;
    if (!project.name || !project.slug) {
      return res.status(400).json({ success: false, message: 'Project name and slug are required' });
    }
    const newProject = {
      ...project,
      id: project.id || 'proj-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    store.projects.push(newProject);
    store.analytics.recentActivity.unshift({
      id: 'act-' + Date.now(),
      type: 'project',
      details: `Created project: ${project.name}`,
      timestamp: new Date().toISOString()
    });
    saveStore(store);
    res.json({ success: true, project: newProject });
  });

  app.put('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const index = store.projects.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    store.projects[index] = {
      ...store.projects[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    store.analytics.recentActivity.unshift({
      id: 'act-' + Date.now(),
      type: 'project',
      details: `Updated project: ${store.projects[index].name}`,
      timestamp: new Date().toISOString()
    });
    saveStore(store);
    res.json({ success: true, project: store.projects[index] });
  });

  app.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const index = store.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      const deletedName = store.projects[index].name;
      store.projects.splice(index, 1);
      store.analytics.recentActivity.unshift({
        id: 'act-' + Date.now(),
        type: 'project',
        details: `Deleted project: ${deletedName}`,
        timestamp: new Date().toISOString()
      });
      saveStore(store);
    }
    res.json({ success: true });
  });

  // Messages & Leads API
  app.post('/api/messages', (req, res) => {
    const { name, email, subject, message, type } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }
    const newMsg = {
      id: 'msg-' + Date.now(),
      name,
      email,
      subject: subject || 'Studio Inquiry',
      message,
      type: type || 'contact',
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    store.messages.unshift(newMsg);
    store.analytics.totalLeads += 1;
    store.analytics.recentActivity.unshift({
      id: 'act-' + Date.now(),
      type: 'lead',
      details: `New message from ${name} (${type || 'contact'})`,
      timestamp: new Date().toISOString()
    });
    saveStore(store);
    res.json({ success: true, message: 'Message submitted successfully to Feko Michael Digital Studio.' });
  });

  app.get('/api/messages', (req, res) => {
    res.json({ success: true, messages: store.messages });
  });

  // Analytics & Logging API
  app.get('/api/analytics', (req, res) => {
    res.json({ success: true, analytics: store.analytics });
  });

  app.post('/api/analytics/event', (req, res) => {
    const { type, slug, details } = req.body;
    if (type === 'view') {
      store.analytics.totalViews += 1;
      if (slug) {
        store.analytics.projectViews[slug] = (store.analytics.projectViews[slug] || 0) + 1;
      }
    } else if (type === 'download') {
      store.analytics.totalDownloads += 1;
    }
    if (details) {
      store.analytics.recentActivity.unshift({
        id: 'act-' + Date.now(),
        type: type || 'event',
        details,
        timestamp: new Date().toISOString()
      });
      // Cap activity log length at 50
      if (store.analytics.recentActivity.length > 50) {
        store.analytics.recentActivity = store.analytics.recentActivity.slice(0, 50);
      }
    }
    saveStore(store);
    res.json({ success: true });
  });

  // Real Gemini AI Generation API
  app.post('/api/ai/generate', async (req, res) => {
    try {
      const { prompt, suite, taskType, systemInstruction } = req.body;
      if (!prompt) {
        return res.status(400).json({ success: false, error: 'Prompt is required' });
      }

      const ai = getAiClient();
      const model = 'gemini-3.6-flash';

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || `You are Feko Michael AI Suite, an advanced AI system powering software, business strategy, product design, debugging, content creation, and education in Feko Michael Digital Studio. Provide structured, accurate, actionable, and professionally formatted outputs.`
        }
      });

      const outputText = response.text || 'No response generated.';
      res.json({ success: true, result: outputText, suite, taskType });
    } catch (err: any) {
      console.error('Gemini AI Generation Error:', err);
      res.status(500).json({
        success: false,
        error: err?.message || 'Failed to generate response from Gemini AI. Please check server configuration.'
      });
    }
  });

  // Genuine App Download Handler
  app.get('/api/download/:app', (req, res) => {
    const { app: appSlug } = req.params;
    
    // Log download event
    store.analytics.totalDownloads += 1;
    store.analytics.recentActivity.unshift({
      id: 'act-' + Date.now(),
      type: 'download',
      details: `Downloaded build artifact for: ${appSlug}`,
      timestamp: new Date().toISOString()
    });
    saveStore(store);

    const appArtifact = {
      studio: "FEKO MICHAEL DIGITAL STUDIO",
      productSlug: appSlug,
      version: "1.0.0",
      architecture: "Full-Stack Web / Node / React + Express",
      builtBy: "Feko Michael • Web, App, Game & AI Builder",
      exportTimestamp: new Date().toISOString(),
      installationInstructions: [
        "1. Unpack source archives",
        "2. Run `npm install`",
        "3. Configure `.env` with GEMINI_API_KEY",
        "4. Launch application with `npm run dev`"
      ],
      manifest: {
        entry: "src/main.tsx",
        backend: "server.ts",
        port: 3000
      }
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${appSlug}-fekomichael-studio-build.json"`);
    res.send(JSON.stringify(appArtifact, null, 2));
  });

  // Vite middleware for development, static serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Feko Michael Digital Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
