import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Upload, ShieldCheck, Calculator, FileText, Factory } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/upload', label: 'Upload', icon: Upload },
  { to: '/validate', label: 'Validate', icon: ShieldCheck },
  { to: '/calculate', label: 'Calculate', icon: Calculator },
  { to: '/report', label: 'Report', icon: FileText },
];

export function InternalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#080b14]">
      <aside className="w-64 bg-gradient-to-b from-[#0a0f1a]/95 to-[#080b14]/95 backdrop-blur-xl border-r border-white/[0.04] p-4 flex flex-col relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(10, 135, 84, 0.05) 0%, transparent 60%)'
          }}
        />

        <div className="flex items-center gap-2.5 px-3 py-4 mb-8 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emeraldc to-emerald-700 flex items-center justify-center shadow-lg shadow-emeraldc/20">
            <Factory className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <span className="font-heading font-bold text-base text-white tracking-tight">Emitra</span>
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium mt-0.5">CBAM Compliance</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 relative z-10">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-emeraldc/10 text-emeraldc border border-emeraldc/15 shadow-[inset_0_1px_0_rgba(10,135,84,0.1)]'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="pt-5 border-t border-white/[0.04] relative z-10">
          <p className="text-xs text-zinc-600 px-3">BMC #12 · PNB</p>
          <p className="text-xs text-zinc-600 px-3 mt-1">Grand Final: 20 Aug 2026</p>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto w-full">
        <div className="dashboard">
          <div className="d-grain" />
          <div className="d-pattern" />
          <div className="d-content max-w-6xl mx-auto w-full py-8 px-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
