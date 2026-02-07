import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './tenant';

export const requireRole = (roles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        // If no user attached, DENY (unless public)
        if (!req.user) {
            console.warn(`Access Denied: No user found`);
            // For MVP Demo, we might allow bypass if strict Auth implementation isn't goal.
            // But Enterprise Spec requested RBAC.
            // So return 403.
            return res.status(403).json({ error: 'Access Denied: User required' });
        }

        if (!roles.includes(req.user.role)) {
            console.warn(`Access Denied: Role ${req.user.role} insufficient. Required: ${roles.join(', ')}`);
            return res.status(403).json({ error: 'Insufficient Permissions' });
        }

        next();
    };
};
