import { z } from 'zod';

export const createPatientSchema = z.object({
    body: z.object({
        firstName: z.string().min(1, "First name required"),
        lastName: z.string().min(1, "Last name required"),
        email: z.string().email().optional().or(z.literal('')),
        phone: z.string().min(10, "Phone number required"),
        dob: z.string().optional(), // ISO Date string
    })
});

export const createAppointmentSchema = z.object({
    body: z.object({
        patientId: z.string().uuid("Invalid Patient ID"),
        date: z.string().datetime("Date must be ISO 8601"),
        type: z.string().min(1, "Appointment type required"),
    })
});
