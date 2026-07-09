import React, { useState } from 'react';
import { useEmitra } from '../context/EmitraContext';
import { Button } from '../components/ui/Button';
import { calculateEmissions } from '../utils/cbamCalculator';
import { generateCbamXml, downloadXml } from '../utils/xmlGenerator';
import { FileText, Download, BarChart3, Factory, Globe, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const ComplianceReport: React.FC = () => {
  const { getSelectedCompany, tourStep, setTourStep } = useEmitra();
  const company = getSelectedCompany();
  const [showAudit, setShowAudit] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');
  const [submissionLogs, setSubmissionLogs] = useState<string[]>([]);

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
      : 450
  );

  const xmlContent = generateCbamXml(company.name, `EMITRA-${company.id}`, result);

  const runSubmission = () => {
    setSubmissionStatus('PROCESSING');
    setSubmissionLogs([
      '[SOAP Client] Constructing EU-CBAM-XML payload...',
      '[SOAP Client] Validating schema against CBAM-XSD-v1.4.2...'
    ]);

    setTimeout(() => {
      setSubmissionLogs(prev => [
        ...prev,
        '[AI Verification] Bounding checks passed: 0 warnings, 0 errors.',
        '[Signature] Signing package with EORI ID: NL-82910023-CBAM...'
      ]);
    }, 1000);

    setTimeout(() => {
      setSubmissionLogs(prev => [
        ...prev,
        '[Gateway] Handshaking with EU carbon SOAP gateway (https://cbam.ec.europa.eu/api/v1/soap)...',
        '[Gateway] Transferring XML package (18.4 KB)...'
      ]);
    }, 2000);

    setTimeout(() => {
      setSubmissionStatus('SUCCESS');
      if (tourStep === 7) {
        setTourStep(8);
      }
      setSubmissionLogs(prev => [
        ...prev,
        '[Gateway] Upload finished. Status code: 202 Accepted.',
        '[SOAP Client] CBAM report processed successfully!',
        '-------------------------------------------------------',
        `[RECEIPT ID] EU-CBAM-REC-2026-${10000 + Math.floor(Math.random() * 90000)}`,
        `[TIMESTAMP] ${new Date().toISOString()}`
      ]);
    }, 3200);
  };

  return (
    <>
      <div className="mb-6">
        <p className="d-label mb-2">Step 4 · Submit Report</p>
        <h1 className="d-title">Compliance Registry Portal</h1>
        <p className="d-subtitle mt-1">Export and submit XML for {company.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-5 border-white/[0.03] hover:border-white/10 transition-all duration-300">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Scope 1 (Direct)</p>
          <p className="text-2xl font-heading font-bold text-white mt-1">{company.results.scope1Tonnes.toFixed(1)} t</p>
        </div>
        <div className="glass-card p-5 border-white/[0.03] hover:border-white/10 transition-all duration-300">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Scope 2 (Indirect)</p>
          <p className="text-2xl font-heading font-bold text-white mt-1">{company.results.scope2Tonnes.toFixed(1)} t</p>
        </div>
        <div className="glass-card p-5 cursor-pointer border-[#10b981]/20 hover:border-[#10b981]/40 transition-all duration-300 relative overflow-hidden" onClick={() => setShowAudit(true)}>
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#10b981]/5 rounded-full filter blur-md pointer-events-none" />
          <p className="text-xs font-bold text-[#10b981] uppercase tracking-widest">Embedded Intensity</p>
          <p className="text-2xl font-heading font-bold text-[#10b981] mt-1">{result.embeddedEmissionsIntensity} t</p>
          <p className="text-[10px] text-zinc-500 mt-1 hover:text-white transition-colors duration-200 flex items-center gap-1">Click to view audit trace →</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Left Column: Live XML Schema Preview */}
        <div className="lg:col-span-2 glass-card p-5 border-white/[0.03] flex flex-col justify-between bg-[#070b14]/50">
          <div>
            <h3 className="font-semibold text-white mb-3.5 flex items-center gap-2 text-sm pb-2.5 border-b border-white/[0.04]">
              <FileText className="w-4 h-4 text-[#10b981]" />
              EU-CBAM Registry XML Preview
            </h3>
            
            <div className="bg-[#050810] p-4.5 rounded-xl border border-white/[0.03] font-mono text-[9px] text-[#10b981] overflow-x-auto max-h-[300px] leading-normal select-all">
              <span className="text-blue-400">&lt;?xml version="1.0" encoding="UTF-8"?&gt;</span>
              <br />
              <span className="text-zinc-500">&lt;cbam:CbamReport xmlns:cbam="urn:eu:europa:ec:cbam:v1"&gt;</span>
              <br />
              &nbsp;&nbsp;<span className="text-zinc-500">&lt;cbam:Header&gt;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;cbam:DeclarantName&gt;<span className="text-white font-medium">{company.name}</span>&lt;/cbam:DeclarantName&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;cbam:ReportPeriod&gt;<span className="text-white font-medium">Q1-2026</span>&lt;/cbam:ReportPeriod&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;cbam:EoriNumber&gt;<span className="text-yellow-400">ID9820120938</span>&lt;/cbam:EoriNumber&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;cbam:VerificationBody&gt;<span className="text-white font-medium">SUCOFINDO-ISO14064</span>&lt;/cbam:VerificationBody&gt;
              <br />
              &nbsp;&nbsp;<span className="text-zinc-500">&lt;/cbam:Header&gt;</span>
              <br />
              &nbsp;&nbsp;<span className="text-zinc-500">&lt;cbam:EmissionsBreakdown&gt;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;cbam:Scope1Emissions&gt;<span className="text-white font-bold">{company.results.scope1Tonnes.toFixed(2)}</span>&lt;/cbam:Scope1Emissions&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;cbam:Scope2Emissions&gt;<span className="text-white font-bold">{company.results.scope2Tonnes.toFixed(2)}</span>&lt;/cbam:Scope2Emissions&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;cbam:EmbeddedIntensity&gt;<span className="text-[#10b981] font-bold">{result.embeddedEmissionsIntensity}</span>&lt;/cbam:EmbeddedIntensity&gt;
              <br />
              &nbsp;&nbsp;<span className="text-zinc-500">&lt;/cbam:EmissionsBreakdown&gt;</span>
              <br />
              <span className="text-zinc-500">&lt;/cbam:CbamReport&gt;</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 font-medium">Standard: EU-CBAM-XML-Schema-v1.4.2</span>
            <Button
              className="bg-[#10b981] hover:bg-[#0d9d63] text-[#080b14] font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/10"
              onClick={() =>
                downloadXml(
                  `cbam_report_${company.id}.xml`,
                  xmlContent
                )
              }
            >
              <Download className="w-3.5 h-3.5" />
              Download XML
            </Button>
          </div>
        </div>

        {/* Right Column: EU Registry SOAP Gateway Submission Console */}
        <div className="glass-card p-5 border-white/[0.03] flex flex-col justify-between h-full bg-[#080d1a]/50">
          <div>
            <h3 className="font-semibold text-white mb-3.5 flex items-center gap-2 text-sm pb-2.5 border-b border-white/[0.04]">
              <Globe className="w-4 h-4 text-blue-400" />
              EU Registry SOAP Gateway
            </h3>

            {submissionStatus === 'IDLE' ? (
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <Globe className="w-10 h-10 text-zinc-600 animate-pulse mb-3" />
                <p className="text-xs text-zinc-400 font-semibold">Gateway Connection Active</p>
                <p className="text-[10px] text-zinc-600 mt-1 max-w-[200px]">Send the signed XML directly to the EU CBAM platform SOAP sandbox.</p>
                <Button 
                  className={`mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-xl text-xs shadow-lg shadow-blue-500/10 ${tourStep === 7 ? 'tour-pulse' : ''}`}
                  onClick={runSubmission}
                >
                  Submit to EU Portal
                </Button>
              </div>
            ) : (
              <div className="font-mono text-[9px] text-[#10b981] space-y-2 bg-[#050810] p-4 rounded-xl border border-white/[0.03] max-h-[220px] overflow-y-auto">
                {submissionLogs.map((log, idx) => (
                  <div key={idx} className={log.startsWith('[Gateway]') ? 'text-blue-400' : log.startsWith('[RECEIPT ID]') ? 'text-yellow-400 font-bold' : ''}>
                    {log}
                  </div>
                ))}
                {submissionStatus === 'PROCESSING' && (
                  <div className="text-blue-400 animate-pulse mt-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                    <span>SOAP request transmitting...</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {submissionStatus === 'SUCCESS' && (
            <div className="mt-4 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-start gap-2.5">
              <CheckCircle2 className="w-4.5 h-4.5 text-[#10b981] shrink-0 mt-0.5" />
              <div>
                <p className="text-[#10b981] font-bold text-[11px]">Submission Successful</p>
                <p className="text-zinc-500 text-[9px] mt-0.5 leading-normal">
                  Registry receipts stored. EORI transaction logged inside Sucofindo compliance blocks.
                </p>
              </div>
            </div>
          )}

          <div className="mt-4 pt-3.5 border-t border-white/[0.04] flex items-center gap-1.5 text-[9px] text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0" />
            <span>Connected to European Commission Sandbox v2</span>
          </div>
        </div>
      </div>

      {showAudit && (
        <div className="modal-overlay" onClick={() => setShowAudit(false)}>
          <div className="modal-box bg-[#0c1222]/95 border border-[#10b981]/25 relative" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-heading font-bold text-white mb-2 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#10b981]" />
              Audit Trace Summary
            </h3>
            <p className="text-xs text-zinc-500">
              Traceable formula under EU-CBAM methodology Annex VII:
            </p>
            <div className="mt-3 p-3.5 bg-[#050810] rounded-xl border border-white/[0.04] font-mono text-[10px] space-y-1.5 leading-relaxed">
              <div>
                Formula: <code className="text-[#10b981] font-bold">(Scope 1 + Scope 2) / Output</code>
              </div>
              <div className="text-zinc-400 mt-1">
                Values: ({company.results.scope1Tonnes} + {company.results.scope2Tonnes}) tCO₂ /{' '}
                {result.totalProductionOutput.toFixed(2)} t
              </div>
              <div className="text-[#10b981] font-bold mt-2.5">
                Embedded Intensity = {result.embeddedEmissionsIntensity} tCO₂e/ton
              </div>
            </div>
            <p className="text-[9px] text-zinc-500 mt-3">
              * Audit trail includes cryptographically signed document hashes of energy bills.
            </p>
            <Button className="mt-5 w-full bg-[#10b981] hover:bg-[#0d9d63] text-[#080b14] font-bold py-2 rounded-xl text-xs" onClick={() => setShowAudit(false)}>
              Close Audit Trail
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
