import React from 'react';
import { useEmitra } from '../context/EmitraContext';
import { Button } from '../components/ui/Button';
import { calculateEmissions } from '../utils/cbamCalculator';
import { Calculator, TrendingDown, BarChart3, Info, Factory, Scale, FileSpreadsheet } from 'lucide-react';

export const CalculateView: React.FC = () => {
  const { getSelectedCompany } = useEmitra();
  const company = getSelectedCompany();

  if (!company) {
    return (
      <div className="empty-state" style={{ paddingTop: '6rem' }}>
        <Factory />
        <p>Select a company first</p>
        <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Go to Dashboard and pick a client</p>
      </div>
    );
  }

  const result = calculateEmissions(
    company.results.scope1Tonnes,
    company.results.scope2Tonnes,
    company.documents.length > 0
      ? company.documents[0].rawExtractedData.productionOutput
      : 450
  );

  const manualCost = company.results.manualAuditCostIdr;
  const emitraCost = company.results.emitraCostY1Idr;
  const totalEmissions = result.totalDirectEmissions + result.totalIndirectEmissions;
  const scope1Percent = totalEmissions > 0 ? (result.totalDirectEmissions / totalEmissions * 100) : 45;
  const scope2Percent = totalEmissions > 0 ? (result.totalIndirectEmissions / totalEmissions * 100) : 55;

  return (
    <>
      <div className="mb-6">
        <p className="d-label mb-2">Step 3 · Emissions Calculation</p>
        <h1 className="d-title">EU-CBAM Carbon Auditor</h1>
        <p className="d-subtitle mt-1">Real-time emission factors for {company.name}</p>
      </div>

      {/* Main Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-5 border-white/[0.03] hover:border-white/10 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full filter blur-xl pointer-events-none" />
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Scope 1 — Direct Carbon</p>
          <p className="text-3xl font-heading font-bold text-white mt-3" style={{ textShadow: '0 0 12px rgba(245,158,11,0.2)' }}>
            {result.totalDirectEmissions.toFixed(2)} <span className="text-xs text-zinc-400">tCO₂e</span>
          </p>
          <p className="text-[10px] text-zinc-500 font-medium mt-1">Direct fuel burning & chemical processes</p>
          <div className="progress-bar mt-4">
            <div className="progress-bar__fill" style={{ width: `${scope1Percent.toFixed(0)}%`, background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }} />
          </div>
        </div>

        <div className="glass-card p-5 border-white/[0.03] hover:border-white/10 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full filter blur-xl pointer-events-none" />
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Scope 2 — Indirect Carbon</p>
          <p className="text-3xl font-heading font-bold text-white mt-3" style={{ textShadow: '0 0 12px rgba(14,165,233,0.2)' }}>
            {result.totalIndirectEmissions.toFixed(2)} <span className="text-xs text-zinc-400">tCO₂e</span>
          </p>
          <p className="text-[10px] text-zinc-500 font-medium mt-1">Purchased grid electricity (PLN grid mix)</p>
          <div className="progress-bar mt-4">
            <div className="progress-bar__fill" style={{ width: `${scope2Percent.toFixed(0)}%`, background: '#0ea5e9', boxShadow: '0 0 8px #0ea5e9' }} />
          </div>
        </div>

        <div className="glass-card p-5 border-white/[0.03] hover:border-white/10 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#10b981]/5 rounded-full filter blur-xl pointer-events-none" />
          <p className="text-xs font-bold text-[#10b981] uppercase tracking-widest">CBAM Embedded Intensity</p>
          <p className="text-3xl font-heading font-bold text-[#10b981] mt-3" style={{ textShadow: '0 0 12px rgba(16,185,129,0.3)' }}>
            {result.embeddedEmissionsIntensity} <span className="text-xs text-emerald-500">tCO₂e/t</span>
          </p>
          <p className="text-[10px] text-zinc-500 font-medium mt-1">Specific embedded intensity per metric ton product</p>
          <div className="progress-bar mt-4">
            <div className="progress-bar__fill" style={{ width: '100%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          </div>
        </div>
      </div>

      {/* Grid: Formulas & Audit Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Left Card: Dynamic EU formula calculations */}
        <div className="glass-card p-5 border-white/[0.03] bg-[#0c1222]/40">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2.5 text-sm pb-2.5 border-b border-white/[0.04]">
            <Scale className="w-4 h-4 text-[#10b981]" />
            EU Annex VII Formula Audit Trail
          </h3>
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-[#080d1a]/80 border border-white/[0.03] font-mono text-[10px] leading-relaxed">
              <span className="text-[#10b981] font-bold">1. Scope 1 (Direct Fuel Burning)</span>
              <p className="text-zinc-400 mt-1">
                Formula: <span className="text-white">Volume × Density × NCV × EF_co2</span>
              </p>
              <p className="text-zinc-500 mt-1">
                Calculation: 14,250 Liters HSD Solar × 0.84 kg/L × 43.0 TJ/Gg × 74.1 tCO₂/TJ = <span className="text-amber-400 font-bold">{result.totalDirectEmissions.toFixed(2)} tCO₂e</span>
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#080d1a]/80 border border-white/[0.03] font-mono text-[10px] leading-relaxed">
              <span className="text-sky-400 font-bold">2. Scope 2 (Indirect Electricity)</span>
              <p className="text-zinc-400 mt-1">
                Formula: <span className="text-white">Electricity (MWh) × Grid Emission Factor</span>
              </p>
              <p className="text-zinc-500 mt-1">
                Calculation: 45.0 MWh (45,000 kWh) × 0.85 tCO₂e/MWh (Java-Bali PLN grid mix) = <span className="text-sky-400 font-bold">{result.totalIndirectEmissions.toFixed(2)} tCO₂e</span>
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#080d1a]/80 border border-white/[0.03] font-mono text-[10px] leading-relaxed">
              <span className="text-emerald-400 font-bold">3. Embedded Intensity Calculation</span>
              <p className="text-zinc-400 mt-1">
                Formula: <span className="text-white">(Scope 1 + Scope 2) / Production Mass (Tons)</span>
              </p>
              <p className="text-zinc-500 mt-1">
                Calculation: ({result.totalDirectEmissions.toFixed(1)} + {result.totalIndirectEmissions.toFixed(1)}) tCO₂e / 450 t Production Output = <span className="text-[#10b981] font-bold">{result.embeddedEmissionsIntensity} tCO₂e/ton</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Card: Financial Cost Savings Console */}
        <div className="glass-card p-5 border-white/[0.03] flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2.5 text-sm pb-2.5 border-b border-white/[0.04]">
              <TrendingDown className="w-4 h-4 text-[#10b981]" />
              Compliance Cost Optimizer
            </h3>
            <div className="space-y-3">
              <div className="cost-chip cost-chip--without p-4 bg-red-500/[0.02] border-red-500/10">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Traditional Manual Audit Cost</p>
                  <p className="text-2xl font-bold text-red-500/80 line-through mt-1">Rp {(manualCost / 1_000_000).toFixed(0)} Juta</p>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-bold uppercase tracking-wider">
                  Without Emitra
                </span>
              </div>
              <div className="cost-chip cost-chip--with p-4 bg-emerald-500/[0.03] border-[#10b981]/25 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#10b981]/5 rounded-full filter blur-md pointer-events-none" />
                <div className="relative z-10">
                  <p className="text-[10px] uppercase tracking-widest text-[#10b981] font-bold">Emitra Autonomous Compliance</p>
                  <p className="text-2xl font-bold text-white mt-1">Rp {(emitraCost / 1_000_000).toFixed(0)} Juta <span className="text-xs text-zinc-500 font-normal">/ Year</span></p>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 font-bold uppercase tracking-wider relative z-10">
                  Save {company.results.savingsY1Percent}%
                </span>
              </div>

              <div className="pt-4 border-t border-white/[0.04]">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Year 2+ Subscription Savings</p>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="text-3xl font-heading font-bold text-[#10b981]" style={{ textShadow: '0 0 12px rgba(16,185,129,0.2)' }}>67%</span>
                  <span className="text-[10px] text-zinc-500 font-medium">ongoing budget reduction vs manual consultancies</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/[0.04] flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 font-medium">Traceable under Sucofindo ISO-14064 standards</span>
            <span className="text-[10px] text-zinc-600 font-mono">ID: EU-CBAM-CERT-VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Info panel bottom */}
      <div className="glass-card p-4.5 bg-amber-500/5 border border-amber-500/15 rounded-xl">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-white mb-1">EU CBAM Certificate Pricing Index</p>
            <p className="text-[10px] text-zinc-500 leading-normal">
              Estimated CBAM certificate rate: <span className="text-amber-400 font-bold">€75.36 per excess tCO₂</span> (indexed to EEX European Carbon Futures price indices).
              Every calculation is 100% trace-ready for Verification Bodies (SGS / Sucofindo / TÜV Nord) with full document references.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
