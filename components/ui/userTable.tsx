import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export type User = {
  id: string
  name?: string
  email: string
  phone_number?: string
  role: string
}

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      phone_number
      role
    }
  }
`

// Definición de columnas para la tabla
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'email',
    header: 'Correo',
  },
  {
    accessorKey: 'phone_number',
    header: 'Teléfono',
    cell: ({ cell }) =>
      cell.getValue() ? cell.getValue() : 'No',
  },
  {
    id: 'actions',
    header: 'Editar',
    cell: ({ row }) => (
      <Link href={`/update-user/${row.original.id}`}>
        <Button
          className="bg-transparent border-0 p-0 cursor-pointer w-16"
          variant="outline"
          size="sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="350" height="350" viewBox="0 0 120 120" version="1.1"><path d="M 101.800 42.200 C 104.133 44.533, 102.899 46.566, 93.301 56.200 C 87.967 61.554, 83.835 66.168, 84.119 66.452 C 84.495 66.829, 99.838 52.078, 104.870 46.503 C 105.854 45.414, 103.777 41, 102.281 41 C 100.974 41, 100.867 41.267, 101.800 42.200 M 49.139 84.033 C 47.841 85.115, 47.209 86, 47.734 86 C 48.260 86, 49.505 85.100, 50.500 84 C 52.787 81.473, 52.195 81.487, 49.139 84.033 M 43.737 88.966 C 42.979 90.047, 41.266 91.368, 39.930 91.902 C 38.215 92.588, 38.010 92.892, 39.234 92.937 C 40.188 92.971, 42.438 91.663, 44.234 90.029 C 46.030 88.395, 46.963 87.045, 46.307 87.029 C 45.650 87.013, 44.494 87.885, 43.737 88.966 M 26.500 90 C 26.840 90.550, 27.343 91, 27.618 91 C 27.893 91, 27.840 90.550, 27.500 90 C 27.160 89.450, 26.657 89, 26.382 89 C 26.107 89, 26.160 89.450, 26.500 90 M 19 92 C 19 92.733, 19.300 93.033, 19.667 92.667 C 20.033 92.300, 20.033 91.700, 19.667 91.333 C 19.300 90.967, 19 91.267, 19 92 M 28 93 C 28 93.733, 28.300 94.033, 28.667 93.667 C 29.033 93.300, 29.033 92.700, 28.667 92.333 C 28.300 91.967, 28 92.267, 28 93 M 32.500 94 C 31.239 94.542, 31.055 94.859, 32 94.859 C 32.825 94.859, 34.400 94.473, 35.500 94 C 36.761 93.458, 36.945 93.141, 36 93.141 C 35.175 93.141, 33.600 93.527, 32.500 94 M 27.333 95.667 C 27.700 96.033, 28.300 96.033, 28.667 95.667 C 29.033 95.300, 28.733 95, 28 95 C 27.267 95, 26.967 95.300, 27.333 95.667 M 24.333 96.667 C 24.700 97.033, 25.300 97.033, 25.667 96.667 C 26.033 96.300, 25.733 96, 25 96 C 24.267 96, 23.967 96.300, 24.333 96.667 M 20.813 97.683 C 21.534 97.972, 22.397 97.936, 22.729 97.604 C 23.061 97.272, 22.471 97.036, 21.417 97.079 C 20.252 97.127, 20.015 97.364, 20.813 97.683 M 15 104 C 15 104.646, 26.333 105, 47 105 C 67.667 105, 79 104.646, 79 104 C 79 103.354, 67.667 103, 47 103 C 26.333 103, 15 103.354, 15 104" stroke="none" fill="#26129e" fill-rule="evenodd"/><path d="M 72.555 25.127 C 66.091 31.636, 62.984 35.429, 63.854 35.745 C 64.610 36.019, 67.933 33.535, 71.380 30.119 L 77.552 24.002 84.776 31.274 C 88.749 35.274, 92 39.027, 92 39.613 C 92 40.199, 89.846 42.663, 87.212 45.089 C 71.656 59.422, 39.438 92.003, 40.382 92.449 C 40.997 92.739, 39.925 92.729, 38 92.428 C 35.240 91.995, 34.817 92.120, 36 93.020 C 37.190 93.926, 36.881 94.036, 34.500 93.551 C 32.289 93.100, 31.895 93.206, 33 93.954 C 34.292 94.829, 34.261 94.971, 32.776 94.985 C 31.827 94.993, 30.377 93.697, 29.554 92.104 C 28.730 90.511, 26.858 88.335, 25.393 87.268 L 22.730 85.328 24.367 80.401 C 25.755 76.222, 28.509 72.972, 42.502 58.998 C 51.576 49.937, 59 42.180, 59 41.761 C 59 39.653, 55.826 42.343, 40.138 57.750 L 23.082 74.500 20.865 82.500 C 19.645 86.900, 18.614 92.300, 18.574 94.500 C 18.503 98.321, 18.634 98.494, 21.500 98.373 C 23.150 98.304, 28.325 97.216, 33 95.957 C 40.903 93.828, 41.973 93.212, 48.223 87.195 C 51.921 83.636, 54.700 80.324, 54.399 79.837 C 54.098 79.349, 54.447 79.074, 55.176 79.225 C 55.909 79.377, 56.351 78.830, 56.167 78 C 55.983 77.175, 56.167 76.834, 56.575 77.241 C 57.645 78.311, 60.101 75.988, 59.329 74.637 C 58.972 74.012, 59.068 73.854, 59.544 74.287 C 60.019 74.720, 69.766 65.724, 81.204 54.296 C 96.597 38.916, 102 32.901, 102 31.143 C 102 27.692, 88.835 15, 85.255 15 C 83.231 15, 80.250 17.376, 72.555 25.127 M 81.702 19.789 L 79.031 22.577 86.863 30.364 L 94.696 38.150 97.344 35.003 C 99.285 32.697, 99.752 31.405, 99.091 30.170 C 97.904 27.953, 86.403 17, 85.261 17 C 84.773 17, 83.172 18.255, 81.702 19.789 M 55.740 51.760 C 39.270 68.247, 35.219 73, 37.638 73 C 37.989 73, 46.764 64.578, 57.138 54.284 C 73.897 37.656, 77.856 33, 75.240 33 C 74.822 33, 66.047 41.442, 55.740 51.760 M 101.333 40.667 C 101.700 41.033, 102.300 41.033, 102.667 40.667 C 103.033 40.300, 102.733 40, 102 40 C 101.267 40, 100.967 40.300, 101.333 40.667 M 62.164 60.231 C 51.530 70.798, 43.370 79.623, 44.032 79.844 C 45.198 80.233, 83 43.288, 83 41.760 C 83 41.342, 82.662 41.004, 82.250 41.010 C 81.838 41.015, 72.799 49.665, 62.164 60.231 M 101.500 43 C 101.840 43.550, 102.343 44, 102.618 44 C 102.893 44, 102.840 43.550, 102.500 43 C 102.160 42.450, 101.657 42, 101.382 42 C 101.107 42, 101.160 42.450, 101.500 43 M 105 45 C 105 45.733, 105.300 46.033, 105.667 45.667 C 106.033 45.300, 106.033 44.700, 105.667 44.333 C 105.300 43.967, 105 44.267, 105 45 M 98.966 52.750 L 93.500 58.500 99.250 53.034 C 104.592 47.956, 105.458 47, 104.716 47 C 104.560 47, 101.972 49.587, 98.966 52.750 M 88.453 63.250 L 84.500 67.500 88.750 63.547 C 92.702 59.871, 93.460 59, 92.703 59 C 92.540 59, 90.627 60.913, 88.453 63.250 M 84.405 64.155 C 83.962 64.870, 84.130 65.038, 84.845 64.595 C 85.480 64.203, 86 63.684, 86 63.441 C 86 62.607, 85.117 63.002, 84.405 64.155 M 49.139 84.033 C 47.841 85.115, 47.209 86, 47.734 86 C 48.260 86, 49.505 85.100, 50.500 84 C 52.787 81.473, 52.195 81.487, 49.139 84.033 M 43.187 89.500 C 41.991 90.875, 41.382 92, 41.832 92 C 42.283 92, 43.708 90.875, 45 89.500 C 46.292 88.125, 46.901 87, 46.355 87 C 45.808 87, 44.382 88.125, 43.187 89.500 M 21.093 92.162 C 19.823 95.808, 19.670 95.519, 23.334 96.399 C 25.344 96.882, 25.961 96.747, 25.459 95.933 C 24.968 95.140, 25.482 94.970, 27.125 95.384 C 28.431 95.712, 28.938 95.723, 28.250 95.407 C 27.563 95.092, 27 94.266, 27 93.572 C 27 92.340, 23.909 89, 22.769 89 C 22.454 89, 21.700 90.423, 21.093 92.162 M 26.500 90 C 26.840 90.550, 27.343 91, 27.618 91 C 27.893 91, 27.840 90.550, 27.500 90 C 27.160 89.450, 26.657 89, 26.382 89 C 26.107 89, 26.160 89.450, 26.500 90 M 19 92 C 19 92.733, 19.300 93.033, 19.667 92.667 C 20.033 92.300, 20.033 91.700, 19.667 91.333 C 19.300 90.967, 19 91.267, 19 92 M 28 93 C 28 93.733, 28.300 94.033, 28.667 93.667 C 29.033 93.300, 29.033 92.700, 28.667 92.333 C 28.300 91.967, 28 92.267, 28 93 M 20.813 97.683 C 21.534 97.972, 22.397 97.936, 22.729 97.604 C 23.061 97.272, 22.471 97.036, 21.417 97.079 C 20.252 97.127, 20.015 97.364, 20.813 97.683 M 14.467 103.053 C 14.100 103.647, 14.070 104.403, 14.400 104.733 C 14.730 105.063, 15 104.808, 15 104.167 C 15 102.622, 78.576 102.482, 79.342 104.025 C 79.621 104.589, 79.734 104.476, 79.592 103.775 C 79.249 102.079, 15.506 101.372, 14.467 103.053" stroke="none" fill="#9a2cbf" fill-rule="evenodd"/></svg>
        </Button>
      </Link>
    ),
  },
]

export function UserTable() {

  if (status === "loading") {
    return <p>Cargando...</p>;
  }
  // Hacemos fetch de los datos con Apollo Client
  const { data, loading, error } = useQuery(GET_USERS)

  // Estado para el filtro de la columna "name"
  const [nameFilter, setNameFilter] = useState<string>('')

  // Estado para la paginación: página actual y tamaño de página
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })

  // Configuración de la tabla
  const table = useReactTable({
    data: data ? data.users : [],
    columns,
    state: {
      // Filtro para la columna "name"
      columnFilters: [{ id: 'name', value: nameFilter }],
      pagination,
    },
    onColumnFiltersChange: (updater) => {
      const filters =
        typeof updater === 'function' ? updater([]) : updater
      const filter = filters.find((f) => f.id === 'name')
      setNameFilter((filter?.value as string) || '')
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false, // Paginación del lado del cliente
  })

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      {/* Input para filtrar por nombre */}
      <Input
        value={nameFilter}
        onChange={(e) => {
          setNameFilter(e.target.value)
          table.setColumnFilters([{ id: 'name', value: e.target.value }])
        }}
        placeholder="Filtrar por nombre..."
        className="mb-4"
      />

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Controles de paginación */}
      <div className="mt-4 flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
        <span>
          Página <strong>{table.getState().pagination.pageIndex + 1}</strong> de{' '}
          <strong>{table.getPageCount()}</strong>
        </span>
      </div>
    </div>
  )
}
