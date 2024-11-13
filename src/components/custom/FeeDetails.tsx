import { ReactNode } from "react";
import { Fee as IFee } from "@/type/res";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components";
import { FeeStatusBadge } from "@/components";
import { FeePdf } from "@/components/FeePdf";
import { API } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency, formatDateTime, formatOrdinals } from "@/utils/funcs";

type FeeDetailsProps = {
  feeId: string;
};

type K = keyof IFee;
type D = {
  label: string;
  fmt: (k: any) => ReactNode;
};

const fmts: Record<K, D> = {
  sbCollRef: {
    label: "SB Collect Reference Number",
    fmt: (val) => val,
  },
  amount: {
    label: "Amount",
    fmt: formatCurrency,
  },
  sem: {
    label: "Semester",
    fmt: formatOrdinals,
  },
  feeType: {
    label: "Fee Type",
    fmt: (val) => val,
  },
  hostelFeeAmount: {
    label: "Hostel Fee Amount",
    fmt: formatCurrency,
  },
  securityAmount: {
    label: "Security Fee Amount",
    fmt: formatCurrency,
  },
  fineAmount: {
    label: "Fine Amount",
    fmt: formatCurrency,
  },
  createdAt: {
    label: "Submitted At",
    fmt: formatDateTime,
  },
} as const;

export function FeeDetails({ feeId }: FeeDetailsProps) {
  const { isLoading, data } = useQuery({
    queryKey: ["FEE", feeId] as const,
    queryFn: ({ queryKey }) => API.FEE.ONE(queryKey[1]),
  });

  const pdfUri = data?.data.pdfUri;

  return (
    <div className="w-full flex gap-4 justify-between">
      <Card className="w-full max-w-screen-md h-fit">
        <CardHeader>
          <CardTitle className="flex items-start justify-between">
            Fee Details
            {!isLoading && data?.data && (
              <FeeStatusBadge status={data?.data.status} />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {!isLoading &&
                data?.data &&
                Object.entries(data.data).map(([key, value]) => {
                  const f = fmts[key];
                  const shouldRender = f !== undefined;
                  return (
                    shouldRender && (
                      <TableRow key={key}>
                        <TableCell className="font-medium">{f.label}</TableCell>
                        <TableCell>{f.fmt(value)}</TableCell>
                      </TableRow>
                    )
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {!isLoading && pdfUri && <FeePdf file={pdfUri} />}
    </div>
  );
}
