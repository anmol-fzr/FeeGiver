import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const enOrdinalRules = new Intl.PluralRules("en-US", { type: "ordinal" });

const suffixes = new Map([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
]);

const formatOrdinals = (n: number) => {
  const rule = enOrdinalRules.select(n);
  const suffix = suffixes.get(rule);
  return `${n}${suffix}`;
};

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
  let [integerPart, fractionalPart]: any = num.toString().split(".");
  integerPart = parseInt(integerPart, 10);
  let i = 0;
  while (integerPart > 0) {
    let chunk = integerPart % 1000;
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
    for (let digit of fractionalPart) {
      words += " " + belowTwenty[digit];
    }
  }

  return words.trim();
}

export { formatOrdinals, cn, convertToWords };
