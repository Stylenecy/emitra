import React, { useState } from 'react';
import { Button } from './ui/Button';
import { useEmitra } from '../context/EmitraContext';

interface HitlSplitScreenProps {
  documentImage: string;
  initialValue: number;
  fieldLabel: string;
  unit: string;
  confidence: number;
  onConfirm: (value: number) => void;
}

export const HitlSplitScreen: React.FC<HitlSplitScreenProps> = ({
  documentImage,
  initialValue,
  fieldLabel,
  unit,
  confidence,
  onConfirm,
}) => {
  const { tourStep } = useEmitra();
  const [value, setValue] = useState(initialValue);
  const needsReview = confidence < 0.9;

  // Determine which mock invoice layout to show
  const isPln = documentImage.toLowerCase().includes('pln');
  const isSolar = documentImage.toLowerCase().includes('solar');
  const isLog = documentImage.toLowerCase().includes('production');

  const renderMockDocument = () => {
    if (isPln) {
      return (
        <div className="w-full bg-[#0a0f1d] rounded-xl p-4 font-mono text-[10px] text-zinc-300 border border-[#10b981]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#10b981]/10 text-[#10b981] text-[8px] font-bold px-2 py-0.5 rounded-bl uppercase tracking-wider">
            Verified Source
          </div>
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
            <span className="font-bold text-white text-xs">PT PLN (PERSERO) INDONESIA</span>
          </div>
          <div className="space-y-1.5 text-zinc-400">
            <div>Klien Eksportir: <span className="text-white font-medium">CV Logam Mulia Sejahtera</span></div>
            <div>No. Pelanggan: <span className="text-zinc-200">5472-0911-0034</span></div>
            <div>Tarif / Industri: <span className="text-zinc-200">I-3 / TM (345,000 VA)</span></div>
            <div>Periode Rekening: <span className="text-zinc-200">JANUARI 2026</span></div>
            
            <div className="border-t border-white/[0.04] my-2 pt-2.5" />
            
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#10b981]/5 border border-[#10b981]/20 relative">
              <div className="absolute top-0 left-0 -mt-1.5 ml-2 bg-[#10b981] text-[#080b14] text-[7px] px-1 font-bold rounded uppercase">
                Extracted Field
              </div>
              <span className="text-[10px] text-zinc-400 mt-1">TOTAL KONSUMSI ENERGI (kWh):</span>
              <span className="text-xs font-bold text-[#10b981] mt-1 select-all">{initialValue.toLocaleString()} kWh</span>
            </div>
            
            <p className="text-[8px] text-zinc-500 italic mt-3">
              * OCR Engine: Tesseract OCR Engine V4 · Coordinates: [X:142, Y:288, W:64, H:18]
            </p>
          </div>
        </div>
      );
    }

    if (isSolar) {
      return (
        <div className="w-full bg-[#0a0f1d] rounded-xl p-4 font-mono text-[10px] text-zinc-300 border border-amber-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-400 text-[8px] font-bold px-2 py-0.5 rounded-bl uppercase tracking-wider">
            Review Needed
          </div>
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold text-white text-xs">PERTAMINA PATRA NIAGA</span>
          </div>
          <div className="space-y-1.5 text-zinc-400">
            <div>Lokasi Pengiriman: <span className="text-white font-medium">Foundry Ceper, Klaten</span></div>
            <div>Deskripsi Produk: <span className="text-zinc-200">HSD Solar B35 (Non-Subsidi)</span></div>
            <div>Surat Jalan No: <span className="text-zinc-200">SJ-880912-PPN</span></div>
            <div>Tanggal Invoice: <span className="text-zinc-200">14 Jan 2026</span></div>
            
            <div className="border-t border-white/[0.04] my-2 pt-2.5" />
            
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/30 relative">
              <div className="absolute top-0 left-0 -mt-1.5 ml-2 bg-amber-500 text-[#080b14] text-[7px] px-1 font-bold rounded uppercase">
                Low Confidence
              </div>
              <span className="text-[10px] text-zinc-400 mt-1">VOLUME DITERIMA (LITER):</span>
              <span className="text-xs font-bold text-amber-400 mt-1 select-all">{initialValue.toLocaleString()} L</span>
            </div>
            
            <p className="text-[8px] text-zinc-500 italic mt-3">
              * OCR Engine: Tesseract OCR Engine V4 · Coordinates: [X:312, Y:180, W:80, H:20]
            </p>
          </div>
        </div>
      );
    }

    if (isLog) {
      return (
        <div className="w-full bg-[#0a0f1d] rounded-xl p-4 font-mono text-[10px] text-zinc-300 border border-rose-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-rose-500/10 text-rose-400 text-[8px] font-bold px-2 py-0.5 rounded-bl uppercase tracking-wider">
            Critical Review
          </div>
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-bold text-white text-xs">WORKSHEET LOGISTIK PRODUKSI</span>
          </div>
          <div className="space-y-1.5 text-zinc-400">
            <div>Dapur Peleburan: <span className="text-white font-medium">Induction Furnace Lini 2</span></div>
            <div>Shift Pengisian: <span className="text-zinc-200">Shift 3 (Malam)</span></div>
            <div>Catatan Operator: <span className="text-zinc-200">Sugeng Raharjo</span></div>
            <div>Tanggal Input: <span className="text-zinc-200">18 Maret 2026</span></div>
            
            <div className="border-t border-white/[0.04] my-2 pt-2.5" />
            
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-rose-500/5 border border-rose-500/30 relative">
              <div className="absolute top-0 left-0 -mt-1.5 ml-2 bg-rose-500 text-white text-[7px] px-1 font-bold rounded uppercase">
                Low Confidence
              </div>
              <span className="text-[10px] text-zinc-400 mt-1">OUTPUT PRODUKSI (TON):</span>
              <span className="text-xs font-bold text-rose-400 mt-1 select-all">{initialValue.toLocaleString()} Tons</span>
            </div>
            
            <p className="text-[8px] text-zinc-500 italic mt-3">
              * OCR Engine: XLS Parser Service · Coordinates: [Cell: C18, Sheet: OutputLog]
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-zinc-900/50 border border-white/[0.04] rounded-xl p-6 flex flex-col items-center justify-center min-h-[180px] text-center">
        <span className="text-zinc-500 text-xs font-medium">Document Preview Image</span>
        <span className="text-zinc-600 text-[10px] mt-1">{documentImage}</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
      {/* Left side: simulated high-fidelity document */}
      <div className="flex flex-col justify-center">
        {renderMockDocument()}
      </div>

      {/* Right side: Human-in-the-Loop review actions */}
      <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-5 flex flex-col justify-between">
        <div>
          <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold block mb-1">
            Validate Data Field
          </label>
          <span className="text-xs font-semibold text-zinc-300 block mb-3">{fieldLabel}</span>
          
          <div className="relative">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#080d1a] border border-zinc-700 text-white focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/25 outline-none font-bold text-sm transition-colors duration-200"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-500">
              {unit}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs border-b border-white/[0.02] pb-3">
            <span className="text-zinc-500">AI Confidence:</span>
            <span className={`font-bold ${needsReview ? 'text-amber-400' : 'text-emerald-400'}`}>
              {(confidence * 100).toFixed(0)}%
            </span>
          </div>

          {needsReview && (
            <div className="mt-2.5 p-2.5 bg-amber-500/5 border border-amber-500/15 rounded-lg">
              <p className="text-[10px] text-amber-400 font-medium leading-relaxed">
                ⚠ Value confidence falls below 90%. Verify with physical invoice copies or production logs before clicking approve.
              </p>
            </div>
          )}
        </div>

        <Button 
          className={`mt-4 w-full bg-[#10b981] hover:bg-[#0d9d63] text-[#080b14] font-bold py-2.5 rounded-xl shadow-lg shadow-emerald-500/10 ${tourStep === 4 ? 'tour-pulse' : ''}`} 
          onClick={() => onConfirm(value)}
        >
          Confirm & Verify Field
        </Button>
      </div>
    </div>
  );
};
