import React from 'react';
import { useEmitra } from '../context/EmitraContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { calculateEmissions } from '../utils/cbamCalculator';
import { Calculator, TrendingDown, BarChart3, Info, Factory } from 'lucide-react';

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
      : 1
  );

  const manualCost = company.results.manualAuditCostIdr;
  const emitraCost = company.results.emitraCostY1Idr;
  const totalEmissions = result.totalDirectEmissions + result.totalIndirectEmissions;
  const scope1Percent = totalEmissions > 0 ? (result.totalDirectEmissions / totalEmissions * 100) : 50;
  const scope2Percent = totalEmissions > 0 ? (result.totalIndirectEmissions / totalEmissions * 100) : 50;

  return (
    <>
      <div className="mb-6">
        <p className="d-label mb-2">05 · Calculation</p>
        <h1 className="d-title">Emission Calculation</h1>
        <p className="d-subtitle mt-1">{company.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-5">
          <p className="text-sm text-zinc-400 mb-1">Scope 1 — Direct Emissions</p>
          <p className="text-3xl font-heading font-bold text-white">{result.totalDirectEmissions.toFixed(1)}</p>
          <p className="text-xs text-zinc-500">tCO₂e (fuel, process emissions)</p>
          <div className="progress-bar mt-3">
            <div className="progress-bar__fill" style={{ width: `${scope1Percent.toFixed(0)}%`, background: '#F5A623' }} />
          </div>
        </div>

        <div className="glass-card p-5">
          <p className="text-sm text-zinc-400 mb-1">Scope 2 — Indirect Emissions</p>
          <p className="text-3xl font-heading font-bold text-white">{result.totalIndirectEmissions.toFixed(1)}</p>
          <p className="text-xs text-zinc-500">tCO₂e (electricity, PLN)</p>
          <div className="progress-bar mt-3">
            <div className="progress-bar__fill" style={{ width: `${scope2Percent.toFixed(0)}%`, background: '#3b82f6' }} />
          </div>
        </div>

        <div className="glass-card p-5">
          <p className="text-sm text-zinc-400 mb-1">Embedded Intensity</p>
          <p className="text-3xl font-heading font-bold text-emeraldc">{result.embeddedEmissionsIntensity}</p>
          <p className="text-xs text-zinc-500">tCO₂e per ton product</p>
          <div className="progress-bar mt-3">
            <div className="progress-bar__fill" style={{ width: '100%', background: '#0A8754' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="glass-card p-5">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm">
            <BarChart3 className="w-4 h-4 text-emeraldc" />
            Calculation Breakdown
          </h3>
          <div className="space-y-0">
            <div className="stat-inline">
              <span className="stat-inline__label">Total Direct Emissions</span>
              <span className="stat-inline__value">{result.totalDirectEmissions.toFixed(2)} tCO₂e</span>
            </div>
            <div className="stat-inline">
              <span className="stat-inline__label">Total Indirect Emissions</span>
              <span className="stat-inline__value">{result.totalIndirectEmissions.toFixed(2)} tCO₂e</span>
            </div>
            <div className="stat-inline">
              <span className="stat-inline__label">Production Output</span>
              <span className="stat-inline__value">{result.totalProductionOutput.toFixed(2)} metric tons</span>
            </div>
            <div className="stat-inline">
              <span className="stat-inline__label">EU Methodology</span>
              <span className="stat-inline__value">EU-CBAM-2026-V1</span>
            </div>
            <div className="stat-inline">
              <span className="stat-inline__label">CBAM Certificate Exposure</span>
              <span className="stat-inline__value warn">€ {result.cbamCertificateExposureEur.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm">
            <TrendingDown className="w-4 h-4 text-emeraldc" />
            Cost Savings
          </h3>
          <div className="space-y-3">
            <div className="cost-chip cost-chip--without">
              <div>
                <p className="cost-chip__label">Manual Audit Cost</p>
                <p className="cost-chip__value cost-chip__value--strikethrough">Rp {(manualCost / 1_000_000).toFixed(0)}M</p>
              </div>
              <Badge status="REJECTED">Without Emitra</Badge>
            </div>
            <div className="cost-chip cost-chip--with">
              <div>
                <p className="cost-chip__label">Emitra Y1 Cost</p>
                <p className="cost-chip__value cost-chip__value--save">Rp {(emitraCost / 1_000_000).toFixed(0)}M</p>
              </div>
              <Badge status="VERIFIED">Save {company.results.savingsY1Percent}%</Badge>
            </div>

            <div className="pt-3 border-t border-white/[0.04]">
              <p className="cost-chip__label mb-1">Year 2+ Annual Savings</p>
              <p className="text-2xl font-heading font-bold text-emeraldc">67%</p>
              <p className="text-xs text-zinc-500 mt-0.5">vs manual audit — subscription only, no setup fee</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-4" style={{ background: 'rgba(245, 166, 35, 0.04)', borderColor: 'rgba(245, 166, 35, 0.12)' }}>
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amberc shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-white mb-1">EU CBAM Methodology — Deterministic Engine</p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Formula: <code className="text-emeraldc">E_embedded = (Scope1 + Scope2) / Production_Output</code>
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Every number is traceable to source documents. No AI black-box — 100% auditable by Sucofindo/SGS.
              CBAM certificate price: €75.36/tCO₂ (EEX 2026).
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
