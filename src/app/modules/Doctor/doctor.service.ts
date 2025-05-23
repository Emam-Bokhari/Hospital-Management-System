import { HttpError } from '../../errors/HttpError';
import { flattenAndUpdate } from '../../utils/modelSpecific/flattenAndUpdate';
import { updateArrayField } from '../../utils/modelSpecific/updateArrayField';
import { Department } from '../Department/department.model';
import { Specialization } from '../Specialization/specialization.model';
import { TDoctor } from './doctor.interface';
import { Doctor } from './doctor.model';

const createDoctor = async (payload: TDoctor) => {
  // check if specialization  exists
  const specialization = await Specialization.findOne({
    _id: payload.specialization,
  }).select('_id');

  if (!specialization) {
    throw new HttpError(404, 'No specialization found the provided ID');
  }

  // Check if a department exists for the given specialization
  const department = await Department.findOne({
    specialization: payload.specialization,
  });

  if (!department) {
    throw new HttpError(
      404,
      'No department found for the given specialization.',
    );
  }

  payload.department = department._id;

  const createdDoctor = await Doctor.create(payload);

  return createdDoctor;
};

const getAllDoctors = async () => {
  const doctors = await Doctor.find()
    .populate('userId')
    .populate({
      path: 'specialization',
      select: 'name',
      populate: { path: 'createdBy', select: 'firstName lastName email role' },
    })
    .populate([
      {
        path: 'department',
        select: 'departmentName',
        populate: [
          {
            path: 'createdBy',
            select: 'firstName lastName email role',
          },
          {
            path: 'specialization',
            select: 'name',
            populate: {
              path: 'createdBy',
              select: 'firstName lastName email role',
            },
          },
        ],
      },
    ]);

  if (doctors.length === 0) {
    throw new HttpError(404, 'No doctor were found in the database');
  }

  return doctors;
};

const getDoctorById = async (id: string) => {
  const doctor = await Doctor.findById(id)
    .populate('userId')
    .populate({
      path: 'specialization',
      select: 'name',
      populate: { path: 'createdBy', select: 'firstName lastName email role' },
    })
    .populate([
      {
        path: 'department',
        select: 'departmentName',
        populate: [
          {
            path: 'createdBy',
            select: 'firstName lastName email role',
          },
          {
            path: 'specialization',
            select: 'name',
            populate: {
              path: 'createdBy',
              select: 'firstName lastName email role',
            },
          },
        ],
      },
    ]);

  if (!doctor) {
    throw new HttpError(404, `No doctor found with ID: ${id}`);
  }

  return doctor;
};

const updateDoctorById = async (id: string, payload: Partial<TDoctor>) => {
  const {
    contactInformation,
    emergencyContact,
    medicalPracticeInformation,
    educationDetails,
    awards,
    previousWorkPlace,
    workingHours,
    qualifications,
    offDays,
    workingDays,
    ...remainingDoctorData
  } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingDoctorData,
  };

  const doctor = await Doctor.findById(id);

  if (!doctor) {
    throw new HttpError(404, `No doctor found with ID: ${id}`);
  }

  // Utility function to flatten nested fields,  update object fields
  if (contactInformation) {
    flattenAndUpdate(
      'contactInformation',
      contactInformation,
      modifiedUpdatedData,
    );
  }

  if (emergencyContact) {
    flattenAndUpdate('emergencyContact', emergencyContact, modifiedUpdatedData);
  }

  if (medicalPracticeInformation) {
    flattenAndUpdate(
      'medicalPracticeInformation',
      medicalPracticeInformation,
      modifiedUpdatedData,
    );
  }

  // Utility function to flatten nested fields, update array of object fields
  if (educationDetails && educationDetails.length > 0) {
    updateArrayField('educationDetails', educationDetails, modifiedUpdatedData);
  }

  if (awards && awards.length > 0) {
    updateArrayField('awards', awards, modifiedUpdatedData);
  }

  if (previousWorkPlace && previousWorkPlace.length > 0) {
    updateArrayField(
      'previousWorkPlace',
      previousWorkPlace,
      modifiedUpdatedData,
    );
  }

  if (workingHours && workingHours.length > 0) {
    updateArrayField('workingHours', workingHours, modifiedUpdatedData);
  }

  //  update array fields
  if (qualifications) {
    const currentQualifications = doctor?.qualifications || [];

    if (qualifications.length > 0) {
      modifiedUpdatedData.qualifications = Array.from(
        new Set([...currentQualifications, ...qualifications]),
      );
    }
  }

  if (workingDays) {
    const currentWorkingDays = doctor?.workingDays || [];

    if (workingDays.length > 0) {
      modifiedUpdatedData.workingDays = Array.from(
        new Set([...currentWorkingDays, ...workingDays]),
      );
    }
  }

  if (offDays) {
    const currentOffDays = doctor?.offDays || [];

    if (offDays.length > 0) {
      modifiedUpdatedData.offDays = Array.from(
        new Set([...currentOffDays, ...offDays]),
      );
    }
  }

  const updatedDoctor = await Doctor.findOneAndUpdate(
    { _id: id, isDeleted: false },
    modifiedUpdatedData,
    { new: true, runValidators: true },
  );

  return updatedDoctor;
};

export const DoctorServices = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
};
