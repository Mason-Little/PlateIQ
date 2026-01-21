import { ButtonHTMLAttributes } from 'react';

interface PlateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: string;
  variant?: 'primary' | 'ghost';
}

export function PlateButton({
  text,
  icon,
  variant = 'primary',
  className = '',
  ...props
}: PlateButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg))]';
  const variantClasses =
    variant === 'primary'
      ? 'bg-[rgb(var(--accent))] text-white shadow-sm hover:bg-[rgb(var(--accent-strong))]'
      : 'border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {icon ? <img src={icon} alt={text} className="h-4 w-4" /> : text}
    </button>
  );
}
