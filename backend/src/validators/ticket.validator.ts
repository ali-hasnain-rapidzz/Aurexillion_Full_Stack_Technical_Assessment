import { z } from 'zod';
import { TicketPriority, TicketStatus } from '../types/ticket.types';
import { isValidObjectId } from '../utils/helpers';

export const createTicketSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, 'Title is required')
    .max(200, 'Title cannot exceed 200 characters')
    .trim(),
  description: z
    .string({ required_error: 'Description is required' })
    .min(1, 'Description is required')
    .max(2000, 'Description cannot exceed 2000 characters')
    .trim(),
  customerName: z
    .string({ required_error: 'Customer name is required' })
    .min(1, 'Customer name is required')
    .max(100, 'Customer name cannot exceed 100 characters')
    .trim(),
  customerEmail: z
    .string({ required_error: 'Customer email is required' })
    .email('Please provide a valid email address')
    .trim(),
  priority: z.nativeEnum(TicketPriority, {
    required_error: 'Priority is required',
    invalid_type_error: 'Priority must be LOW, MEDIUM, or HIGH',
  }),
});

export const updateTicketSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title cannot be empty')
      .max(200, 'Title cannot exceed 200 characters')
      .trim()
      .optional(),
    description: z
      .string()
      .min(1, 'Description cannot be empty')
      .max(2000, 'Description cannot exceed 2000 characters')
      .trim()
      .optional(),
    customerName: z
      .string()
      .min(1, 'Customer name cannot be empty')
      .max(100, 'Customer name cannot exceed 100 characters')
      .trim()
      .optional(),
    customerEmail: z
      .string()
      .email('Please provide a valid email address')
      .trim()
      .optional(),
    status: z.nativeEnum(TicketStatus, {
      invalid_type_error: 'Status must be OPEN, IN_PROGRESS, or RESOLVED',
    }).optional(),
    priority: z.nativeEnum(TicketPriority, {
      invalid_type_error: 'Priority must be LOW, MEDIUM, or HIGH',
    }).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

export const ticketQuerySchema = z.object({
  status: z.nativeEnum(TicketStatus).optional(),
  priority: z.nativeEnum(TicketPriority).optional(),
  search: z.string().trim().optional(),
  sortBy: z.enum(['createdAt', 'title', 'priority', 'status']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const ticketIdSchema = z.object({
  id: z
    .string()
    .min(1, 'Ticket ID is required')
    .refine(isValidObjectId, 'Invalid ticket ID format'),
});

export type CreateTicketDto = z.infer<typeof createTicketSchema>;
export type UpdateTicketDto = z.infer<typeof updateTicketSchema>;
export type TicketQueryDto = z.infer<typeof ticketQuerySchema>;
