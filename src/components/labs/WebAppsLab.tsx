import React, { useState } from 'react';
import { Users, Package, FileText, CheckSquare, Plus, Search, Trash2, ArrowRight, DollarSign, Download, Filter } from 'lucide-react';

interface WebAppsLabProps {
  defaultApp?: 'crm' | 'inventory' | 'invoice' | 'kanban';
}

export const WebAppsLab: React.FC<WebAppsLabProps> = ({ defaultApp = 'crm' }) => {
  const [activeApp, setActiveApp] = useState<'crm' | 'inventory' | 'invoice' | 'kanban'>(defaultApp);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl max-w-5xl mx-auto">
      {/* App Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-800 pb-5 mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Advanced Business Application Laboratory</h2>
          <p className="text-xs text-slate-400">Working enterprise software tools built by Feko Michael.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveApp('crm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeApp === 'crm' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Sales CRM
          </button>
          <button
            onClick={() => setActiveApp('inventory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeApp === 'inventory' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Package className="w-3.5 h-3.5" /> Inventory Manager
          </button>
          <button
            onClick={() => setActiveApp('invoice')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeApp === 'invoice' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> PDF Invoice System
          </button>
          <button
            onClick={() => setActiveApp('kanban')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeApp === 'kanban' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" /> Agile Kanban
          </button>
        </div>
      </div>

      {activeApp === 'crm' && <CRMModule />}
      {activeApp === 'inventory' && <InventoryModule />}
      {activeApp === 'invoice' && <InvoiceModule />}
      {activeApp === 'kanban' && <KanbanModule />}
    </div>
  );
};

// --- CRM Module ---
const CRMModule: React.FC = () => {
  const [leads, setLeads] = useState([
    { id: '1', name: 'Honda Josh Motors', value: 45000, stage: 'Qualified', contact: 'josh@hondajosh.com' },
    { id: '2', name: 'Michael & Partners Law', value: 18000, stage: 'Proposal', contact: 'contact@mpartners.com' },
    { id: '3', name: 'Apex Horizon Realty', value: 24000, stage: 'Negotiation', contact: 'sales@apexhorizon.com' }
  ]);
  const [newLeadName, setNewLeadName] = useState('');
  const [newValue, setNewValue] = useState('10000');

  const addLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim()) return;
    setLeads([
      ...leads,
      {
        id: Date.now().toString(),
        name: newLeadName,
        value: parseFloat(newValue) || 5000,
        stage: 'Qualified',
        contact: 'client@company.com'
      }
    ]);
    setNewLeadName('');
  };

  const moveStage = (id: string, nextStage: string) => {
    setLeads(leads.map(l => l.id === id ? { ...l, stage: nextStage } : l));
  };

  return (
    <div className="space-y-6">
      {/* Add Lead Form */}
      <form onSubmit={addLead} className="flex flex-col sm:flex-row gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <input
          type="text"
          placeholder="New Client / Deal Name..."
          value={newLeadName}
          onChange={e => setNewLeadName(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
        />
        <input
          type="number"
          placeholder="Deal Value ($)"
          value={newValue}
          onChange={e => setNewValue(e.target.value)}
          className="w-32 bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-cyan-400 transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Deal
        </button>
      </form>

      {/* Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Qualified', 'Proposal', 'Negotiation'].map(stage => (
          <div key={stage} className="bg-slate-950 rounded-xl p-4 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">{stage}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {leads.filter(l => l.stage === stage).length}
              </span>
            </div>

            <div className="space-y-3">
              {leads.filter(l => l.stage === stage).map(lead => (
                <div key={lead.id} className="bg-slate-900 p-3 rounded-lg border border-slate-800 hover:border-slate-700 transition">
                  <div className="text-sm font-semibold text-white mb-1">{lead.name}</div>
                  <div className="text-xs text-slate-400 mb-2">{lead.contact}</div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <span className="font-bold text-emerald-400">${lead.value.toLocaleString()}</span>
                    {stage !== 'Negotiation' && (
                      <button
                        onClick={() => moveStage(lead.id, stage === 'Qualified' ? 'Proposal' : 'Negotiation')}
                        className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
                      >
                        Move Next <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Inventory Module ---
const InventoryModule: React.FC = () => {
  const [items, setItems] = useState([
    { sku: 'AUTO-PART-101', name: 'Brake Disc Rotor', category: 'Automotive', stock: 42, minThreshold: 15, price: 120 },
    { sku: 'AUTO-PART-204', name: 'Synthetic Engine Oil 5L', category: 'Automotive', stock: 8, minThreshold: 10, price: 45 },
    { sku: 'ECOM-SKU-909', name: 'Wireless Ergonomic Mouse', category: 'Electronics', stock: 110, minThreshold: 20, price: 65 }
  ]);
  const [filter, setFilter] = useState('');

  const updateStock = (sku: string, delta: number) => {
    setItems(items.map(item => item.sku === sku ? { ...item, stock: Math.max(0, item.stock + delta) } : item));
  };

  const filteredItems = items.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()) || i.sku.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search SKU or item name..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div className="text-xs text-slate-400">
          Total SKUs: <strong className="text-cyan-400">{items.length}</strong>
        </div>
      </div>

      <div className="overflow-x-auto bg-slate-950 rounded-xl border border-slate-800">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
            <tr>
              <th className="p-3">SKU</th>
              <th className="p-3">Item Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Unit Price</th>
              <th className="p-3">In Stock</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredItems.map(item => {
              const isLow = item.stock <= item.minThreshold;
              return (
                <tr key={item.sku} className="hover:bg-slate-900/50">
                  <td className="p-3 font-mono text-cyan-400 font-semibold">{item.sku}</td>
                  <td className="p-3 font-medium text-white">{item.name}</td>
                  <td className="p-3 text-slate-400">{item.category}</td>
                  <td className="p-3 font-semibold text-emerald-400">${item.price}</td>
                  <td className="p-3 font-bold">{item.stock} units</td>
                  <td className="p-3">
                    {isLow ? (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold">
                        Low Stock
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                        Optimal
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button onClick={() => updateStock(item.sku, 1)} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold">+</button>
                      <button onClick={() => updateStock(item.sku, -1)} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold">-</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Invoice Module ---
const InvoiceModule: React.FC = () => {
  const [clientName, setClientName] = useState('Honda Josh Enterprise');
  const [items, setItems] = useState([
    { description: 'Full-Stack Automotive System Core', hours: 40, rate: 120 },
    { description: 'Custom Inventory & Booking API Integration', hours: 25, rate: 120 }
  ]);

  const subtotal = items.reduce((acc, i) => acc + (i.hours * i.rate), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
      <div className="flex justify-between items-start border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white">FEKO MICHAEL DIGITAL STUDIO</h3>
          <p className="text-xs text-slate-400">Invoice #FM-2026-8801</p>
        </div>
        <div className="text-right">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold uppercase">
            Payment Due
          </span>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1">Bill To Client:</label>
        <input
          type="text"
          value={clientName}
          onChange={e => setClientName(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500 w-full max-w-md"
        />
      </div>

      <div className="space-y-3">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Line Items</div>
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3 items-center bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
            <span className="flex-1 font-medium text-white">{item.description}</span>
            <span className="text-slate-400">{item.hours} hrs @ ${item.rate}/hr</span>
            <span className="font-bold text-emerald-400">${(item.hours * item.rate).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-800 pt-4 flex justify-between items-center text-xs">
        <div className="text-slate-400">
          Tax Rate: 10% VAT
        </div>
        <div className="text-right space-y-1">
          <div>Subtotal: <strong className="text-slate-200">${subtotal.toLocaleString()}</strong></div>
          <div>Tax (10%): <strong className="text-slate-200">${tax.toLocaleString()}</strong></div>
          <div className="text-base font-bold text-cyan-400 pt-2 border-t border-slate-800">Total: ${total.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

// --- Kanban Module ---
const KanbanModule: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Optimize Express Gemini AI Route', status: 'In Progress', priority: 'High' },
    { id: '2', title: 'Deploy Honda Josh Vehicle Configurator', status: 'Done', priority: 'Medium' },
    { id: '3', title: 'Audit Password Hashing Security', status: 'To Do', priority: 'High' }
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {['To Do', 'In Progress', 'Done'].map(status => (
        <div key={status} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 border-b border-slate-800 pb-2">
            {status} ({tasks.filter(t => t.status === status).length})
          </div>
          <div className="space-y-3">
            {tasks.filter(t => t.status === status).map(task => (
              <div key={task.id} className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                <div className="font-semibold text-white mb-2">{task.title}</div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">{task.priority} Priority</span>
                  <span className="text-slate-500 font-mono">ID: {task.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
