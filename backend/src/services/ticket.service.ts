import { ticketRepository } from '../repositories/ticket.repository';
import { AppError } from '../middleware/errorHandler';
import {
  CreateTicketInput,
  Ticket,
  TicketQueryParams,
  TicketStatus,
  UpdateTicketInput,
} from '../types/ticket.types';
import { TicketDocument } from '../models/ticket.model';

function formatTicket(ticket: TicketDocument): Ticket {
  return {
    _id: ticket._id.toString(),
    title: ticket.title,
    description: ticket.description,
    customerName: ticket.customerName,
    customerEmail: ticket.customerEmail,
    status: ticket.status,
    priority: ticket.priority,
    createdAt: ticket.createdAt.toISOString(),
    updatedAt: ticket.updatedAt.toISOString(),
  };
}

export class TicketService {
  async getAllTickets(query: TicketQueryParams): Promise<Ticket[]> {
    const tickets = await ticketRepository.findAll(query);
    return tickets.map(formatTicket);
  }

  async getTicketById(id: string): Promise<Ticket> {
    const ticket = await ticketRepository.findById(id);
    if (!ticket) {
      throw new AppError('Ticket not found', 404);
    }
    return formatTicket(ticket);
  }

  async createTicket(data: CreateTicketInput): Promise<Ticket> {
    const ticket = await ticketRepository.create({
      ...data,
    });
    return formatTicket(ticket);
  }

  async updateTicket(id: string, data: UpdateTicketInput): Promise<Ticket> {
    const ticket = await ticketRepository.update(id, data);
    if (!ticket) {
      throw new AppError('Ticket not found', 404);
    }
    return formatTicket(ticket);
  }

  async updateTicketStatus(id: string, status: TicketStatus): Promise<Ticket> {
    return this.updateTicket(id, { status });
  }
}

export const ticketService = new TicketService();
