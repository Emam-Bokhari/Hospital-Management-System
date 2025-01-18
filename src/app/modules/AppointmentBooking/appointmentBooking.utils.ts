import { TDays } from "./appointmentBooking.interface";

export const convertTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

export const convertDateToDay = (appointmentDate: Date): TDays => {
    const appointmentDay: TDays = new Date(appointmentDate).toLocaleString("en-US", {
        weekday: "long",
    }) as TDays;

    return appointmentDay
}