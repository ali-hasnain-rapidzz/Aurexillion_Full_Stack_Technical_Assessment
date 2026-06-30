import { Router } from 'express';
import { ticketController } from '../controllers/ticket.controller';
import { asyncHandler } from '../middleware/asyncHandler';
import { validate } from '../middleware/validate';
import {
  createTicketSchema,
  ticketIdSchema,
  ticketQuerySchema,
  updateTicketSchema,
} from '../validators/ticket.validator';

const router = Router();

router.get(
  '/',
  validate(ticketQuerySchema, 'query'),
  asyncHandler(async (req, res) => ticketController.getAll(req, res)),
);

router.get(
  '/:id',
  validate(ticketIdSchema, 'params'),
  asyncHandler(async (req, res) => ticketController.getById(req, res)),
);

router.post(
  '/',
  validate(createTicketSchema),
  asyncHandler(async (req, res) => ticketController.create(req, res)),
);

router.patch(
  '/:id',
  validate(ticketIdSchema, 'params'),
  validate(updateTicketSchema),
  asyncHandler(async (req, res) => ticketController.update(req, res)),
);

export default router;
