'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== 'default') __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
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
exports.Department = exports.departmentSchema = void 0;
const mongoose_1 = __importStar(require('mongoose'));
const HttpError_1 = require('../../errors/HttpError');
const queryFilters_1 = require('../../utils/modelSpecific/queryFilters');
const symptomsAddressedSchema = new mongoose_1.Schema({
  _id: {
    type: String,
  },
  symptom: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
});
const possibleCausesSchema = new mongoose_1.Schema({
  _id: {
    type: String,
  },
  cause: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
});
exports.departmentSchema = new mongoose_1.Schema(
  {
    specialization: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: true,
      ref: 'Specialization',
    },
    departmentName: {
      type: String,
    },
    overview: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    symptomsAddressed: {
      type: [symptomsAddressedSchema],
      required: true,
    },
    possibleCauses: {
      type: [possibleCausesSchema],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inActive'],
      default: 'active',
    },
    createdBy: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      enum: ['add', 'remove', 'update'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
// document middleware to set department name based of specialization name
exports.departmentSchema.pre('save', function (next) {
  return __awaiter(this, void 0, void 0, function* () {
    const specialization = yield mongoose_1.default
      .model('Specialization')
      .findById(this.specialization)
      .select('name');
    if (specialization) {
      this.departmentName = `Department of ${specialization.name}`;
    } else {
      throw new HttpError_1.HttpError(404, 'Specialization not found!');
    }
    next();
  });
});
// query middleware for soft delete by utils
exports.departmentSchema.pre('find', queryFilters_1.excludeDeletedQuery);
exports.departmentSchema.pre('findOne', queryFilters_1.excludeDeletedQuery);
// aggregate middleware for soft delete by utils
exports.departmentSchema.pre(
  'aggregate',
  queryFilters_1.excludeDeletedAggregation,
);
exports.Department = (0, mongoose_1.model)(
  'Department',
  exports.departmentSchema,
);
