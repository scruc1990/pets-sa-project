import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-sm font-semibold text-white">
        {label}
      </label>
      <input
        id={inputId}
        {...props}
        className={`w-full rounded-lg border bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:ring-2 ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-slate-600 focus:border-purple-500 focus:ring-purple-500/20'
        } ${className}`}
      />
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
    </div>
  )
}
