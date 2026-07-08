import React from 'react';
import { Button } from './ui/Button';

interface AuditTrailModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceDocument: string;
  invoiceNumber: string;
  extractedAt: string;
  value: number;
}

export const AuditTrailModal: React.FC<AuditTrailModalProps> = ({
  isOpen,
  onClose,
  sourceDocument,
  invoiceNumber,
  extractedAt,
  value,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-700 rounded-modal p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-white mb-4">Audit Trail</h3>
        <div className="space-y-2 text-sm">
          <p className="text-gray-400">Source: <span className="text-white">{sourceDocument}</span></p>
          <p className="text-gray-400">Invoice: <span className="text-white">{invoiceNumber}</span></p>
          <p className="text-gray-400">Extracted: <span className="text-white">{extractedAt}</span></p>
          <p className="text-gray-400">Value: <span className="text-emeraldc">{value}</span></p>
        </div>
        <Button className="mt-4 w-full" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};
