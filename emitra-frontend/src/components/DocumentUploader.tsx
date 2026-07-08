import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export const DocumentUploader: React.FC<{ onUpload: (fileName: string) => void }> = ({ onUpload }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateUpload = () => {
    setIsProcessing(true);
    setProgress(0);
    const fileName = `INVOICE_SOLAR_${Math.floor(Math.random() * 1000)}.pdf`;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          onUpload(fileName);
          return 100;
        }
        return p + 10;
      });
    }, 250);
  };

  return (
    <div className="border-2 border-dashed border-zinc-700 rounded-card p-8 text-center">
      {isProcessing ? (
        <div>
          <p className="text-emeraldc font-medium">AI OCR Processing... {progress}%</p>
          <div className="w-full bg-zinc-800 rounded-full h-2 mt-3">
            <div className="bg-emeraldc h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-gray-400 mb-4">Drag & drop invoices, BBM logs, or production reports</p>
          <Button onClick={simulateUpload}>Upload Documents</Button>
        </div>
      )}
    </div>
  );
};
