import React, { useState, useEffect } from 'react';
import { useEmitra } from '../context/EmitraContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DocumentUploader } from '../components/DocumentUploader';
import { Upload, FileText, AlertCircle, CheckCircle2, Clock, Factory, Terminal } from 'lucide-react';

interface UploadedFile {
  name: string;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETE' | 'FAILED';
  confidence: number;
  size: string;
}

export const UploadView: React.FC = () => {
  const { getSelectedCompany, tourStep, setTourStep } = useEmitra();
  const company = getSelectedCompany();
  const [files, setFiles] = useState<UploadedFile[]>([
    { name: 'PLN_BILL_JAN2026.pdf', status: 'COMPLETE', confidence: 0.98, size: '1.2 MB' },
    { name: 'SOLAR_INVOICE_JAN2026.pdf', status: 'COMPLETE', confidence: 0.84, size: '0.8 MB' },
    { name: 'PRODUCTION_LOG_MAR2026.xlsx', status: 'PROCESSING', confidence: 0.91, size: '2.4 MB' },
  ]);

  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[AI Engine v2.4] Ready to ingest CBAM compliance documents...',
    '[Ingestor] Waiting for file drop event...',
    `[Database] Loaded compliance profile for ${company?.name || 'Client'}`
  ]);

  // Handle files that are initially in 'PROCESSING'
  useEffect(() => {
    const processingFile = files.find(f => f.status === 'PROCESSING');
    if (processingFile) {
      const timer = setTimeout(() => {
        setFiles(prev => prev.map(f => f.name === processingFile.name ? { ...f, status: 'COMPLETE' } : f));
        setConsoleLogs(prev => [
          ...prev,
          `[AI Engine] Completed structural scan for ${processingFile.name}`,
          `[AI Engine] Classified Scope 1 production metric. Confidence: ${(processingFile.confidence * 100).toFixed(0)}%`,
          `[Queue] Added ${processingFile.name} to HITL validation table.`
        ]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [files]);

  const handleUpload = (fileName: string) => {
    const newFile: UploadedFile = {
      name: fileName,
      status: 'PROCESSING',
      confidence: 0.82 + Math.random() * 0.16,
      size: `${(0.5 + Math.random() * 2).toFixed(1)} MB`
    };

    setFiles((prev) => [...prev, newFile]);
    setConsoleLogs((prev) => [
      ...prev,
      `[SYSTEM] Received file payload: ${fileName} (${newFile.size})`,
      `[AI Engine] Splitting documents and identifying headers...`,
      `[OCR] Extracted text tables, deskewing pixel matrices...`
    ]);

    if (tourStep === 2) {
      setTourStep(3);
    }

    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.name === fileName ? { ...f, status: 'COMPLETE' } : f
        )
      );
      setConsoleLogs((prev) => [
        ...prev,
        `[AI Engine] Finished document processing: ${fileName}`,
        `[AI Engine] Confidence: ${(newFile.confidence * 100).toFixed(0)}%`,
        `[Queue] Document validated. Flow unlocked: Step 2.`
      ]);
    }, 2500);
  };

  const statusBadge = (status: UploadedFile['status']) => {
    switch (status) {
      case 'QUEUED': return <Badge status="PENDING">Queued</Badge>;
      case 'PROCESSING': return <Badge status="PROCESSING">AI Processing</Badge>;
      case 'COMPLETE': return <Badge status="VERIFIED">Complete</Badge>;
      case 'FAILED': return <Badge status="REJECTED">Failed</Badge>;
    }
  };

  if (!company) {
    return (
      <div className="empty-state" style={{ paddingTop: '6rem' }}>
        <Factory />
        <p>Select a company first</p>
        <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Go to Dashboard and pick a client</p>
      </div>
    );
  }

  const processedCount = files.filter((f) => f.status === 'COMPLETE').length;
  const pendingCount = files.length - processedCount;

  return (
    <>
      <div className="mb-6">
        <p className="d-label mb-2">Step 1 · Document Ingestion</p>
        <h1 className="d-title">Upload Factory Documents</h1>
        <p className="d-subtitle mt-1">Ingest invoices and logs for {company.name}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-5 border-white/[0.03] hover:border-white/10 transition-all duration-300">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-[#10b981]" />
            Total Ingested
          </p>
          <p className="text-3xl font-heading font-bold text-white mt-2" style={{ textShadow: '0 0 12px rgba(255,255,255,0.1)' }}>{files.length}</p>
        </div>
        <div className="glass-card p-5 border-white/[0.03] hover:border-white/10 transition-all duration-300">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
            Successfully Parsed
          </p>
          <p className="text-3xl font-heading font-bold text-[#10b981] mt-2" style={{ textShadow: '0 0 12px rgba(16,185,129,0.2)' }}>{processedCount}</p>
        </div>
        <div className="glass-card p-5 border-white/[0.03] hover:border-white/10 transition-all duration-300">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            AI Parsing Queue
          </p>
          <p className="text-3xl font-heading font-bold text-amber-500 mt-2" style={{ textShadow: '0 0 12px rgba(245,158,11,0.2)' }}>{pendingCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Left Column: Drag & Drop Ingester */}
        <div className="lg:col-span-2 space-y-5">
          <div className="glass-card p-6 border-white/[0.03]">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2 text-sm">
              <Upload className="w-4 h-4 text-[#10b981]" />
              Document Upload Zone
            </h3>
            <p className="text-xs text-zinc-500 mb-5">
              Supported files: PDF invoices (Solar, Coal), PLN bills, factory production logs (XLSX, CSV)
            </p>
            <div className={tourStep === 2 ? 'tour-pulse rounded-xl' : ''}>
              <DocumentUploader onUpload={handleUpload} />
            </div>
          </div>

          <div className="glass-card p-6 border-white/[0.03]">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-[#10b981]" />
              Ingested Documents Queue
            </h3>

            {files.length === 0 ? (
              <p className="text-zinc-500 text-sm py-6 text-center">No documents uploaded yet</p>
            ) : (
              <div className="space-y-2">
                {files.map((file, i) => (
                  <div key={i} className="file-row bg-white/[0.01] hover:bg-white/[0.03] border border-white/[0.03] rounded-xl p-3.5 transition-all duration-300">
                    <div className="flex items-center gap-3 min-w-0">
                      {file.status === 'COMPLETE' ? (
                        <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                      ) : file.status === 'FAILED' ? (
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="text-xs text-white font-semibold truncate">{file.name}</p>
                        <p className="text-[10px] text-zinc-500 font-medium mt-0.5">{file.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-xs font-mono font-semibold text-zinc-500">
                        {file.status === 'COMPLETE' ? `${(file.confidence * 100).toFixed(0)}% Match` : 'Parsing...'}
                      </span>
                      {statusBadge(file.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center justify-between">
              <p className="text-xs text-zinc-500 font-medium">
                {processedCount} of {files.length} documents processed
              </p>
              <Button variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => setFiles([])}>
                Clear Queue
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Extraction Console Log (Lebay-in Mockup) */}
        <div className="glass-card p-5 border-white/[0.03] flex flex-col h-full bg-[#070b14]/50">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3 mb-3">
            <Terminal className="w-4 h-4 text-[#10b981]" />
            <h3 className="font-semibold text-white text-xs uppercase tracking-wider">AI Parser Terminal</h3>
          </div>
          
          <div className="flex-1 font-mono text-[9px] text-[#10b981] space-y-2 overflow-y-auto max-h-[360px] bg-[#050810] p-4.5 rounded-xl border border-white/[0.03] scrollbar-thin">
            {consoleLogs.map((log, i) => (
              <div key={i} className={`${log.startsWith('[SYSTEM]') ? 'text-blue-400' : log.startsWith('[Queue]') ? 'text-yellow-400' : ''} leading-normal`}>
                {log}
              </div>
            ))}
            {pendingCount > 0 && (
              <div className="text-amber-500 animate-pulse mt-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                <span>Executing multi-model OCR analysis on raw bytes...</span>
              </div>
            )}
          </div>
          
          <div className="mt-3.5 p-3 rounded-xl bg-white/[0.01] border border-white/[0.03]">
            <p className="text-[10px] text-zinc-400 leading-normal font-medium">
              OCR uses local deterministic bounding mapping aligned to EU-CBAM Annex II guidelines. Output is 100% trace-ready.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
