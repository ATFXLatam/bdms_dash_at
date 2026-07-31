import { useMemo, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table/column-header'
import { DataTablePagination } from '@/components/data-table/pagination'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  BDM_PERFORMANCE,
  type BdmPerformanceEntry,
} from '@/features/atfx/components/bdm-performance-data'
import { formatters } from '@/lib/planner/formatters'

const MONTH_ORDER: Record<string, number> = { Jul: 0, Jun: 1 }

export function BdmPerformanceTable() {
  const rows = useMemo(
    () =>
      [...BDM_PERFORMANCE].sort((a, b) => {
        const monthDiff =
          (MONTH_ORDER[a.month] ?? 99) - (MONTH_ORDER[b.month] ?? 99)
        if (monthDiff !== 0) return monthDiff
        return b.netDeposit - a.netDeposit
      }),
    [],
  )
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'netDeposit', desc: true },
  ])
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<BdmPerformanceEntry>[]>(
    () => [
      {
        accessorKey: 'month',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Month' />
        ),
      },
      {
        accessorKey: 'bdm',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='BDM' />
        ),
        cell: ({ row }) => (
          <span className='inline-flex items-center gap-2 font-medium'>
            {row.original.bdm}
            {row.original.status === 'Inactive' ? (
              <span className='rounded bg-muted px-1.5 py-0.5 text-[0.625rem] font-medium uppercase leading-none text-muted-foreground'>
                Inactive
              </span>
            ) : null}
          </span>
        ),
      },
      {
        accessorKey: 'country',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Country' />
        ),
        cell: ({ row }) => (
          <span className='text-muted-foreground'>{row.original.country}</span>
        ),
      },
      {
        accessorKey: 'teamOffice',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Team Office' />
        ),
        cell: ({ row }) => (
          <span className='text-muted-foreground'>
            {row.original.teamOffice}
          </span>
        ),
      },
      {
        accessorKey: 'netDeposit',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Net Deposit' />
        ),
        cell: ({ row }) => (
          <span className='tabular-nums'>
            {formatters.currency({ number: row.original.netDeposit })}
          </span>
        ),
      },
      {
        accessorKey: 'mibs',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='MIB' />
        ),
        cell: ({ row }) => (
          <span className='tabular-nums'>{row.original.mibs}</span>
        ),
      },
      {
        accessorKey: 'activeIbs',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Active IB's" />
        ),
        cell: ({ row }) => (
          <span className='tabular-nums'>{row.original.activeIbs}</span>
        ),
      },
      {
        accessorKey: 'lots',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Lots' />
        ),
        cell: ({ row }) => (
          <span className='tabular-nums'>
            {formatters.unit(row.original.lots)}
          </span>
        ),
      },
      {
        accessorKey: 'previousRank',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Prev Rank' />
        ),
        cell: ({ row }) => (
          <span className='tabular-nums text-muted-foreground'>
            #{row.original.previousRank}
          </span>
        ),
      },
      {
        accessorKey: 'ibActivationRate',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='IB Act. Rate' />
        ),
        cell: ({ row }) => (
          <span className='tabular-nums text-muted-foreground'>
            {formatters.percentage({
              number: row.original.ibActivationRate,
              decimals: 0,
            })}
          </span>
        ),
      },
    ],
    [],
  )

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 15 } },
  })

  return (
    <div className='space-y-4'>
      <Input
        placeholder='Search BDM, country, team…'
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className='max-w-xs'
      />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      <p className='text-xs text-muted-foreground'>
        Jun + Jul · from Datos_BDM_Extraidos · sortable performance snapshot
      </p>
    </div>
  )
}
