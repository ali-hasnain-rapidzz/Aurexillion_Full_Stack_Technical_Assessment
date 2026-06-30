export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
}

export enum TicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

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
  status?: TicketStatus;
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
