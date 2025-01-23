import { DeathRecord } from "../../DeathRecord/deathRecord.model";
import { formatMonthlyStats } from "./deathRecordAnalytics.utils";

const getDeathRecordsOverview = async () => {
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);

    const overviewData = await DeathRecord.aggregate([
        {
            $facet: {
                // total records count
                totalRecords: [
                    { $group: { _id: null, total: { $sum: 1 } } }
                ],
                // total males count
                totalMales: [
                    { $match: { gender: "male" } },
                    { $group: { _id: null, total: { $sum: 1 } } }
                ],
                // total females count
                totalFemales: [
                    { $match: { gender: "female" } },
                    { $group: { _id: null, total: { $sum: 1 } } }
                ],
                // current year records
                currentYearRecords: [
                    {
                        $match:
                        {
                            deathDate: { $gte: startOfYear, $lte: endOfYear }
                        }
                    },
                    { $group: { _id: null, total: { $sum: 1 } } }
                ],
                // most common cause of death
                mostCommonCause: [
                    { $group: { _id: "$causeOfDeath", count: { $sum: 1 } } },
                    { $sort: { count: -1 } },
                    { $limit: 1 }
                ]
            }
        }
    ])

    const data = overviewData[0];

    const totalRecords = data.totalRecords[0]?.total || 0;
    const totalMales = data.totalMales[0]?.total || 0;
    const totalFemales = data.totalFemales[0]?.total || 0
    const currentYearRecords = data.currentYearRecords[0]?.total || 0;
    const mostCommonCause = data.mostCommonCause[0]?._id || "N/A";

    return {
        totalRecords,
        totalMales,
        totalFemales,
        currentYearRecords,
        mostCommonCause,
    }

}

const getDeathRecordsMonthlyStats = async (year?: string) => {
    const currentYear = Number(year) || new Date().getFullYear();

    const monthlyStatsData = await DeathRecord.aggregate([
        {
            $match: {
                deathDate: {
                    $gte: new Date(`${currentYear}-01-01`),
                    $lte: new Date(`${currentYear}-12-31`)
                }
            }
        },
        // group by month and count
        {
            $group: {
                _id: { $month: "$deathDate" },
                totalDeaths: { $sum: 1 }
            }
        },
        // sort by month 
        { $sort: { "_id": 1 } }
    ]);

    return formatMonthlyStats(monthlyStatsData)

}

const getDeathRecordsCauses = async (year?: string, gender?: string) => {
    const currentYear = year ? Number(year) : new Date().getFullYear();

    type TMatchCondition = {
        deathDate?: {
            $gte: Date;
            $lte: Date;
        };
        gender?: string;
    }

    const matchCondition: TMatchCondition = {}


    matchCondition.deathDate = {
        $gte: new Date(`${currentYear}-01-01`),
        $lte: new Date(`${currentYear}-12-31`),
    }


    if (gender) {
        matchCondition.gender = gender;
    }

    const causesData = await DeathRecord.aggregate([
        {
            $match: matchCondition,
        },
        {
            $group: { _id: "$causeOfDeath", totalDeaths: { $sum: 1 } }
        },
        { $sort: { totalDeaths: -1 } }
    ])

    // check if no data found return 0

    if (!causesData || causesData.length === 0) {
        return [{ causeOfDeath: "No data", totalDeaths: 0 }];
    }

    return causesData

}

const getDeathRecordsGenderStats = async (year?: string) => {
    const currentYear = year ? Number(year) : new Date().getFullYear();

    const genderStatsData = await DeathRecord.aggregate([
        {
            $match: {
                deathDate: {
                    $gte: new Date(`${currentYear}-01-01`),
                    $lte: new Date(`${currentYear}-12-31`)
                }
            }
        },
        {
            $group: { _id: "$gender", totalDeaths: { $sum: 1 } }
        },
        { $sort: { totalDeaths: -1 } }
    ])

    // check if no data found return 0
    if (!genderStatsData || genderStatsData.length === 0) {
        return [
            { gender: "male", totalDeaths: 0 },
            { gender: "female", totalDeaths: 0 },
        ]
    }


    return genderStatsData;
}

export const DeathRecordAnalyticsServices = {
    getDeathRecordsOverview,
    getDeathRecordsMonthlyStats,
    getDeathRecordsCauses,
    getDeathRecordsGenderStats,
}