import { Router } from 'express';
import { patientLogin, adminLogin } from '../controllers/authController';

const router = Router();

router.post('/login', adminLogin);
router.post('/patient-login', patientLogin);

export default router;
