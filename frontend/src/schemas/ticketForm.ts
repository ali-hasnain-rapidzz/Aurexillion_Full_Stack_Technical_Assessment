import { z } from 'zod';
import { TicketPriority } from '../types/ticket';

export const ticketFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title cannot exceed 200 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(2000, 'Description cannot exceed 2000 characters'),
  customerName: z
    .string()
    .min(1, 'Customer name is required')
    .max(100, 'Customer name cannot exceed 100 characters'),
  customerEmail: z
    .string()
    .min(1, 'Customer email is required')
    .email('Please enter a valid email address'),
  priority: z.enum([
    TicketPriority.LOW,
    TicketPriority.MEDIUM,
    TicketPriority.HIGH,
  ], {
    message: 'Priority is required',
  }),
});

export type TicketFormData = z.infer<typeof ticketFormSchema>;
