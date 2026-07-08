import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-card p-6 shadow-xl transition-all duration-300 hover:border-emeraldc/30 ${className} ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}`}
    >
      {children}
    </div>
  );
};
