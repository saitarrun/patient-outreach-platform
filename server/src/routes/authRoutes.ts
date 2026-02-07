import { Router } from 'express';
import { patientLogin } from '../controllers/authController';

const router = Router();

router.post('/patient-login', patientLogin);

export default router;
