import { generateDynamicId } from '../../utils/modelSpecific/generateDynamicId';
import { AdmissionBooking } from './admissionBooking.model';

export const generateAdmissionBookingId = async () => {
  const admissionBookingId = await generateDynamicId(AdmissionBooking, 'ADM');
  return admissionBookingId;
};
