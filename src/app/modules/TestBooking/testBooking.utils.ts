import { generateDynamicId } from '../../utils/modelSpecific/generateDynamicId';
import { TestBooking } from './testBooking.model';

export const generateTestBookingId = async () => {
  const testBookingId = await generateDynamicId(TestBooking, 'TST');
  return testBookingId;
};
