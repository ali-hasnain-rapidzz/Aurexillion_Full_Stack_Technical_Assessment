import apiClient from './client';
import type {
  ApiResponse,
  CreateTicketInput,
  Ticket,
  TicketQueryParams,
  UpdateTicketInput,
} from '../types/ticket';

export const ticketApi = {
  getAll: async (params?: TicketQueryParams): Promise<Ticket[]> => {
    const response = await apiClient.get<ApiResponse<Ticket[]>>('/tickets', {
      params,
    });
    return response.data.data;
  },

  getById: async (id: string): Promise<Ticket> => {
    const response = await apiClient.get<ApiResponse<Ticket>>(`/tickets/${id}`);
    return response.data.data;
  },

  create: async (data: CreateTicketInput): Promise<Ticket> => {
    const response = await apiClient.post<ApiResponse<Ticket>>('/tickets', data);
    return response.data.data;
  },

  update: async (id: string, data: UpdateTicketInput): Promise<Ticket> => {
    const response = await apiClient.patch<ApiResponse<Ticket>>(`/tickets/${id}`, data);
    return response.data.data;
  },
};
