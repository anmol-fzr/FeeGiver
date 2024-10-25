const guessCurrSem = (collegeYear: number) => {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const isEvenSemester = month >= 7 && month <= 11; // August to December
  const semesterNumber = collegeYear * 2 + (isEvenSemester ? 1 : 2);

  return semesterNumber;
};

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

const formatCurrency = (n: number) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  return formatter.format(n);
};

export { guessCurrSem, formatOrdinals, formatCurrency };
