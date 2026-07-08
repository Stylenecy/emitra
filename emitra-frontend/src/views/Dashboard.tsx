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
    <div className={`d-fade-up ${delay} glass-card p-6 flex items-start gap-4`}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-heading font-semibold text-white leading-none mb-1">{value}</p>
        <p className="text-sm text-zinc-400">{label}</p>
      </div>
    </div>
  );
}

function CompanyCard({ company, isSelected, onClick }: {
  company: ReturnType<typeof useEmitra>['companies'][0];
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-xl border transition-all duration-500 p-5 ${
        isSelected
          ? 'border-emeraldc/30 bg-emeraldc/5 shadow-[inset_0_1px_0_rgba(10,135,84,0.1)]'
          : 'glass-card'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-lg bg-emeraldc/10 flex items-center justify-center shrink-0">
          <Factory className="w-4 h-4 text-emeraldc" />
        </div>
        <Badge status={company.complianceStatus === 'NON_COMPLIANT' ? 'REJECTED' : 'VERIFIED'}>
          {company.complianceStatus === 'NON_COMPLIANT' ? 'Not Compliant' : 'Compliant'}
        </Badge>
      </div>

      <h3 className="font-heading font-semibold text-base text-white leading-tight mb-1 group-hover:text-emeraldc transition-colors duration-300">
        {company.name}
      </h3>
      <p className="text-xs text-zinc-500 mb-3">
        {company.location} · {company.sector}
      </p>

      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/[0.04]">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">Export</p>
          <p className="text-sm font-medium text-zinc-200 flex items-center gap-1">
            ${(company.exportVolumeUsd / 1_000_000).toFixed(1)}M
            <Globe className="w-3 h-3 text-zinc-600" />
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">CO₂</p>
          <p className="text-sm font-medium text-zinc-200 flex items-center gap-1">
            {company.results.totalEmissions.toFixed(0)} t
            <Cloud className="w-3 h-3 text-emeraldc" />
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1 text-emeraldc opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs font-medium">Buka detail</span>
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
        <StatCard value={`${companies.length}`} label="Active Clients" icon={Factory} color="#0A8754" delay="d1" />
        <StatCard value={`${totalCO2.toFixed(0)} t`} label="Total CO₂ Tracked" icon={Cloud} color="#0A8754" delay="d2" />
        <StatCard value={`${avgSavings}%`} label="Avg Cost Savings" icon={TrendingUp} color="#F5A623" delay="d3" />
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
            />
          </div>
        ))}
      </div>
    </>
  );
}
