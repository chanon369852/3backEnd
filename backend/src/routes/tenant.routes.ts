import { Router } from "express";
import { prisma } from "../utils/prisma";
import { authenticate } from "../middleware/auth.middleware";
import { requirePermission } from "../middleware/tenant.middleware";
import { PERMISSIONS } from "../constants/rbac";
import { body, param } from 'express-validator';
import { validate } from '../middleware/validate.middleware';

const router = Router();
router.use(authenticate);

// GET all tenants (require manage_tenants permission)
router.get("/", requirePermission(PERMISSIONS.manage_tenants), async (_req, res) => {
  const tenants = await prisma.tenant.findMany({ include: { users: true, alertHistory: true } });
  return res.json(tenants);
});

// GET tenant by ID
router.get("/:id", requirePermission(PERMISSIONS.manage_tenants), param('id').isString().notEmpty(), validate, async (req, res) => {
  const tenant = await prisma.tenant.findUnique({
    where: { id: req.params.id },
    include: { users: true, alertHistory: true }
  });
  if (!tenant) return res.status(404).json({ message: "Tenant not found" });
  return res.json(tenant);
});

// CREATE tenant
router.post(
  "/",
  requirePermission(PERMISSIONS.manage_tenants),
  body('name').isString().notEmpty(),
  body('slug').isString().notEmpty(),
  validate,
  async (req, res) => {
    const { name, slug } = req.body;
    const tenant = await prisma.tenant.create({ data: { name, slug } });
    return res.json(tenant);
  }
);

// UPDATE tenant
router.put(
  "/:id",
  requirePermission(PERMISSIONS.manage_tenants),
  param('id').isString().notEmpty(),
  body('name').optional().isString(),
  body('slug').optional().isString(),
  validate,
  async (req, res) => {
    const { name, slug } = req.body;
    const tenant = await prisma.tenant.update({
      where: { id: req.params.id },
      data: { name, slug }
    });
    return res.json(tenant);
  }
);

// DELETE tenant
router.delete(
  "/:id",
  requirePermission(PERMISSIONS.manage_tenants),
  param('id').isString().notEmpty(),
  validate,
  async (req, res) => {
    await prisma.tenant.delete({ where: { id: req.params.id } });
    return res.json({ message: "Tenant deleted" });
  }
);

export default router;
