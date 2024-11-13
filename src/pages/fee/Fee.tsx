import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Link,
  PageHeader,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components";
import { useRouteParam } from "@/hooks";
import { API } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { formatCurrency, formatDateTime, formatOrdinals } from "@/utils/funcs";
import { Fee as IFee } from "@/type/res";
import { FeeStatusBadge } from "@/components";
import { ChevronLeft } from "lucide-react";
import { FeePdf } from "@/components/FeePdf";

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

const FeePage = () => {
  const feeId = useRouteParam("feeId");

  const { isLoading, data } = useQuery({
    queryKey: ["FEE", feeId] as const,
    queryFn: ({ queryKey }) => API.FEE.ONE(queryKey[1]),
  });

  const pdfUri = data?.data.pdfUri;

  return (
    <div className="flex flex-col w-full items-start">
      <Link to="/">
        <ChevronLeft />
        Go Back
      </Link>
      <div className="w-full flex flex-col gap-12">
        <PageHeader title="Fee Data" desc="" />

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
                            <TableCell className="font-medium">
                              {f.label}
                            </TableCell>
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
      </div>
    </div>
  );
};

export { FeePage };
