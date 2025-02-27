import { useQuery, gql } from "@apollo/client";
import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  filterFns,
} from "@tanstack/react-table";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";

// Consulta GraphQL para traer transacciones con datos del usuario
const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      amount
      description
      date
      user {
        id
        name
        email
        phone_number
      }
    }
  }
`;

// Tipos de datos para TypeScript
type UserType = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
};

type Transaction = {
  id: string;
  amount: number;
  description: string;
  date: string;
  user: UserType;
};

export function TransactionsTable() {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  // Estado para el usuario seleccionado (AlertDialog)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  // Estado para filtros de columna (filtrar por nombre de usuario)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Creamos un input controlado para filtrar por nombre de usuario
  const userNameFilter =
    columnFilters.find((f) => f.id === "userName")?.value || "";

  // Definimos las columnas de la tabla
  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: "description",
        header: "Concepto",
      },
      {
        accessorKey: "amount",
        header: "Monto",
      },
      {
        accessorKey: "date",
        header: "Fecha",
        cell: ({ getValue }) => {
          const dateStr = getValue() as string;
          return new Date(dateStr).toLocaleDateString();
        },
      },
      {
        // Usamos accessorFn para que la tabla vea este campo como string (el nombre)
        accessorFn: (row) => row.user.name,
        id: "userName",
        header: "Usuario",
        cell: ({ row }) => {
          // row.original es el Transaction completo
          const user = row.original.user;
          return (
            <Button variant="default" onClick={() => setSelectedUser(user)}>
              {user.name}
            </Button>
          );
        },
        // Indicamos el tipo de filtro
        filterFn: "includesString",
      },
    ],
    []
  );

  // Configuramos la tabla con React Table
  const table = useReactTable<Transaction>({
    data: data?.transactions || [],
    columns,
    // Estado de paginación y filtros
    initialState: {
      pagination: {
        pageSize: 5, // Tamaño de página inicial
      },
    },
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      ...filterFns, // Para usar 'includesString', 'fuzzy', etc.
    },
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Card>
      <CardContent>
        {/* FILTRO POR NOMBRE DE USUARIO */}
        <div className="mb-4">
          <input
            type="text"
            className="border px-2 py-1"
            placeholder="Escribe un nombre..."
            value={userNameFilter as string}
            onChange={(e) =>
              setColumnFilters((prev) => [
                { id: "userName", value: e.target.value },
                ...prev.filter((f) => f.id !== "userName"),
              ])
            }
          />
        </div>

        {/* TABLA */}
        <Table>
          <TableCaption className="text-sm text-muted-foreground">
            Lista de transacciones
          </TableCaption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No hay transacciones
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* PAGINACIÓN */}
        <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          {/* Controles para cambiar de página */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </Button>
            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </Button>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </Button>
            <Button
              variant="outline"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </Button>
          </div>

          {/* Info de la página */}
          <div className="flex items-center gap-2">
            <span>
              Página{" "}
              <strong>
                {table.getState().pagination.pageIndex + 1} de{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <span>| Ir a la página:</span>
            <input
              type="number"
              className="w-16 border px-2 py-1"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
          </div>

          {/* Selección del tamaño de página */}
          <div className="flex items-center gap-2">
            <span>Mostrar</span>
            <select
              className="border px-2 py-1"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20, 30, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span>por página</span>
          </div>
        </div>

        {/* ALERT DIALOG PARA MOSTRAR INFO DEL USUARIO */}
        {selectedUser && (
          <AlertDialog
            open
            onOpenChange={(open) => {
              if (!open) setSelectedUser(null);
            }}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Información del Usuario</AlertDialogTitle>
                <AlertDialogDescription>
                  <p>Nombre: {selectedUser.name}</p>
                  <p>Email: {selectedUser.email}</p>
                  <p>Teléfono: {selectedUser.phone_number}</p>
                </AlertDialogDescription>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardContent>
    </Card>
  );
}
