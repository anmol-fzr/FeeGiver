import { ITimeStamps } from "@/type/res";
import { formatDateTime } from "@/utils";
import { Row } from "@tanstack/react-table";

type TableColBaseProps<TData> = {
  row: Row<TData>;
};

const TableColCreatedAt = <TData extends ITimeStamps>({
  row,
}: TableColBaseProps<TData>) => {
  const date = row.original.createdAt;
  const formatted = formatDateTime(date);
  return <div className="font-medium">{formatted}</div>;
};

export { TableColCreatedAt };
