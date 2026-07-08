import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-light',
  secondary: 'border border-navy text-navy bg-white hover:bg-gray-50',
  ghost: 'text-navy hover:bg-gray-100',
  danger: 'bg-errorc text-white hover:opacity-90',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2.5 rounded-btn font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
