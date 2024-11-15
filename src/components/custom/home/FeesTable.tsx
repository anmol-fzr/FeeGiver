import { useState } from "react";
import {
  CheckCircledIcon,
  Cross2Icon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  TableFacetedFilter,
  Button,
  Link,
  LoadingColumnRows,
} from "@/components/";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { TableColHeader } from "@/components";
import { formatCurrency, formatOrdinals } from "@/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services";
import { Fee } from "@/type/res";
import { TableColCreatedAt } from "../table/TableCells";
import { useNavigate } from "react-router-dom";
import { EyeIcon } from "lucide-react";

type Status = Fee["status"];

const colorXStatus: Record<Status, string> = {
  pending:
    "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-700",
  accepted:
    "bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700",
  rejected: "bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700",
};

const statuses = [
  {
    value: "pending",
    label: "Pending",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "accepted",
    label: "Accepted",
    icon: CheckCircledIcon,
  },
  {
    value: "rejected",
    label: "Rejected",
    icon: CrossCircledIcon,
  },
];

const columns: ColumnDef<Fee>[] = [
  {
    accessorKey: "sem",
    header: ({ column }) => <TableColHeader column={column} title="Semester" />,
    cell: ({ row }) => <p>{formatOrdinals(row.getValue("sem"))}</p>,
  },
  {
    accessorKey: "sbCollRef",
    header: ({ column }) => (
      <TableColHeader column={column} title="SB Collect Ref Number" />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <TableColHeader column={column} title="Amount" />,
    cell: ({ row }) => <p>{formatCurrency(row.getValue("amount"))}</p>,
  },
  {
    accessorKey: "feeType",
    header: ({ column }) => <TableColHeader column={column} title="Fee Type" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <TableColHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge className={colorXStatus[status]}>{status.toUpperCase()}</Badge>
      );
    },
  },
  {
    accessorKey: "rejection",
    header: ({ column }) => (
      <TableColHeader column={column} title="Rejection Reason" />
    ),
    cell: ({ row }) => {
      const rejection = row.original.rejection;
      return <p className="text-red-700 hover:text-red-700">{rejection}</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <TableColHeader column={column} title="Submitted" />
    ),
    cell: TableColCreatedAt,
  },
  {
    accessorKey: "View",
    header: ({ column }) => <TableColHeader column={column} title="View" />,
    cell: ({ row }) => (
      <Link variant="ghost" size="sm" to={`/fee/${row.original._id}`}>
        <EyeIcon />
        View
      </Link>
    ),
  },
];

const FeesTable = () => {
  const [parent] = useAutoAnimate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryFn: API.FEE.GET,
    queryKey: ["FEE"],
  });

  const table = useReactTable({
    data: !isLoading && data?.data ? data.data : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  const onRowDoubleClick = (feeId: string) => {
    navigate(`fee/${feeId}`);
  };

  return (
    <>
      {table.getColumn("status") && (
        <TableFacetedFilter
          column={table.getColumn("status")}
          title="Status"
          options={statuses}
        />
      )}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      )}

      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody ref={parent}>
            {isLoading ? (
              <LoadingColumnRows colLen={columns.length} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  ref={parent}
                  onDoubleClick={() => onRowDoubleClick(row.original._id)}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
                  className="h-24 text-center"
                >
                  No Fee Data Submitted till now.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export { FeesTable };
