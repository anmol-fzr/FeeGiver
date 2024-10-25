export * from "./regex";
export * from "./options";

const guessCurrSem = (collegeYear: number) => {
  const currentDate = new Date();
  const month = currentDate.getMonth();

  const isEvenSemester = month >= 7 && month <= 11; // August to December

  const semesterNumber = collegeYear * 2 + (isEvenSemester ? 1 : 2);

  return semesterNumber;
};

export { guessCurrSem };
