"use client"
import { Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
  } from "@/components/ui/table"

import { Button } from "./button"
import { Input } from "./input"
import { ChevronDown } from "lucide-react"
import * as React from "react"
import { DataTable } from "@/components/ui/data-table" 
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { ApolloClient, InMemoryCache, gql, useQuery, useMutation } from "@apollo/client"
import { ApolloServer } from "@apollo/server"

import { GetServerSideProps } from "next"
import { PrismaClient } from "@prisma/client"

const client = new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache(),
  })

interface User {
    id: bigint
    name: string | null
    email: string | null
    phone_number: string | null
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "phone_number",
    header: "Teléfono",
    cell: ({ row }) => row.original.phone_number ?? "N/A",
  },
]

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    phone_number: String
  }

  type Query {
    users: [User!]!
  }
`

const prisma = new PrismaClient()

export const resolvers = {
  Query: {
    users: async (): Promise<User[]> => {
      // 2. Haz la consulta
      const data = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone_number: true,
        },
      })
      return data
    },
  },
}

const { data, loading, error } = useQuery<{ users: User[] }>(typeDefs)

interface Props {
  users: User[]
}


// SSR
const getServerSideProps: GetServerSideProps = async () => {
  // Hacemos un POST a /api/graphql con la query
  const res = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          users {
            id
            name
            email
            phone_number
            rol
          }
        }
      `,
    }),
  })

  const { data } = await res.json()
  // data.users es el array de usuarios
  return {
    props: {
      users: data.users,
    },
  }
}

const userData: User[] = data?.users ?? []

export function UsersTable() {
  return (
    <DataTable columns={columns} data={userData} />
  )
  // const [sorting, setSorting] = React.useState<SortingState>([])
  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
  //     []
  // )
  // const [columnVisibility, setColumnVisibility] =
  //     React.useState<VisibilityState>({})
  // const [rowSelection, setRowSelection] = React.useState({})
  // const table = useReactTable({
  //     data: data?.users ?? [],
  //     columns,
  //     onSortingChange: setSorting,
  //     onColumnFiltersChange: setColumnFilters,
  //     getCoreRowModel: getCoreRowModel(),
  //     getPaginationRowModel: getPaginationRowModel(),
  //     getSortedRowModel: getSortedRowModel(),
  //     getFilteredRowModel: getFilteredRowModel(),
  //     onColumnVisibilityChange: setColumnVisibility,
  //     onRowSelectionChange: setRowSelection,
  //     state: {
  //       sorting,
  //       columnFilters,
  //       columnVisibility,
  //       rowSelection,
  //     },
  //   })
  //   return (
  //     <div className="w-full">
  //       <div className="flex items-center py-4">
  //         <Input
  //           placeholder="Filter emails..."
  //           value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
  //           onChange={(event) =>
  //             table.getColumn("email")?.setFilterValue(event.target.value)
  //           }
  //           className="max-w-sm"
  //         />
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="outline" className="ml-auto">
  //               Columns <ChevronDown />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             {table
  //               .getAllColumns()
  //               .filter((column) => column.getCanHide())
  //               .map((column) => {
  //                 return (
  //                   <DropdownMenuCheckboxItem
  //                     key={column.id}
  //                     className="capitalize"
  //                     checked={column.getIsVisible()}
  //                     onCheckedChange={(value) =>
  //                       column.toggleVisibility(!!value)
  //                     }
  //                   >
  //                     {column.id}
  //                   </DropdownMenuCheckboxItem>
  //                 )
  //               })}
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       </div>
  //       <div className="rounded-md border">
  //         <Table>
  //           <TableHeader>
  //             {table.getHeaderGroups().map((headerGroup) => (
  //               <TableRow key={headerGroup.id}>
  //                 {headerGroup.headers.map((header) => {
  //                   return (
  //                     <TableHead key={header.id}>
  //                       {header.isPlaceholder
  //                         ? null
  //                         : flexRender(
  //                             header.column.columnDef.header,
  //                             header.getContext()
  //                           )}
  //                     </TableHead>
  //                   )
  //                 })}
  //               </TableRow>
  //             ))}
  //           </TableHeader>
  //           <TableBody>
  //             {table.getRowModel().rows?.length ? (
  //               table.getRowModel().rows.map((row) => (
  //                 <TableRow
  //                   key={row.id}
  //                   data-state={row.getIsSelected() && "selected"}
  //                 >
  //                   {row.getVisibleCells().map((cell) => (
  //                     <TableCell key={cell.id}>
  //                       {flexRender(
  //                         cell.column.columnDef.cell,
  //                         cell.getContext()
  //                       )}
  //                     </TableCell>
  //                   ))}
  //                 </TableRow>
  //               ))
  //             ) : (
  //               <TableRow>
  //                 <TableCell
  //                   colSpan={columns.length}
  //                   className="h-24 text-center"
  //                 >
  //                   No results.
  //                 </TableCell>
  //               </TableRow>
  //             )}
  //           </TableBody>
  //         </Table>
  //       </div>
  //       <div className="flex items-center justify-end space-x-2 py-4">
  //         <div className="flex-1 text-sm text-muted-foreground">
  //           {table.getFilteredSelectedRowModel().rows.length} of{" "}
  //           {table.getFilteredRowModel().rows.length} row(s) selected.
  //         </div>
  //         <div className="space-x-2">
  //           <Button
  //             variant="outline"
  //             size="sm"
  //             onClick={() => table.previousPage()}
  //             disabled={!table.getCanPreviousPage()}
  //           >
  //             Previous
  //           </Button>
  //           <Button
  //             variant="outline"
  //             size="sm"
  //             onClick={() => table.nextPage()}
  //             disabled={!table.getCanNextPage()}
  //           >
  //             Next
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   )
}
