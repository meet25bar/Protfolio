import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui'

export function DataTable<T>({
  data,
  columns,
  emptyMessage = 'No records match the current filters.',
}: {
  data: T[]
  columns: ColumnDef<T>[]
  emptyMessage?: string
}) {
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 6 } },
  })

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border-b border-line px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                  {header.isPlaceholder ? null : (
                    <button
                      className="flex items-center gap-1"
                      onClick={header.column.getToggleSortingHandler()}
                      disabled={!header.column.getCanSort()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && <ChevronsUpDown size={13} aria-hidden="true" />}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-line last:border-0 hover:bg-brand-50/60">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3.5 align-middle text-slate-600">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {!table.getRowModel().rows.length && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-16 text-center text-sm text-muted">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-line bg-slate-50 px-4 py-3">
        <p className="text-xs text-muted">
          Showing {table.getRowModel().rows.length} of {data.length} records
        </p>
        <div className="flex items-center gap-2">
          <Button
            tone="ghost"
            className="h-8 w-8 px-0"
            aria-label="Previous page"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <ChevronLeft size={16} />
          </Button>
          <span className="rounded-md bg-brand-700 px-3 py-1.5 text-xs font-bold text-white">
            {table.getState().pagination.pageIndex + 1}
          </span>
          <Button
            tone="ghost"
            className="h-8 w-8 px-0"
            aria-label="Next page"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
