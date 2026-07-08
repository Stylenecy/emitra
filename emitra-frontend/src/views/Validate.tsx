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
  const { getSelectedCompany } = useEmitra();
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
  };

  const pendingCount = items.filter((i) => i.status === 'PENDING' || i.status === 'FLAGGED').length;
  const verifiedCount = items.filter((i) => i.status === 'VERIFIED').length;
  const flaggedCount = items.filter((i) => i.status === 'FLAGGED').length;

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
        <p className="d-label mb-2">04 · Validation</p>
        <h1 className="d-title">AI Validation — HITL</h1>
        <p className="d-subtitle mt-1">{company.name}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-5">
          <p className="text-sm text-zinc-400">Fields Extracted</p>
          <p className="text-2xl font-heading font-semibold text-white mt-1">{items.length}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-sm text-zinc-400">Needs Review</p>
          <p className={`text-2xl font-heading font-semibold mt-1 ${pendingCount > 0 ? 'text-amberc' : 'text-emeraldc'}`}>{pendingCount}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-sm text-zinc-400">Verified</p>
          <p className="text-2xl font-heading font-semibold text-emeraldc mt-1">{verifiedCount}</p>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 min-w-0">
                {item.status === 'VERIFIED' ? (
                  <CheckCircle2 className="w-4 h-4 text-emeraldc shrink-0" />
                ) : item.status === 'FLAGGED' ? (
                  <AlertTriangle className="w-4 h-4 text-errorc shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amberc shrink-0" />
                )}
                <span className="text-white font-medium text-sm truncate">{item.fileName}</span>
              </div>
              {item.status === 'VERIFIED' ? (
                <Badge status="VERIFIED">Verified</Badge>
              ) : item.status === 'FLAGGED' ? (
                <Badge status="REJECTED">Low Confidence</Badge>
              ) : (
                <Badge status="PENDING">Pending</Badge>
              )}
            </div>

            {item.status === 'VERIFIED' && item.correctedValue !== null ? (
              <div className="flex items-center justify-between p-3 rounded-btn bg-white/[0.02] border border-white/[0.04]">
                <div>
                  <p className="text-sm text-zinc-400">{item.field}</p>
                  <p className="text-lg font-bold text-emeraldc mt-0.5">{item.correctedValue} {item.unit}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500">AI extracted: {item.extractedValue}</p>
                  <p className="text-xs text-zinc-500">Confidence: {(item.confidence * 100).toFixed(0)}%</p>
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
        <div className="mt-4 glass-card p-4" style={{ background: 'rgba(10, 135, 84, 0.05)', borderColor: 'rgba(10, 135, 84, 0.15)' }}>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emeraldc shrink-0" />
            <p className="text-emeraldc font-medium text-sm">All fields verified. Ready for calculation.</p>
          </div>
        </div>
      )}
    </>
  );
};
