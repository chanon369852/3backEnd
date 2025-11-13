import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../middleware/error.middleware';
import { requireRole, selfOrRoles } from '../middleware/tenant.middleware';
import * as userController from '../controllers/user.controller';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validate.middleware';

const router = Router();

router.use(authenticate);

router.get('/', requireRole(['super_admin', 'admin', 'manager']), asyncHandler(userController.listUsers));

router.get(
  '/:id',
  param('id').isString().notEmpty(),
  validate,
  selfOrRoles('id', ['admin', 'manager']),
  asyncHandler(userController.getUserById)
);

router.post(
  '/',
  requireRole(['admin', 'manager']),
  body('email').isEmail(),
  body('password').isString().isLength({ min: 8 }),
  body('firstName').optional().isString(),
  body('lastName').optional().isString(),
  body('role').optional().isString().isIn(['super_admin','admin_full','admin_user','manager','viewer']),
  validate,
  asyncHandler(userController.createUser)
);

router.put(
  '/:id',
  requireRole(['admin', 'manager']),
  param('id').isString().notEmpty(),
  body('email').optional().isEmail(),
  body('password').optional().isString().isLength({ min: 8 }),
  body('firstName').optional().isString(),
  body('lastName').optional().isString(),
  body('role').optional().isString().isIn(['admin','manager','viewer']),
  validate,
  asyncHandler(userController.updateUser)
);

router.delete(
  '/:id',
  requireRole(['admin']),
  param('id').isString().notEmpty(),
  validate,
  asyncHandler(userController.deleteUser)
);

router.post(
  '/:id/change-password',
  selfOrRoles('id', ['admin']),
  param('id').isString().notEmpty(),
  body('currentPassword').optional().isString().isLength({ min: 8 }),
  body('newPassword').isString().isLength({ min: 8 }),
  validate,
  asyncHandler(userController.changePassword)
);

export default router;
