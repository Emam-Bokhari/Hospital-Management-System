export const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// set month number to month name and includes
export const formatMonthlyStats = (stats: { _id: number, totalDeaths: number }[]) => {
    const result = stats.map((item) => ({
        month: MONTH_NAMES[item._id - 1],
        totalDeaths: item.totalDeaths,

    }))
    return MONTH_NAMES.map((month) => {
        const stat = result.find((item) => item.month === month);
        return {
            month,
            totalDeaths: stat ? stat.totalDeaths : 0
        }
    })
}