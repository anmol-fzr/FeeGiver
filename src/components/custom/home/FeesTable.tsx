import { useEffect, useState } from "react";
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
} from "@/components/";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { TableColHeader } from "@/components";
import { formatCurrency, formatOrdinals } from "@/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Status = "pending" | "accepted" | "rejected";
type Data = {
  sem: number;
  sbCollectRef: string;
  amount: number;
  feeType: string;
  status: Status;
};

const feeData: Data[] = [
  {
    sem: 4,
    sbCollectRef: "ABZ1231234",
    amount: 99764,
    feeType: "PMSS 40",
    status: "pending",
  },
  {
    sem: 3,
    sbCollectRef: "ABC1231234",
    amount: 59784,
    feeType: "PMSS 60",
    status: "accepted",
  },
  {
    sem: 1,
    sbCollectRef: "AB1231234",
    amount: 89999,
    feeType: "Full Fee",
    status: "rejected",
  },
];

const colorXStatus: Record<Status, string> = {
  pending:
    "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-700",
  accepted:
    "bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700",
  rejected: "bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700",
};

const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "sem",
    header: ({ column }) => <TableColHeader column={column} title="Semester" />,
    cell: ({ row }) => <p>{formatOrdinals(row.getValue("sem"))}</p>,
  },
  {
    accessorKey: "sbCollectRef",
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
      const status = row.getValue("status");
      return (
        <Badge className={colorXStatus[status]}>{status.toUpperCase()}</Badge>
      );
    },
  },
];

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

const FeesTable = () => {
  const [parent] = useAutoAnimate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [data, setData] = useState(feeData);

  //useEffect(() => {
  //  const intId = setInterval(() => {
  //    setData((data) => (data.length > 0 ? [] : feeData));
  //  }, 1000);
  //
  //  return () => clearInterval(intId);
  //}, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  ref={parent}
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
                  No results.
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
