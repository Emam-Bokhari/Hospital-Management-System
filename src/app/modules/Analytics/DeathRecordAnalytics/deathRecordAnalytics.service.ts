import { DeathRecord } from "../../DeathRecord/deathRecord.model";

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

export const DeathRecordAnalyticsServices = {
    getDeathRecordsOverview,
}