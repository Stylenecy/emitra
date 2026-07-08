import React, { useState } from 'react';
import { Button } from './ui/Button';

interface HitlSplitScreenProps {
  documentImage: string; // mock path
  initialValue: number;
  fieldLabel: string;
  unit: string;
  confidence: number;
  onConfirm: (value: number) => void;
}

export const HitlSplitScreen: React.FC<HitlSplitScreenProps> = ({
  initialValue,
  fieldLabel,
  unit,
  confidence,
  onConfirm,
}) => {
  const [value, setValue] = useState(initialValue);
  const needsReview = confidence < 0.9;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-zinc-800/50 rounded-card p-4 flex items-center justify-center min-h-[200px]">
        <span className="text-gray-500">[Mock Document Image — {needsReview ? 'Blurred' : 'Clear'}]</span>
      </div>
      <div className="bg-zinc-800/50 rounded-card p-4">
        <label className="text-sm text-gray-400 block mb-2">{fieldLabel}</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full px-3 py-2 rounded-input bg-zinc-900 border border-zinc-700 text-white focus:border-emeraldc outline-none"
        />
        <p className="text-xs mt-2">
          Confidence:{' '}
          <span className={needsReview ? 'text-amberc' : 'text-emeraldc'}>
            {(confidence * 100).toFixed(0)}%
          </span>
        </p>
        {needsReview && (
          <p className="text-xs text-amberc mt-1">⚠ Below 90% — manual review required</p>
        )}
        <Button className="mt-3" onClick={() => onConfirm(value)}>
          Confirm & Verify
        </Button>
      </div>
    </div>
  );
};
