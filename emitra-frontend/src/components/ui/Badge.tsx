import React from 'react';

type BadgeStatus = 'VERIFIED' | 'PENDING' | 'REJECTED' | 'OCR_COMPLETE' | 'PROCESSING';

const styles: Record<BadgeStatus, string> = {
  VERIFIED: 'bg-emeraldc/20 text-emeraldc',
  PENDING: 'bg-amberc/20 text-amberc',
  REJECTED: 'bg-errorc/20 text-errorc',
  OCR_COMPLETE: 'bg-slatec/20 text-slatec',
  PROCESSING: 'bg-blue-500/20 text-blue-400',
};

export const Badge: React.FC<{ status: BadgeStatus; children: React.ReactNode }> = ({
  status,
  children,
}) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status === 'VERIFIED' && '✓ '}
      {children}
    </span>
  );
};
