import { formatOrdinals } from "@/lib/utils";
import { Option } from "@/type";

const semOptions: Option[] = [];

for (let index = 1; index < 9; index++) {
  semOptions.push({
    label: `${formatOrdinals(index)} Sem`,
    helper: `( ${formatOrdinals(Math.ceil(index / 2))} year )`,
    value: index.toString(),
  });
}

const yearOptions: Option[] = [];

const year = new Date().getFullYear().toString();

for (let index = 0; index < 4; index++) {
  const bth = (Number(year) - index).toString();
  yearOptions.push({
    label: `${bth}`,
    helper: ` ( ${formatOrdinals(index + 1)} year )`,
    value: bth,
  });
}

const feeTypeOptions: Option[] = [
  {
    label: "Full Fee",
    value: "Full Fee",
  },
  {
    label: "PMSS 40",
    value: "PMSS 40",
  },
  {
    label: "PMSS 60",
    value: "PMSS 60",
  },
  {
    label: "PMSS 100",
    value: "PMSS 100",
  },
  {
    label: "Scholarship Bihar",
    value: "Scholarship Bihar",
  },
  {
    label: "Scholarship J & K",
    value: "Scholarship J & K",
  },
  {
    label: "Pre-registration",
    value: "Pre-registration",
  },
  {
    label: "Re-appear",
    value: "Re-appear",
  },
  {
    label: "Any Other",
    value: "Any Other",
  },
];

const boolOptions: Option[] = [
  {
    label: "Yes",
    value: "true",
  },
  {
    label: "No",
    value: "false",
  },
];

export { semOptions, yearOptions, feeTypeOptions, boolOptions };
