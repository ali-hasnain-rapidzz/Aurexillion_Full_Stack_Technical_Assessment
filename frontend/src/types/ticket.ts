export const TicketStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
} as const;

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];

export const TicketPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const;

export type TicketPriority = (typeof TicketPriority)[keyof typeof TicketPriority];

export interface Ticket {
  _id: string;
  title: string;
  description: string;
  customerName: string;
  customerEmail: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketInput {
  title: string;
  description: string;
  customerName: string;
  customerEmail: string;
  priority: TicketPriority;
}

export interface UpdateTicketInput {
  title?: string;
  description?: string;
  customerName?: string;
  customerEmail?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
}

export interface TicketQueryParams {
  status?: TicketStatus;
  priority?: TicketPriority;
  search?: string;
  sortBy?: 'createdAt' | 'title' | 'priority' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
