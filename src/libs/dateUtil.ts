import { format } from "date-fns";

const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
const convertWeekToDate = (week: string) => {
  const year = week.substring(0, 4);
  const weekNumber = week.substring(5, 7);
  const weeksOffset = isLeapYear(parseInt(year)) ? 1 : 0;

  const firstDayOfYear = new Date(parseInt(year), 0, 1 + weeksOffset);
  const daysToAdd = (parseInt(weekNumber) - 1) * 7;

  const firstDayOfWeek = new Date(
    firstDayOfYear.valueOf() +
      (daysToAdd - (firstDayOfYear.getDay() - 1)) * 24 * 60 * 60 * 1000
  );
  const lastDayOfWeek = new Date(
    firstDayOfWeek.valueOf() + 6 * 24 * 60 * 60 * 1000
  );
  return `${format(firstDayOfWeek, "yyyy-MM-dd")} - ${format(
    lastDayOfWeek,
    "yyyy-MM-dd"
  )}`;
};
export default convertWeekToDate;
