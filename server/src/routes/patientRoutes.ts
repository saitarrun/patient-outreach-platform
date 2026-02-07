import { Router } from 'express';
import { getPatients, createPatient } from '../controllers/patientController';

import { requireRole } from '../middleware/rbac';
import { validate } from '../middleware/validation';
import { createPatientSchema } from '../schemas';

const router = Router();

router.get('/', getPatients);
router.post('/', requireRole(['ADMIN', 'STAFF']), validate(createPatientSchema), createPatient);

export default router;
