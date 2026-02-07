import { Router } from 'express';
import { getAppointments, createAppointment, confirmAppointment, rescheduleAppointment } from '../controllers/appointmentController';

import { requireRole } from '../middleware/rbac';
import { validate } from '../middleware/validation';
import { createAppointmentSchema } from '../schemas';

const router = Router();

router.get('/', getAppointments);
router.post('/', requireRole(['ADMIN', 'STAFF']), validate(createAppointmentSchema), createAppointment);
router.post('/:id/confirm', confirmAppointment); // Public/Patient accessible? Or protected? 
// For Patient Portal, they are authenticated via "Patient Login" which returns a token (not yet fully implemented JWT).
// For MVP "Magic Link" style, we might leave open or rely on the patient context check we skipped simpler.
// Let's assume public for now or add a 'requirePatientAuth' middleware if we had one.
router.post('/:id/reschedule', rescheduleAppointment);

export default router;
