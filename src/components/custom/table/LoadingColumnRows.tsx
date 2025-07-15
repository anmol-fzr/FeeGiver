import { TableCell, TableRow } from "@/components";
import Skeleton from "react-loading-skeleton";

type LoadingColumnRowsProps = {
	colLen: number;
};

export function LoadingColumnRows({ colLen }: LoadingColumnRowsProps) {
	return Array.from(new Array(10)).map((_, i) => (
		<TableRow className="h-[86px]" key={i}>
			{Array.from(new Array(colLen)).map((_, i) => (
				<TableCell key={i}>
					<Skeleton className="text-xl" />
				</TableCell>
			))}
		</TableRow>
	));
}
