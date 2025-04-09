'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getAgeGroup =
  exports.defaultAgeGroups =
  exports.getCurrentYear =
  exports.formatMonthlyStats =
  exports.MONTH_NAMES =
    void 0;
exports.MONTH_NAMES = [
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
const formatMonthlyStats = (stats) => {
  const result = stats.map((item) => ({
    month: exports.MONTH_NAMES[item._id - 1],
    totalDeaths: item.totalDeaths,
  }));
  return exports.MONTH_NAMES.map((month) => {
    const stat = result.find((item) => item.month === month);
    return {
      month,
      totalDeaths: stat ? stat.totalDeaths : 0,
    };
  });
};
exports.formatMonthlyStats = formatMonthlyStats;
// get current year
const getCurrentYear = (year) => {
  return year ? Number(year) : new Date().getFullYear();
};
exports.getCurrentYear = getCurrentYear;
// default age groups
exports.defaultAgeGroups = [
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
const getAgeGroup = (age) => {
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
exports.getAgeGroup = getAgeGroup;
