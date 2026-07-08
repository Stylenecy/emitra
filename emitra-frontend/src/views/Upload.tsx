import React, { useState } from 'react';
import { useEmitra } from '../context/EmitraContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DocumentUploader } from '../components/DocumentUploader';
import { Upload, FileText, AlertCircle, CheckCircle2, Clock, Factory } from 'lucide-react';

interface UploadedFile {
  name: string;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETE' | 'FAILED';
  confidence: number;
  size: string;
}

export const UploadView: React.FC = () => {
  const { getSelectedCompany } = useEmitra();
  const company = getSelectedCompany();
  const [files, setFiles] = useState<UploadedFile[]>([
    { name: 'PLN_BILL_JAN2026.pdf', status: 'COMPLETE', confidence: 0.98, size: '1.2 MB' },
    { name: 'SOLAR_INVOICE_JAN2026.pdf', status: 'COMPLETE', confidence: 0.84, size: '0.8 MB' },
    { name: 'PRODUCTION_LOG_MAR2026.xlsx', status: 'PROCESSING', confidence: 0.91, size: '2.4 MB' },
  ]);

  const handleUpload = (fileName: string) => {
    setFiles((prev) => [
      ...prev,
      { name: fileName, status: 'COMPLETE', confidence: 0.88 + Math.random() * 0.11, size: `${(0.5 + Math.random() * 2).toFixed(1)} MB` },
    ]);
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
        <p className="d-label mb-2">03 · Upload</p>
        <h1 className="d-title">Document Upload</h1>
        <p className="d-subtitle mt-1">{company.name}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-5">
          <p className="text-sm text-zinc-400 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            Total Documents
          </p>
          <p className="text-2xl font-heading font-semibold text-white mt-1">{files.length}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-sm text-zinc-400 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emeraldc" />
            Processed
          </p>
          <p className="text-2xl font-heading font-semibold text-emeraldc mt-1">{processedCount}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-sm text-zinc-400 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amberc" />
            Pending / Processing
          </p>
          <p className="text-2xl font-heading font-semibold text-amberc mt-1">{pendingCount}</p>
        </div>
      </div>

      <div className="glass-card p-6 mb-6">
        <h3 className="font-semibold text-white mb-2 flex items-center gap-2 text-sm">
          <Upload className="w-4 h-4 text-emeraldc" />
          Upload Factory Documents
        </h3>
        <p className="text-sm text-zinc-500 mb-5">
          Supported: PDF invoices, BBM logs, production reports, PLN bills
        </p>
        <DocumentUploader onUpload={handleUpload} />
      </div>

      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm">
          <FileText className="w-4 h-4 text-emeraldc" />
          Uploaded Documents
        </h3>

        {files.length === 0 ? (
          <p className="text-zinc-500 text-sm py-6 text-center">No documents uploaded yet</p>
        ) : (
          <div className="space-y-2">
            {files.map((file, i) => (
              <div key={i} className="file-row">
                <div className="flex items-center gap-3 min-w-0">
                  {file.status === 'COMPLETE' ? (
                    <CheckCircle2 className="w-4 h-4 text-emeraldc shrink-0" />
                  ) : file.status === 'FAILED' ? (
                    <AlertCircle className="w-4 h-4 text-errorc shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-amberc border-t-transparent animate-spin shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm text-white font-medium truncate">{file.name}</p>
                    <p className="text-xs text-zinc-500">{file.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-zinc-500">
                    {file.status === 'COMPLETE' ? `${(file.confidence * 100).toFixed(0)}%` : '-'}
                  </span>
                  {statusBadge(file.status)}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center justify-between">
          <p className="text-xs text-zinc-500">
            {processedCount} of {files.length} processed
          </p>
          <Button variant="secondary" onClick={() => setFiles([])}>
            Clear All
          </Button>
        </div>
      </div>
    </>
  );
};
