import { Request, Response } from 'express';
import { ticketService } from '../services/ticket.service';
import { ApiResponse } from '../types/ticket.types';
import {
  CreateTicketDto,
  TicketQueryDto,
  UpdateTicketDto,
} from '../validators/ticket.validator';

export class TicketController {
  async getAll(req: Request, res: Response): Promise<void> {
    const query = req.query as unknown as TicketQueryDto;
    const tickets = await ticketService.getAllTickets(query);

    const response: ApiResponse<typeof tickets> = {
      success: true,
      data: tickets,
    };

    res.status(200).json(response);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    const ticket = await ticketService.getTicketById(id);

    const response: ApiResponse<typeof ticket> = {
      success: true,
      data: ticket,
    };

    res.status(200).json(response);
  }

  async create(req: Request, res: Response): Promise<void> {
    const data = req.body as CreateTicketDto;
    const ticket = await ticketService.createTicket(data);

    const response: ApiResponse<typeof ticket> = {
      success: true,
      data: ticket,
      message: 'Ticket created successfully',
    };

    res.status(201).json(response);
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    const data = req.body as UpdateTicketDto;
    const ticket = await ticketService.updateTicket(id, data);

    const response: ApiResponse<typeof ticket> = {
      success: true,
      data: ticket,
      message: 'Ticket updated successfully',
    };

    res.status(200).json(response);
  }
}

export const ticketController = new TicketController();
