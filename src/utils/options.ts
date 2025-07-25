import { formatOrdinals } from "@/utils";
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

const belowTwenty = [
	"",
	"One",
	"Two",
	"Three",
	"Four",
	"Five",
	"Six",
	"Seven",
	"Eight",
	"Nine",
	"Ten",
	"Eleven",
	"Twelve",
	"Thirteen",
	"Fourteen",
	"Fifteen",
	"Sixteen",
	"Seventeen",
	"Eighteen",
	"Nineteen",
];

const tens = [
	"",
	"",
	"Twenty",
	"Thirty",
	"Forty",
	"Fifty",
	"Sixty",
	"Seventy",
	"Eighty",
	"Ninety",
];

const aboveThousand = ["", "Thousand", "Million", "Billion"];

function convertToWords(num: number) {
	if (num === 0) return "Zero";

	let words = "";

	function helper(n: number, index: number) {
		if (n === 0) return "";

		let part = "";

		if (n < 20) {
			part = belowTwenty[n] + " ";
		} else if (n < 100) {
			part = tens[Math.floor(n / 10)] + " " + belowTwenty[n % 10] + " ";
		} else {
			part =
				belowTwenty[Math.floor(n / 100)] + " Hundred " + helper(n % 100, 0);
		}

		if (index > 0 && n > 0) {
			part += aboveThousand[index] + " ";
		}

		return part;
	}

	// Handle integer part
	let integerPart: string | number = num.toString().split(".")[0];
	const fractionalPart: string = num.toString().split(".")[1];
	integerPart = parseInt(integerPart, 10);
	let i = 0;
	while (integerPart > 0) {
		const chunk = integerPart % 1000;
		if (chunk > 0) {
			words = helper(chunk, i) + words;
		}
		integerPart = Math.floor(integerPart / 1000);
		i++;
	}

	words = words.trim();

	// Handle fractional part
	if (fractionalPart) {
		words += " Point";
		for (const digit of fractionalPart) {
			words += " " + belowTwenty[digit];
		}
	}

	return words.trim();
}

const currBatch = year.slice(2);
const currYear = year;

export {
	semOptions,
	yearOptions,
	boolOptions,
	convertToWords,
	currYear,
	currBatch,
};
