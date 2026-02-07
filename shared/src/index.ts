export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string;
    dob: string | null;
    preferences: {
        language?: string;
        quietHours?: { start: string; end: string };
    } | null;
}

export interface Appointment {
    id: string;
    patientId: string;
    date: string;
    type: string;
    status: 'SCHEDULED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

export interface CreatePatientDTO {
    firstName: string;
    lastName: string;
    email?: string;
    phone: string;
    dob?: string;
}

export interface CreateAppointmentDTO {
    patientId: string;
    date: string;
    type: string;
}
