import React, { useState } from 'react';
import { Car, Scale, Utensils, Building2, GraduationCap, Hotel, ShoppingBag, Search, Calendar, Phone, CheckCircle, Star, ArrowRight } from 'lucide-react';

interface CommercialWebsitesLabProps {
  platformType?: 'automotive' | 'law-firm' | 'restaurant' | 'real-estate' | 'school' | 'hotel' | 'ecommerce';
}

export const CommercialWebsitesLab: React.FC<CommercialWebsitesLabProps> = ({ platformType = 'automotive' }) => {
  const [activePlatform, setActivePlatform] = useState(platformType);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-800 pb-5 mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Commercial Website & Enterprise Portal Laboratory</h2>
          <p className="text-xs text-slate-400">Live operational platforms for enterprise businesses.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActivePlatform('automotive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activePlatform === 'automotive' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Car className="w-3.5 h-3.5" /> Automotive
          </button>
          <button
            onClick={() => setActivePlatform('law-firm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activePlatform === 'law-firm' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Scale className="w-3.5 h-3.5" /> Law Firm
          </button>
          <button
            onClick={() => setActivePlatform('restaurant')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activePlatform === 'restaurant' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" /> Restaurant
          </button>
          <button
            onClick={() => setActivePlatform('real-estate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activePlatform === 'real-estate' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" /> Real Estate
          </button>
          <button
            onClick={() => setActivePlatform('ecommerce')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activePlatform === 'ecommerce' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" /> E-Commerce
          </button>
        </div>
      </div>

      {activePlatform === 'automotive' && <AutomotivePlatformView />}
      {activePlatform === 'law-firm' && <LawFirmPlatformView />}
      {activePlatform === 'restaurant' && <RestaurantPlatformView />}
      {activePlatform === 'real-estate' && <RealEstatePlatformView />}
      {activePlatform === 'ecommerce' && <EcommercePlatformView />}
    </div>
  );
};

const AutomotivePlatformView: React.FC = () => {
  const [vehicles] = useState([
    { name: '2026 Honda Civic Type R', price: '$44,890', mileage: '120 miles', type: 'Performance' },
    { name: '2026 Honda CR-V Hybrid', price: '$38,250', mileage: '0 miles', type: 'SUV' },
    { name: '2026 Honda Accord Touring', price: '$39,800', mileage: '450 miles', type: 'Sedan' }
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white">HONDA JOSH AUTOMOTIVE NETWORK</h3>
          <p className="text-xs text-slate-400 mt-1">Official Dealer Inventory, Spare Parts & Maintenance Portal</p>
        </div>
        <button className="px-5 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-400">
          Schedule Service Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles.map((v, i) => (
          <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="h-32 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center">
              <Car className="w-12 h-12 text-cyan-400 opacity-60" />
            </div>
            <div className="text-sm font-bold text-white">{v.name}</div>
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>{v.type}</span>
              <span>{v.mileage}</span>
            </div>
            <div className="text-base font-bold text-cyan-400 pt-2 border-t border-slate-800 flex justify-between items-center">
              <span>{v.price}</span>
              <button className="text-xs text-slate-300 hover:text-white flex items-center gap-1">Details <ArrowRight className="w-3 h-3" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LawFirmPlatformView: React.FC = () => {
  return (
    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-2xl font-bold text-white">MICHAEL & PARTNERS ADVOCATES</h3>
        <p className="text-xs text-slate-400">Corporate Law, Technology Licensing & Intellectual Property Practice</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Corporate Governance', 'Intellectual Property', 'SaaS & AI Licensing'].map((practice, idx) => (
          <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <Scale className="w-6 h-6 text-cyan-400 mb-2" />
            <div className="text-sm font-bold text-white mb-1">{practice}</div>
            <p className="text-xs text-slate-400 mb-3">Enterprise legal representation and regulatory compliance architecture.</p>
            <button className="text-xs text-cyan-400 hover:underline">Request Consultation →</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const RestaurantPlatformView: React.FC = () => {
  const [cart, setCart] = useState<string[]>([]);
  const menu = [
    { id: '1', name: 'Truffle Wagyu Burger', price: '$22' },
    { id: '2', name: 'Wood-Fired Margherita Pizza', price: '$18' },
    { id: '3', name: 'Artisanal Matcha Latte', price: '$7' }
  ];

  return (
    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-2xl font-bold text-white">FEKO BISTRO & CULINARY LAB</h3>
          <p className="text-xs text-slate-400">Live Digital Menu, Table Reservations & Online Ordering</p>
        </div>
        <div className="text-xs bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          Cart Items: <strong className="text-cyan-400">{cart.length}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {menu.map(item => (
          <div key={item.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold text-white mb-1">{item.name}</div>
              <div className="text-sm font-semibold text-cyan-400 mb-3">{item.price}</div>
            </div>
            <button
              onClick={() => setCart([...cart, item.name])}
              className="w-full py-1.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-cyan-400"
            >
              Add to Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const RealEstatePlatformView: React.FC = () => {
  return (
    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-2xl font-bold text-white">APEX HORIZON REALTY</h3>
        <p className="text-xs text-slate-400">Luxury Residential & Commercial Property Directory</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="text-sm font-bold text-white mb-1">Skyline Tower Penthouse</div>
          <div className="text-xs text-slate-400 mb-2">3 Beds • 3.5 Baths • 3,200 sqft</div>
          <div className="text-lg font-bold text-cyan-400">$2,450,000</div>
        </div>
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="text-sm font-bold text-white mb-1">Coastal Villa Estate</div>
          <div className="text-xs text-slate-400 mb-2">5 Beds • 6 Baths • 5,800 sqft</div>
          <div className="text-lg font-bold text-cyan-400">$4,890,000</div>
        </div>
      </div>
    </div>
  );
};

const EcommercePlatformView: React.FC = () => {
  return (
    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-2xl font-bold text-white">URBAN EDGE STORE</h3>
        <p className="text-xs text-slate-400">Digital Goods, Electronics & Modern Apparel Marketplace</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Studio Noise-Canceling Headphones ($299)', 'Smart Cyber Watch V2 ($199)', 'Pro Mechanical Keyboard ($149)'].map((p, i) => (
          <div key={i} className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="text-sm font-bold text-white mb-3">{p}</div>
            <button className="w-full py-1.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg hover:bg-cyan-400">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
