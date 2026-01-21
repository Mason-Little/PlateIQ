import { ButtonHTMLAttributes } from 'react';

interface PlateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: string;
}

export function PlateButton({
  text,
  icon,
  className = '',
  ...props
}: PlateButtonProps) {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${className}`}
      {...props}
    >
      {icon ? <img src={icon} alt={text} /> : text}
    </button>
  );
}
