import type { ReactNode } from 'react'

type DataColumn<T> = {
  key: keyof T | string
  header: string
  render?: (row: T) => ReactNode
  className?: string
}

type DataTableProps<T> = {
  data: T[]
  columns: DataColumn<T>[]
  emptyMessage: string
  rowKey: (row: T, index: number) => string
}

export function DataTable<T>({ data, columns, emptyMessage, rowKey }: DataTableProps<T>) {
  if (!data.length) {
    return <p className="text-center text-sm text-slate-400">{emptyMessage}</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-white">
        <thead className="border-b border-slate-700 bg-slate-900/50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`px-4 py-2 text-left font-semibold text-slate-300 ${column.className ?? ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {data.map((row, index) => (
            <tr key={rowKey(row, index)} className="transition-colors hover:bg-slate-700/30">
              {columns.map((column) => (
                <td key={String(column.key)} className="px-4 py-2 text-slate-300">
                  {column.render
                    ? column.render(row)
                    : String((row as Record<string, unknown>)[String(column.key)] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
