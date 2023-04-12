import * as React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel
} from "@tanstack/react-table";
import { StudentDetails } from "./StudentDetails";
import { createColumnHelper } from "@tanstack/react-table";


export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  ssn: string;
  dob: Date;
  bio: string;
};

const columnHelper = createColumnHelper<Student>()

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "ID"
  }),
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    header: "First Name"
  }),
  columnHelper.accessor("lastName", {
    cell: (info) => info.getValue(),
    header: "Last Name"
  }),
  columnHelper.accessor("ssn", {
    cell: (info) => info.getValue(),
    header: "SSN"
  }),
  columnHelper.accessor("dob", {
    cell: (info) => info.getValue().toLocaleDateString(),
    header: "Date of Birth",
  })
];

export type StudentTableProps = {
  students: Student[]
}

export function StudentsTable({
  students,
}: StudentTableProps) {
  const [openRow, setOpenRow] = React.useState("")

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  });

  const onRowClick = (rowId: string) => () => { setOpenRow(rowId) }


  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta: any = header.column.columnDef.meta;
              return (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  isNumeric={meta?.isNumeric}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <chakra.span pl="4">
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "desc" ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <>
            <Tr key={row.id} onClick={onRowClick(row.id)}>
              {row.getVisibleCells().map((cell) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = cell.column.columnDef.meta;
                return (
                  <Td key={cell.id} isNumeric={meta?.isNumeric}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
            {row.id === openRow &&
              <Tr key={row.id + "_details"}>
                <Td colSpan={columns.length}>
                  <StudentDetails bio={row.original.bio} />
                </Td>
              </Tr >}
          </>
        ))}
      </Tbody>
    </Table >
  );
}