import React, { useState, useEffect } from 'react';
import { Lock, Key, ShieldCheck, Plus, Trash2, Edit3, Save, LogOut, RefreshCw, Layers, Users, Download, Eye, AlertCircle, CheckCircle } from 'lucide-react';
import { Project, ProjectStatus, ProjectOrigin, Message } from '../types';

interface AdminDashboardProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  navigate: (route: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ projects, setProjects, navigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'messages' | 'security'>('overview');

  // Change Password state
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');

  // Messages State
  const [messages, setMessages] = useState<Message[]>([]);
  const [analytics, setAnalytics] = useState({
    totalViews: 1420,
    totalDownloads: 312,
    totalLeads: 18,
    recentActivity: [] as any[]
  });

  // Project Editing State
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);

  const fetchAdminData = async () => {
    try {
      const msgRes = await fetch('/api/messages');
      const msgData = await msgRes.json();
      if (msgData.success) setMessages(msgData.messages);

      const anaRes = await fetch('/api/analytics');
      const anaData = await anaRes.json();
      if (anaData.success) setAnalytics(anaData.analytics);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setPasswordInput('');
        fetchAdminData();
      } else {
        setAuthError(data.message || 'Invalid administrative credentials');
      }
    } catch (err) {
      setAuthError('Server communication error during auth check.');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMsg('');

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: currentPwd, newPassword: newPwd })
      });

      const data = await res.json();
      if (data.success) {
        setPwdMsg('Password updated successfully.');
        setCurrentPwd('');
        setNewPwd('');
      } else {
        setPwdMsg('Error: ' + data.message);
      }
    } catch (err) {
      setPwdMsg('Network error updating password.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      setProjects(projects.filter(p => p.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.name) return;

    try {
      if (editingProject.id) {
        // Update
        const res = await fetch(`/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingProject)
        });
        const data = await res.json();
        if (data.success) {
          setProjects(projects.map(p => p.id === editingProject.id ? data.project : p));
        }
      } else {
        // Add
        const newSlug = editingProject.slug || editingProject.name.toLowerCase().replace(/\s+/g, '-');
        const payload = {
          ...editingProject,
          slug: newSlug,
          category: editingProject.category || 'websites',
          status: editingProject.status || 'LIVE',
          projectOrigin: editingProject.projectOrigin || 'Independent Product',
          technologies: editingProject.technologies || ['React 19', 'TypeScript'],
          features: editingProject.features || ['Custom Integration'],
          internalRoute: `/projects/${newSlug}`
        };
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          setProjects([...projects, data.project]);
        }
      }
      setEditingProject(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full space-y-6 shadow-2xl text-slate-100">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Private Studio Administration</h2>
            <p className="text-xs text-slate-400">Authenticated entry for Feko Michael.</p>
          </div>

          {authError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Administrator Security Token / Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg"
            >
              Authenticate Admin Session
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-100">
      {/* Admin Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase mb-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Authenticated Administrator
          </div>
          <h1 className="text-2xl font-black text-white">Feko Michael Studio Control Portal</h1>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> End Admin Session
        </button>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex border-b border-slate-800 space-x-4 text-xs font-bold">
        {[
          { id: 'overview', label: 'Studio Metrics & Analytics' },
          { id: 'projects', label: 'Project Content Manager' },
          { id: 'messages', label: 'Leads & Client Inbox' },
          { id: 'security', label: 'Security & Password' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 border-b-2 transition ${
              activeTab === tab.id
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview Metrics */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold uppercase mb-1">Total Catalog Projects</div>
              <div className="text-3xl font-black text-white">{projects.length}</div>
            </div>
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold uppercase mb-1">Total Project Views</div>
              <div className="text-3xl font-black text-cyan-400">{analytics.totalViews}</div>
            </div>
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold uppercase mb-1">Total Build Downloads</div>
              <div className="text-3xl font-black text-emerald-400">{analytics.totalDownloads}</div>
            </div>
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold uppercase mb-1">Client Inquiries / Leads</div>
              <div className="text-3xl font-black text-amber-400">{messages.length}</div>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Recent Server Activity Audit Trail</h3>
            <div className="space-y-2">
              {analytics.recentActivity?.map((act: any, idx: number) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                  <span className="font-mono text-cyan-400">{act.details}</span>
                  <span className="text-[10px] text-slate-500">{act.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Project CRUD Management */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Project Catalog Content Management</h2>
            <button
              onClick={() => setEditingProject({ name: '', description: '', status: 'LIVE', projectOrigin: 'Independent Product' })}
              className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-400 transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </button>
          </div>

          {/* Edit / Add Modal Form */}
          {editingProject && (
            <form onSubmit={handleSaveProject} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">{editingProject.id ? 'Edit Product' : 'Add New Product'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={editingProject.name || ''}
                    onChange={e => setEditingProject({ ...editingProject, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={editingProject.category || 'websites'}
                    onChange={e => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="websites">Websites</option>
                    <option value="apps">Applications</option>
                    <option value="ai">AI Product</option>
                    <option value="saas">SaaS Product</option>
                    <option value="games">Game Studio</option>
                    <option value="tools">Developer Tool</option>
                    <option value="interactive">3D / Interactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project Status</label>
                  <select
                    value={editingProject.status || 'LIVE'}
                    onChange={e => setEditingProject({ ...editingProject, status: e.target.value as ProjectStatus })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="LIVE">LIVE</option>
                    <option value="BETA">BETA</option>
                    <option value="DEVELOPMENT">DEVELOPMENT</option>
                    <option value="CONCEPT">CONCEPT</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project Origin</label>
                  <select
                    value={editingProject.projectOrigin || 'Independent Product'}
                    onChange={e => setEditingProject({ ...editingProject, projectOrigin: e.target.value as ProjectOrigin })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Client Project">Client Project</option>
                    <option value="Personal Project">Personal Project</option>
                    <option value="Independent Product">Independent Product</option>
                    <option value="Open-Source Project">Open-Source Project</option>
                    <option value="Experimental Project">Experimental Project</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingProject.description || ''}
                  onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-500 text-slate-950 text-xs font-bold rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          )}

          {/* Table */}
          <div className="overflow-x-auto bg-slate-900 rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Origin</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {projects.map(p => (
                  <tr key={p.id} className="hover:bg-slate-950/50">
                    <td className="p-4 font-bold text-white">{p.name}</td>
                    <td className="p-4 uppercase text-cyan-400 font-mono text-[11px]">{p.category}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">{p.projectOrigin}</td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => setEditingProject(p)} className="p-1.5 bg-slate-800 text-cyan-400 rounded hover:bg-slate-700">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteProject(p.id)} className="p-1.5 bg-slate-800 text-rose-400 rounded hover:bg-slate-700">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Messages Inbox */}
      {activeTab === 'messages' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white">Client Inquiry Messages & Leads</h2>
          <div className="space-y-3">
            {messages.map((m) => (
              <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{m.name} ({m.email})</span>
                  <span className="text-[10px] text-slate-500">{m.createdAt}</span>
                </div>
                <div className="text-xs font-semibold text-cyan-400">{m.subject}</div>
                <p className="text-xs text-slate-300 pt-1">{m.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Security & Password */}
      {activeTab === 'security' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 max-w-lg mx-auto space-y-4">
          <h2 className="text-lg font-bold text-white">Change Admin Security Password</h2>
          <p className="text-xs text-slate-400">Update administrative password stored securely on server.</p>

          {pwdMsg && (
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-cyan-400 font-semibold">
              {pwdMsg}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Current Password</label>
              <input
                type="password"
                required
                value={currentPwd}
                onChange={e => setCurrentPwd(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPwd}
                onChange={e => setNewPwd(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-400"
            >
              Update Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
