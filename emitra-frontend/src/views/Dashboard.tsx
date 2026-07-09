import { useEffect } from 'react';
import { useEmitra } from '../context/EmitraContext';
import { Badge } from '../components/ui/Badge';
import { Factory, Globe, TrendingUp, Cloud, ArrowUpRight } from 'lucide-react';
import '../styles/dashboard.css';

function useDashFade() {
  useEffect(() => {
    const el = document.querySelectorAll('.dashboard .d-fade-up');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    el.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function StatCard({ value, label, icon: Icon, color, delay }: {
  value: string; label: string; icon: React.ElementType; color: string; delay: string
}) {
  return (
    <div className={`d-fade-up ${delay} glass-card p-6 flex items-start gap-4 border-white/[0.03] hover:border-white/10 transition-all duration-300`}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.04]" style={{ background: `linear-gradient(135deg, ${color}20, transparent)`, boxShadow: `0 0 20px ${color}10` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="min-w-0">
        <p className="text-3xl font-heading font-bold leading-none mb-1.5" style={{ color: '#ffffff', textShadow: `0 0 12px ${color}40` }}>{value}</p>
        <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">{label}</p>
      </div>
    </div>
  );
}

const COMPANY_STYLES = [
  {
    theme: 'emerald',
    color: '#10b981',
    bg: 'from-emerald-500/10 to-transparent',
    textGlow: 'text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.3)]',
  },
  {
    theme: 'amber',
    color: '#f59e0b',
    bg: 'from-amber-500/10 to-transparent',
    textGlow: 'text-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.3)]',
  },
  {
    theme: 'cyan',
    color: '#06b6d4',
    bg: 'from-cyan-500/10 to-transparent',
    textGlow: 'text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.3)]',
  },
  {
    theme: 'violet',
    color: '#8b5cf6',
    bg: 'from-violet-500/10 to-transparent',
    textGlow: 'text-violet-400 drop-shadow-[0_0_6px_rgba(139,92,246,0.3)]',
  },
  {
    theme: 'rose',
    color: '#f43f5e',
    bg: 'from-rose-500/10 to-transparent',
    textGlow: 'text-rose-400 drop-shadow-[0_0_6px_rgba(244,63,94,0.3)]',
  }
];

function CompanyCard({ company, isSelected, onClick, index }: {
  company: ReturnType<typeof useEmitra>['companies'][0];
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) {
  const style = COMPANY_STYLES[index % COMPANY_STYLES.length];
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-xl border transition-all duration-500 p-5 ${
        isSelected
          ? `bg-gradient-to-br ${style.bg}`
          : 'glass-card hover:border-white/10'
      }`}
      style={{
        borderColor: isSelected ? style.color : undefined,
        boxShadow: isSelected ? `0 0 25px ${style.color}15, inset 0 1px 0 rgba(255,255,255,0.05)` : undefined
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${style.color}15` }}>
          <Factory className="w-4 h-4" style={{ color: style.color }} />
        </div>
        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
          company.complianceStatus === 'NON_COMPLIANT' 
            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
        }`}>
          {company.complianceStatus === 'NON_COMPLIANT' ? 'Action Required' : 'Compliant'}
        </span>
      </div>

      <h3 className="font-heading font-bold text-base text-white leading-tight mb-1 group-hover:text-[#10b981] transition-colors duration-300">
        {company.name}
      </h3>
      <p className="text-xs text-zinc-500 mb-3 font-medium">
        {company.location} · {company.sector}
      </p>

      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/[0.04]">
        <div>
          <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Export Value</p>
          <p className="text-sm font-bold text-white flex items-center gap-1 mt-0.5">
            ${(company.exportVolumeUsd / 1_000_000).toFixed(1)}M
            <Globe className="w-3 h-3 text-zinc-600" />
          </p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">CO₂ Footprint</p>
          <p className={`text-sm flex items-center gap-1 mt-0.5 font-bold ${style.textGlow}`}>
            {company.results.totalEmissions.toFixed(0)} t
            <Cloud className="w-3 h-3" style={{ color: style.color }} />
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: style.color }}>
        <span className="text-xs font-bold">Buka detail</span>
        <ArrowUpRight className="w-3 h-3" />
      </div>
    </div>
  );
}

export function Dashboard() {
  const { companies, selectCompany, selectedCompanyId } = useEmitra();
  useDashFade();

  const totalCO2 = companies.reduce((sum, c) => sum + c.results.totalEmissions, 0);
  const totalExport = companies.reduce((sum, c) => sum + c.exportVolumeUsd, 0);
  const avgSavings = Math.round(companies.reduce((sum, c) => sum + c.results.savingsY1Percent, 0) / companies.length);

  return (
    <>
      <div className="mb-8 d-fade-up is-in">
        <p className="d-label mb-2">01 · Overview</p>
        <h1 className="d-title">Emitra Dashboard</h1>
        <p className="d-subtitle mt-1">Real-time CBAM compliance monitoring untuk eksportir RI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <StatCard value={`${companies.length}`} label="Active Clients" icon={Factory} color="#10b981" delay="d1" />
        <StatCard value={`${totalCO2.toFixed(0)} t`} label="Total CO₂ Tracked" icon={Cloud} color="#0ea5e9" delay="d2" />
        <StatCard value={`${avgSavings}%`} label="Avg Cost Savings" icon={TrendingUp} color="#f59e0b" delay="d3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="d-fade-up d1 glass-card p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium mb-1">Total Export Value</p>
            <p className="text-xl font-heading font-semibold text-white">USD {(totalExport / 1_000_000).toFixed(1)} Juta</p>
          </div>
          <Globe className="w-8 h-8 text-zinc-700" />
        </div>
        <div className="d-fade-up d2 glass-card p-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium mb-1">Total Klien Terkelola</p>
            <p className="text-xl font-heading font-semibold text-white">{companies.length} perusahaan</p>
          </div>
          <Factory className="w-8 h-8 text-zinc-700" />
        </div>
      </div>

      <div className="d-fade-up d3">
        <p className="d-label mb-2">02 · Clients</p>
        <h2 className="d-title mb-1">Perusahaan Terdaftar</h2>
        <p className="d-subtitle mb-6">Pilih perusahaan untuk melihat detail kepatuhan CBAM</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {companies.map((c, i) => (
          <div key={c.id} className={`d-fade-up ${i > 0 ? `d${Math.min(i + 1, 4)}` : ''}`}>
            <CompanyCard
              company={c}
              isSelected={selectedCompanyId === c.id}
              onClick={() => selectCompany(c.id)}
              index={i}
            />
          </div>
        ))}
      </div>
    </>
  );
}
