export type Employment = {
  startDate: Date;
  untilDate: Date;
  percentage: number;
  vacationDays: number;
};

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function daysInYear(date: Date): number {
  return isLeapYear(date.getFullYear()) ? 366 : 365;
}

function daysBetween(start: Date, end: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.floor((utcEnd - utcStart + msPerDay) / msPerDay); // inkl. letzter Tag
}

export function calculateProRataVacationDays(employment: Employment): number {
  const { startDate, untilDate, percentage, vacationDays } = employment;

  const startYear = startDate.getFullYear();
  const endYear = untilDate.getFullYear();


  if (startYear !== endYear) {
    throw new Error("Berechnung nur für eine Anstellung innerhalb eines Kalenderjahres erlaubt.");
  }

  const totalDaysInYear = daysInYear(startDate);
  const workedDays = daysBetween(startDate, untilDate);
  const ratio = (workedDays / totalDaysInYear) * (percentage / 100);

  return +(vacationDays * ratio).toFixed(2); 
}
