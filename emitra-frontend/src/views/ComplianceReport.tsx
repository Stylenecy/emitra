import React, { useState } from 'react';
import { useEmitra } from '../context/EmitraContext';
import { Button } from '../components/ui/Button';
import { calculateEmissions } from '../utils/cbamCalculator';
import { generateCbamXml, downloadXml } from '../utils/xmlGenerator';
import { FileText, Download, BarChart3, Factory } from 'lucide-react';

export const ComplianceReport: React.FC = () => {
  const { getSelectedCompany } = useEmitra();
  const company = getSelectedCompany();
  const [showAudit, setShowAudit] = useState(false);

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
    company.results.totalEmissions > 0
      ? company.results.totalEmissions / company.results.embeddedEmissionPerTon
      : 0
  );

  const manualCost = company.results.manualAuditCostIdr;
  const emitraCost = company.results.emitraCostY1Idr;

  return (
    <>
      <div className="mb-6">
        <p className="d-label mb-2">06 · Report</p>
        <h1 className="d-title">CBAM Compliance Report</h1>
        <p className="d-subtitle mt-1">{company.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-5">
          <p className="text-sm text-zinc-400">Scope 1 (Direct)</p>
          <p className="text-2xl font-heading font-bold text-white mt-1">{company.results.scope1Tonnes} t</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-sm text-zinc-400">Scope 2 (Indirect)</p>
          <p className="text-2xl font-heading font-bold text-white mt-1">{company.results.scope2Tonnes} t</p>
        </div>
        <div className="glass-card p-5 cursor-pointer" onClick={() => setShowAudit(true)}>
          <p className="text-sm text-zinc-400">Embedded Intensity</p>
          <p className="text-2xl font-heading font-bold text-emeraldc mt-1">{result.embeddedEmissionsIntensity}</p>
          <p className="text-xs text-emeraldc mt-1 opacity-70 hover:opacity-100 transition-opacity">Click for audit trail →</p>
        </div>
      </div>

      <div className="glass-card p-5 mb-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm">
          <BarChart3 className="w-4 h-4 text-emeraldc" />
          Cost Comparison
        </h3>
        <div className="space-y-3">
          <div className="cost-chip cost-chip--without">
            <div>
              <p className="cost-chip__label">Manual Audit Cost</p>
              <p className="cost-chip__value cost-chip__value--strikethrough">Rp {(manualCost / 1_000_000).toFixed(0)}M</p>
            </div>
          </div>
          <div className="cost-chip cost-chip--with">
            <div>
              <p className="cost-chip__label">Emitra Y1 Cost</p>
              <p className="cost-chip__value cost-chip__value--save">Rp {(emitraCost / 1_000_000).toFixed(0)}M</p>
            </div>
          </div>
          <p className="text-sm text-amberc font-medium">Save {company.results.savingsY1Percent}% in Year 1</p>
        </div>
      </div>

      <div className="glass-card p-5" style={{ background: 'rgba(10, 135, 84, 0.03)', borderColor: 'rgba(10, 135, 84, 0.1)' }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emeraldc/10 flex items-center justify-center shrink-0">
            <Download className="w-6 h-6 text-emeraldc" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">Download CBAM XML</p>
            <p className="text-xs text-zinc-500 mt-0.5">EU Registry-ready format · Siap submit ke otoritas</p>
          </div>
          <Button
            onClick={() =>
              downloadXml(
                `cbam_report_${company.id}.xml`,
                generateCbamXml(company.name, `EMITRA-${company.id}`, result)
              )
            }
          >
            Generate & Download
          </Button>
        </div>
      </div>

      {showAudit && (
        <div className="modal-overlay" onClick={() => setShowAudit(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-heading font-bold text-white mb-4">Audit Trail — Embedded Intensity</h3>
            <p className="text-sm text-zinc-400">
              Formula: <code className="text-emeraldc">E_embedded = (DirEm + IndEm) / Prod_Output</code>
            </p>
            <div className="mt-3 p-3 bg-white/[0.02] rounded-btn border border-white/[0.04]">
              <p className="text-sm text-zinc-400">
                = ({company.results.scope1Tonnes} + {company.results.scope2Tonnes}) /{' '}
                {result.totalProductionOutput.toFixed(2)} t
              </p>
              <p className="text-sm text-emeraldc font-medium mt-2">
                = {result.embeddedEmissionsIntensity} tCO₂e/ton
              </p>
            </div>
            <Button className="mt-4 w-full" onClick={() => setShowAudit(false)}>Close</Button>
          </div>
        </div>
      )}
    </>
  );
};
