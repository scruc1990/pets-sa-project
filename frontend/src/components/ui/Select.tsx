import type { SelectHTMLAttributes } from 'react'

type SelectOption = {
  value: string | number
  label: string
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: SelectOption[]
  placeholder?: string
  error?: string
}

export function Select({
  label,
  options,
  placeholder,
  error,
  className = '',
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={selectId} className="text-sm font-semibold text-white">
        {label}
      </label>
      <select
        id={selectId}
        {...props}
        className={`w-full rounded-lg border bg-slate-700 px-4 py-3 text-white focus:ring-2 ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-slate-600 focus:border-purple-500 focus:ring-purple-500/20'
        } ${className}`}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={String(option.value)} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
    </div>
  )
}
