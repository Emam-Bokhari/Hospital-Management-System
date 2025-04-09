export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// set month number to month name and includes
export const formatMonthlyStats = (
  stats: { _id: number; totalDeaths: number }[],
) => {
  const result = stats.map((item) => ({
    month: MONTH_NAMES[item._id - 1],
    totalDeaths: item.totalDeaths,
  }));
  return MONTH_NAMES.map((month) => {
    const stat = result.find((item) => item.month === month);
    return {
      month,
      totalDeaths: stat ? stat.totalDeaths : 0,
    };
  });
};

// get current year
export const getCurrentYear = (year?: string) => {
  return year ? Number(year) : new Date().getFullYear();
};

// default age groups
export const defaultAgeGroups = [
  { age: '0-18', totalDeaths: 0 },
  { age: '18-30', totalDeaths: 0 },
  { age: '30-40', totalDeaths: 0 },
  { age: '40-50', totalDeaths: 0 },
  { age: '50-60', totalDeaths: 0 },
  { age: '60-70', totalDeaths: 0 },
  { age: '70-80', totalDeaths: 0 },
  { age: '80-90', totalDeaths: 0 },
  { age: '90+', totalDeaths: 0 },
];

export const getAgeGroup = (age: number): string => {
  switch (true) {
    case age <= 18:
      return '0-18';
    case age > 18 && age <= 30:
      return '18-30';
    case age > 30 && age <= 40:
      return '30-40';
    case age > 40 && age <= 50:
      return '40-50';
    case age > 50 && age <= 60:
      return '50-60';
    case age > 60 && age <= 70:
      return '60-70';
    case age > 70 && age <= 80:
      return '70-80';
    case age > 80 && age <= 90:
      return '80-90';
    case age > 90:
      return '90+';
    default:
      return 'other';
  }
};
