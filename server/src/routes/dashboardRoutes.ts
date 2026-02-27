import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboardController';
import { requireRole } from '../middleware/rbac';

const router = Router();

// Only admin/staff can access dashboard stats
router.get('/stats', requireRole(['ADMIN', 'STAFF']), getDashboardStats);

export default router;
