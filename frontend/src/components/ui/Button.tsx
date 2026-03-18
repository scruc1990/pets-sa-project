import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'danger' | 'success' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  leftIcon?: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-purple-500/20 hover:from-purple-700 hover:to-purple-800',
  danger:
    'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-500/20 hover:from-red-700 hover:to-red-800',
  success:
    'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md shadow-emerald-500/20 hover:from-emerald-700 hover:to-emerald-800',
  ghost:
    'border border-slate-600 text-slate-300 hover:bg-slate-700',
}

export function Button({
  variant = 'primary',
  className = '',
  leftIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${className}`}
    >
      {leftIcon ? <span>{leftIcon}</span> : null}
      {children}
    </button>
  )
}
