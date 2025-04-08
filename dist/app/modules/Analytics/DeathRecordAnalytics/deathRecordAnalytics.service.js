'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DeathRecordAnalyticsServices = void 0;
const deathRecord_model_1 = require('../../DeathRecord/deathRecord.model');
const deathRecordAnalytics_utils_1 = require('./deathRecordAnalytics.utils');
const getDeathRecordsOverview = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);
    const overviewData = yield deathRecord_model_1.DeathRecord.aggregate([
      {
        $facet: {
          // total records count
          totalRecords: [{ $group: { _id: null, total: { $sum: 1 } } }],
          // total males count
          totalMales: [
            { $match: { gender: 'male' } },
            { $group: { _id: null, total: { $sum: 1 } } },
          ],
          // total females count
          totalFemales: [
            { $match: { gender: 'female' } },
            { $group: { _id: null, total: { $sum: 1 } } },
          ],
          // current year records
          currentYearRecords: [
            {
              $match: {
                deathDate: { $gte: startOfYear, $lte: endOfYear },
              },
            },
            { $group: { _id: null, total: { $sum: 1 } } },
          ],
          // most common cause of death
          mostCommonCause: [
            { $group: { _id: '$causeOfDeath', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 },
          ],
        },
      },
    ]);
    const data = overviewData[0];
    const totalRecords =
      ((_a = data.totalRecords[0]) === null || _a === void 0
        ? void 0
        : _a.total) || 0;
    const totalMales =
      ((_b = data.totalMales[0]) === null || _b === void 0
        ? void 0
        : _b.total) || 0;
    const totalFemales =
      ((_c = data.totalFemales[0]) === null || _c === void 0
        ? void 0
        : _c.total) || 0;
    const currentYearRecords =
      ((_d = data.currentYearRecords[0]) === null || _d === void 0
        ? void 0
        : _d.total) || 0;
    const mostCommonCause =
      ((_e = data.mostCommonCause[0]) === null || _e === void 0
        ? void 0
        : _e._id) || 'N/A';
    return {
      totalRecords,
      totalMales,
      totalFemales,
      currentYearRecords,
      mostCommonCause,
    };
  });
const getDeathRecordsMonthlyStats = (year) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentYear = Number(year) || new Date().getFullYear();
    const monthlyStatsData = yield deathRecord_model_1.DeathRecord.aggregate([
      {
        $match: {
          deathDate: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      // group by month and count
      {
        $group: {
          _id: { $month: '$deathDate' },
          totalDeaths: { $sum: 1 },
        },
      },
      // sort by month
      { $sort: { _id: 1 } },
    ]);
    return (0, deathRecordAnalytics_utils_1.formatMonthlyStats)(
      monthlyStatsData,
    );
  });
const getDeathRecordsCauses = (year, gender) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentYear = year ? Number(year) : new Date().getFullYear();
    const matchCondition = {};
    matchCondition.deathDate = {
      $gte: new Date(`${currentYear}-01-01`),
      $lte: new Date(`${currentYear}-12-31`),
    };
    if (gender) {
      matchCondition.gender = gender;
    }
    const causesData = yield deathRecord_model_1.DeathRecord.aggregate([
      {
        $match: matchCondition,
      },
      {
        $group: { _id: '$causeOfDeath', totalDeaths: { $sum: 1 } },
      },
      { $sort: { totalDeaths: -1 } },
    ]);
    // check if no data found return 0
    if (!causesData || causesData.length === 0) {
      return [{ causeOfDeath: 'No data', totalDeaths: 0 }];
    }
    return causesData;
  });
const getDeathRecordsGenderStats = (year) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentYear = year ? Number(year) : new Date().getFullYear();
    const genderStatsData = yield deathRecord_model_1.DeathRecord.aggregate([
      {
        $match: {
          deathDate: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $group: { _id: '$gender', totalDeaths: { $sum: 1 } },
      },
      { $sort: { totalDeaths: -1 } },
    ]);
    // check if no data found return 0
    if (!genderStatsData || genderStatsData.length === 0) {
      return [
        { gender: 'male', totalDeaths: 0 },
        { gender: 'female', totalDeaths: 0 },
      ];
    }
    return genderStatsData;
  });
const getDeathRecordsAgeGroupStats = (year) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentYear = (0, deathRecordAnalytics_utils_1.getCurrentYear)(year);
    const ageGroupStatsData = yield deathRecord_model_1.DeathRecord.aggregate([
      {
        $match: {
          deathDate: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
        },
      },
      {
        $bucket: {
          groupBy: '$age',
          boundaries: [0, 18, 30, 40, 50, 60, 70, 80, 90, 100],
          default: 'other',
          output: {
            totalDeaths: { $sum: 1 },
          },
        },
      },
      { $sort: { totalDeaths: -1 } },
    ]);
    // check if no data found return default age groups
    if (!ageGroupStatsData || ageGroupStatsData.length === 0) {
      return deathRecordAnalytics_utils_1.defaultAgeGroups;
    }
    // Iterate through default age groups and match with available age group data
    const filledAgeGroups = deathRecordAnalytics_utils_1.defaultAgeGroups.map(
      (group) => {
        const matchedGroup = ageGroupStatsData.find((data) => {
          const groupName = (0, deathRecordAnalytics_utils_1.getAgeGroup)(
            data._id,
          );
          return group.age === groupName;
        });
        // Return the matched data or the default group structure with 0 deaths if no match found
        return matchedGroup
          ? { age: group.age, totalDeaths: matchedGroup.totalDeaths }
          : group;
      },
    );
    return filledAgeGroups;
  });
exports.DeathRecordAnalyticsServices = {
  getDeathRecordsOverview,
  getDeathRecordsMonthlyStats,
  getDeathRecordsCauses,
  getDeathRecordsGenderStats,
  getDeathRecordsAgeGroupStats,
};
