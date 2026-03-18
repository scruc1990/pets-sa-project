import type { ReactNode } from 'react'

type Column<T> = {
  key: keyof T | string
  header: string
  render?: (row: T) => ReactNode
}

type DataTableProps<T> = {
  data: T[]
  columns: Column<T>[]
  emptyMessage: string
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  emptyMessage,
}: DataTableProps<T>) {
  if (!data.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-500">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-slate-50">
              {columns.map((column) => (
                <td key={String(column.key)} className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
                  {column.render ? column.render(row) : `${row[column.key as keyof T] ?? ''}`}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
