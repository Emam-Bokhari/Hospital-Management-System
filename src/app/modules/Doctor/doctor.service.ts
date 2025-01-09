import { flattenAndUpdate } from '../../utils/flattenAndUpdate';
import { TDoctor } from './doctor.interface';
import { Doctor } from './doctor.model';

const createDoctor = async (payload: TDoctor) => {
  const createdDoctor = await Doctor.create(payload);

  return createdDoctor;
};

const getAllDoctors = async () => {
  const doctors = await Doctor.find();
  return doctors;
};

const getDoctorById = async (id: string) => {
  const doctor = await Doctor.findById(id);
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
    availableTimeSlots,
    qualifications,
    offDays,
    workingDays,
    ...remainingDoctorData
  } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingDoctorData,
  };

  const doctor = await Doctor.findById(id);

  // Flatten and update object fields
  if (contactInformation) {
    flattenAndUpdate('contactInformation', contactInformation, modifiedUpdatedData,
    );
  }

  if (emergencyContact) {
    flattenAndUpdate('emergencyContact', emergencyContact, modifiedUpdatedData);
  }

  if (medicalPracticeInformation) {
    flattenAndUpdate('medicalPracticeInformation', medicalPracticeInformation, modifiedUpdatedData,
    );
  }

  // Flatten and update array of object fields
  if (educationDetails && educationDetails.length > 0) {
    educationDetails.forEach((education, index) => {
      flattenAndUpdate(`educationDetails.${index}`, education, modifiedUpdatedData,
      );
    });
  }

  if (awards && awards.length > 0) {
    awards.forEach((award, index) => {
      flattenAndUpdate(`awards.${index}`, award, modifiedUpdatedData);
    });
  }

  if (previousWorkPlace && previousWorkPlace.length > 0) {
    previousWorkPlace.forEach((workPlace, index) => {
      flattenAndUpdate(`previousWorkPlace.${index}`, workPlace, modifiedUpdatedData,
      );
    });
  }

  if (workingHours && workingHours.length > 0) {
    workingHours.forEach((workingHour, index) => {
      flattenAndUpdate(`workingHours.${index}`, workingHour, modifiedUpdatedData,
      );
    });
  }

  if (availableTimeSlots && availableTimeSlots.length > 0) {
    availableTimeSlots.forEach((availableTimeSlot, index) => {
      flattenAndUpdate(`availableTimeSlots.${index}`, availableTimeSlot, modifiedUpdatedData,
      );
    });
  }

  // update array fields
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
    { _id: id },
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

// array: workingDays, offDays, qualifications,
