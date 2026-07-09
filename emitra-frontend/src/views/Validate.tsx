import React, { useState } from 'react';
import { useEmitra } from '../context/EmitraContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { HitlSplitScreen } from '../components/HitlSplitScreen';
import { ShieldCheck, CheckCircle2, AlertTriangle, Factory } from 'lucide-react';

interface ValidationItem {
  id: string;
  fileName: string;
  field: string;
  extractedValue: number;
  correctedValue: number | null;
  confidence: number;
  unit: string;
  status: 'PENDING' | 'VERIFIED' | 'FLAGGED';
}

export const ValidateView: React.FC = () => {
  const { getSelectedCompany, tourStep, setTourStep } = useEmitra();
  const company = getSelectedCompany();
  const [items, setItems] = useState<ValidationItem[]>([
    { id: '1', fileName: 'SOLAR_INVOICE_JAN2026.pdf', field: 'Fuel Volume (Liters)', extractedValue: 14250, correctedValue: null, confidence: 0.84, unit: 'L', status: 'PENDING' },
    { id: '2', fileName: 'PLN_BILL_JAN2026.pdf', field: 'Energy Consumption (kWh)', extractedValue: 45000, correctedValue: null, confidence: 0.98, unit: 'kWh', status: 'VERIFIED' },
    { id: '3', fileName: 'PRODUCTION_LOG_MAR2026.xlsx', field: 'Production Output (tons)', extractedValue: 450, correctedValue: null, confidence: 0.67, unit: 't', status: 'FLAGGED' },
    { id: '4', fileName: 'SOLAR_INVOICE_JAN2026.pdf', field: 'Production Output (tons)', extractedValue: 450, correctedValue: null, confidence: 0.92, unit: 't', status: 'VERIFIED' },
  ]);

  const handleConfirm = (id: string, value: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, correctedValue: value, status: 'VERIFIED' as const } : item
      )
    );
    if (tourStep === 4) {
      setTourStep(5);
    }
  };

  const pendingCount = items.filter((i) => i.status === 'PENDING' || i.status === 'FLAGGED').length;
  const verifiedCount = items.filter((i) => i.status === 'VERIFIED').length;

  if (!company) {
    return (
      <div className="empty-state" style={{ paddingTop: '6rem' }}>
        <Factory />
        <p>Select a company first</p>
        <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Go to Dashboard and pick a client</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <p className="d-label mb-2">Step 2 · AI Validation</p>
        <h1 className="d-title">Human-In-The-Loop Audit</h1>
        <p className="d-subtitle mt-1">Review OCR fields for {company.name}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-5 border-white/[0.03] hover:border-white/10 transition-all duration-300">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
            Fields Extracted
          </p>
          <p className="text-3xl font-heading font-bold text-white mt-2">{items.length}</p>
        </div>
        <div className="glass-card p-5 border-white/[0.03] hover:border-white/10 transition-all duration-300">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <AlertTriangle className={`w-3.5 h-3.5 ${pendingCount > 0 ? 'text-amber-500 animate-pulse' : 'text-[#10b981]'}`} />
            Needs Audit Review
          </p>
          <p className={`text-3xl font-heading font-bold mt-2 ${pendingCount > 0 ? 'text-amber-500' : 'text-[#10b981]'}`} style={{ textShadow: pendingCount > 0 ? '0 0 12px rgba(245,158,11,0.2)' : '0 0 12px rgba(16,185,129,0.2)' }}>{pendingCount}</p>
        </div>
        <div className="glass-card p-5 border-white/[0.03] hover:border-white/10 transition-all duration-300">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
            Verified & Confirmed
          </p>
          <p className="text-3xl font-heading font-bold text-[#10b981] mt-2" style={{ textShadow: '0 0 12px rgba(16,185,129,0.2)' }}>{verifiedCount}</p>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="glass-card p-5 border-white/[0.03] bg-[#0c1222]/40 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
            
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.04]">
              <div className="flex items-center gap-2.5 min-w-0">
                {item.status === 'VERIFIED' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                ) : item.status === 'FLAGGED' ? (
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span className="text-white font-semibold text-xs truncate">{item.fileName}</span>
              </div>
              {item.status === 'VERIFIED' ? (
                <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                  Verified
                </span>
              ) : item.status === 'FLAGGED' ? (
                <span className="text-[9px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-bold uppercase tracking-wider animate-pulse">
                  Low Confidence
                </span>
              ) : (
                <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase tracking-wider">
                  Pending Audit
                </span>
              )}
            </div>

            {item.status === 'VERIFIED' && (item.correctedValue !== null || item.extractedValue !== null) ? (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#080d1a]/60 border border-white/[0.03] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#10b981]/5 rounded-full filter blur-lg pointer-events-none" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{item.field}</p>
                  <p className="text-xl font-bold text-[#10b981] mt-1.5" style={{ textShadow: '0 0 10px rgba(16,185,129,0.3)' }}>
                    {item.correctedValue !== null ? item.correctedValue.toLocaleString() : item.extractedValue.toLocaleString()} {item.unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-zinc-500 font-medium">Original OCR Match: {item.extractedValue.toLocaleString()}</p>
                  <p className="text-[10px] text-[#10b981] font-semibold mt-1">Accuracy Score: {(item.confidence * 100).toFixed(0)}%</p>
                </div>
              </div>
            ) : (
              <HitlSplitScreen
                documentImage={item.fileName}
                initialValue={item.extractedValue}
                fieldLabel={item.field}
                unit={item.unit}
                confidence={item.confidence}
                onConfirm={(value) => handleConfirm(item.id, value)}
              />
            )}
          </div>
        ))}
      </div>

      {pendingCount === 0 && items.length > 0 && (
        <div className="mt-5 glass-card p-4.5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#10b981]/10 rounded-full filter blur-md pointer-events-none" />
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0" />
            <div>
              <p className="text-[#10b981] font-bold text-sm">All Fields Auditor Verified</p>
              <p className="text-zinc-500 text-xs mt-0.5">The structural dataset is locked. Proceed to Step 3 for deterministic Scope 1 & 2 carbon calculations.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
