import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { Info, MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ButtonGroup } from "@/components/ui/button-group";
import { Spinner } from "@/components/ui/spinner";
import { getServiceCategories } from "@/server/service-categories";
import { ServiceFormModal } from "./components/service-form-modal";
import { useMemo, useState } from "react";
import { useLang } from "@/hooks/use-lang";
interface ServiceCategoryType {
  id: number;
  name: string;
  description: string;
}

export default function ServiceCategories() {
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const {
    data = [] as ServiceCategoryType[],
    isLoading,
    isError,
  } = useQuery<ServiceCategoryType[]>({
    queryKey: ["service-ctgs", lang],
    queryFn: getServiceCategories,
  });
  const columns = useMemo<ColumnDef<ServiceCategoryType>[]>(
    () => [
      {
        accessorKey: "id",
        header: t.service_categories.table_headers.id,
      },
      {
        accessorKey: `name.${lang}`,
        header: t.service_categories.table_headers.name,
      },
      {
        accessorKey: `description.${lang}`,
        header: t.service_categories.table_headers.description,
      },
      {
        id: "actions",
        header: t.service_categories.table_headers.action,
        enableHiding: false,
        cell: ({ row }) => {
          const order = row.original;
          return (
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {t.service_categories.dropdown.actions}
                  </DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <ButtonGroup orientation={"vertical"} className="w-full">
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => {
                          navigate(`/orders/order-list/${order.id}`);
                        }}
                      >
                        {t.service_categories.dropdown.info}
                        <DropdownMenuShortcut>
                          <Info className="text-blue-500" />
                        </DropdownMenuShortcut>
                      </Button>

                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => {
                          navigate(`/orders/update/${order.id}`);
                        }}
                      >
                        {t.service_categories.dropdown.edit}
                        <DropdownMenuShortcut>
                          <Pencil className="text-orange-500" />
                        </DropdownMenuShortcut>
                      </Button>
                    </ButtonGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [t, navigate],
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: isLoading || isError ? [] : data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });
  return (
    <div className="px-4 bg-white dark:bg-gray-900 min-h-screen text-blue-900 dark:text-gray-100 transition-colors duration-200">
      {/* HEADER */}
      <div className="flex items-center justify-between py-4">
        <span></span>
        {/* <Input
          placeholder="Filter orders..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("id")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        /> */}

        <div className="flex gap-2">
          {isLoading ? (
            <Button variant={"outline"}>
              {t.service_categories.uploading}
            </Button>
          ) : null}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((col) => col.getCanHide())
                .map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    checked={col.getIsVisible()}
                    onCheckedChange={(v) => col.toggleVisibility(!!v)}
                  >
                    {col.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu> */}
          <ServiceFormModal />
        </div>
      </div>
      {/* TABLE */}
      <div className="rounded-md border border-blue-200 dark:border-gray-700">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow
                key={hg.id}
                className="border-b border-blue-300 bg-blue-50 dark:border-gray-700 dark:bg-gray-800"
              >
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-blue-700 font-semibold dark:text-gray-300"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-6 text-center">
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-red-500">
                  {t.service_categories.table_body.error}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-blue-100 hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-gray-800 dark:text-gray-200"
                    >
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
                  colSpan={6}
                  className="text-center h-24 text-gray-400 dark:text-gray-500"
                >
                  {t.service_categories.table_body.no_results}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* PAGINATION */}
      <div className="flex justify-end gap-2 py-4">
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          // ✅ Light: ko'k chegarali; Dark: kulrang
          className="border-blue-400 text-blue-600 hover:bg-blue-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {t.service_categories.pagination.previous}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="border-blue-400 text-blue-600 hover:bg-blue-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {t.service_categories.pagination.next}
        </Button>
      </div>
    </div>
  );
}
