import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Zap, 
  Database, 
  ShieldAlert, 
  Activity, 
  History, 
  Settings,
  Terminal,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { clsx } from 'clsx';
import { StatusBadge } from './UI';

const NavItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link 
    to={to} 
    className={clsx(
      "flex items-center gap-3 p-3 transition-all border-l-4",
      active 
        ? "bg-white/10 border-red-600 text-white" 
        : "border-transparent text-white/40 hover:text-white/70 hover:bg-white/5"
    )}
  >
    <Icon size={18} />
    <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
  </Link>
);

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen border-r-4 border-black bg-[#121212] flex flex-col">
      <div className="p-6 border-b-4 border-black">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="text-red-600" size={24} />
          <h1 className="text-xl font-black tracking-tighter uppercase">Krasnaya</h1>
        </div>
        <StatusBadge active={true} />
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-6 mb-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Management</div>
        <NavItem to="/" icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/'} />
        <NavItem to="/flows" icon={Zap} label="Automations" active={location.pathname === '/flows'} />
        <NavItem to="/commands" icon={Layers} label="Commands" active={location.pathname === '/commands'} />
        <NavItem to="/economy" icon={ShoppingBag} label="Economy" active={location.pathname === '/economy'} />
        <NavItem to="/database" icon={Database} label="Variables" active={location.pathname === '/database'} />

        <div className="px-6 mt-8 mb-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">System Admin</div>
        <NavItem to="/admin/system" icon={Activity} label="Monitor" active={location.pathname === '/admin/system'} />
        <NavItem to="/admin/ledger" icon={History} label="Audit Ledger" active={location.pathname === '/admin/ledger'} />
        <NavItem to="/admin/rbac" icon={ShieldAlert} label="Security" active={location.pathname === '/admin/rbac'} />
      </div>

      <div className="p-6 border-t-4 border-black bg-black/20">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-bold opacity-30">V.2.5.0-STABLE</div>
          <Settings size={14} className="opacity-30 hover:opacity-100 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 relative">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
};
