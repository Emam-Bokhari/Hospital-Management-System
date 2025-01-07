import { Types } from "mongoose"

type TContactInformation = {
    phone: string;
    email: string;
}

type TEmergencyContact = {
    name: string;
    phone: string;
    relationship: string;
}

type TPreviousWorkPlace = {
    companyName: string;
    position: string;
    startDate: string;
    endDate: string;
};

type TProfessionalInformation = {
    specialization: string;
    qualifications: string[];
    licenseNumber: string;
    licenseExpiryDate: string;
    previousWorkPlace?: TPreviousWorkPlace[];
    yearsOfExperience?: number;
}

type TEducationDetails =
    {
        universityName: string;
        degreeEarned: string;
        duration: string;
        specializationInEducation: string;
        universityLocation: string;
        universityWebsite?: string;
    }


type TAwards = {
    awardName: string;
    awardCategory?: string;
    awardYear: string;
    awardDescription: string;
    issuingOrganization?: string;
}

type TAvailabilityInformation = {
    workingDays: string[];
    workingHours: string[];
    availableTimeSlots: string[];
    offDays: string[];
}



type TMedicalPracticeInformation = {
    hospitalAffiliation: string;
    chamberAddress: string;
}

export type TDoctor = {
    userId: Types.ObjectId;
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    dateOfBirth: string;
    nationality: string;
    religion: string;
    profilePicture?: string;
    contactInformation: TContactInformation;
    emergencyContact: TEmergencyContact;
    professionalInformation: TProfessionalInformation;
    educationDetails: TEducationDetails[];
    awards?: TAwards[];
    availabilityInformation: TAvailabilityInformation;
    medicalPracticeInformation: TMedicalPracticeInformation;
}