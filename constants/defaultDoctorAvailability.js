import { FIXED_TIME_SLOTS } from "./timeSlots.js";

export const DEFAULT_DOCTOR_AVAILABILITY = [
  {
    dayOfWeek: "Monday",
    availableSlots: FIXED_TIME_SLOTS,
  },
  {
    dayOfWeek: "Tuesday",
    availableSlots: FIXED_TIME_SLOTS,
  },
  {
    dayOfWeek: "Wednesday",
    availableSlots: FIXED_TIME_SLOTS,
  },
  {
    dayOfWeek: "Thursday",
    availableSlots: FIXED_TIME_SLOTS,
  },
  {
    dayOfWeek: "Friday",
    availableSlots: FIXED_TIME_SLOTS,
  },
];
