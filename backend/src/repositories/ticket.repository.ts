import { TicketDocument } from '../models/ticket.model';
import { TicketModel } from '../models/ticket.model';
import {
  CreateTicketInput,
  TicketQueryParams,
  UpdateTicketInput,
} from '../types/ticket.types';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export class TicketRepository {
  async findAll(query: TicketQueryParams): Promise<TicketDocument[]> {
    const filter: Record<string, unknown> = {};

    if (query.status) {
      filter.status = query.status;
    }

    if (query.priority) {
      filter.priority = query.priority;
    }

    if (query.search) {
      filter.title = { $regex: escapeRegex(query.search), $options: 'i' };
    }

    const sortField = query.sortBy ?? 'createdAt';
    const sortOrder = query.sortOrder === 'asc' ? 1 : -1;

    return TicketModel.find(filter).sort({ [sortField]: sortOrder }).exec();
  }

  async findById(id: string): Promise<TicketDocument | null> {
    return TicketModel.findById(id).exec();
  }

  async create(data: CreateTicketInput): Promise<TicketDocument> {
    const ticket = new TicketModel(data);
    return ticket.save();
  }

  async update(
    id: string,
    data: UpdateTicketInput,
  ): Promise<TicketDocument | null> {
    return TicketModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).exec();
  }

  async deleteAll(): Promise<void> {
    await TicketModel.deleteMany({}).exec();
  }

  async count(): Promise<number> {
    return TicketModel.countDocuments().exec();
  }
}

export const ticketRepository = new TicketRepository();
