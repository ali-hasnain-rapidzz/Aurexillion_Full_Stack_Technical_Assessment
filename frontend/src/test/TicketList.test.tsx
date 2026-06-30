import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { TicketListPage } from '../pages/TicketListPage';
import { ToastProvider } from '../context/ToastContext';
import { TicketStatus, TicketPriority } from '../types/ticket';
import * as ticketApi from '../api/tickets';

vi.mock('../api/tickets', () => ({
  ticketApi: {
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
}));

const mockTickets = [
  {
    _id: '1',
    title: 'Payment issue',
    description: 'Cannot complete payment',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    status: TicketStatus.OPEN,
    priority: TicketPriority.HIGH,
    createdAt: '2026-06-18T10:30:00Z',
    updatedAt: '2026-06-18T10:30:00Z',
  },
  {
    _id: '2',
    title: 'Login problem',
    description: 'Cannot log in',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    status: TicketStatus.IN_PROGRESS,
    priority: TicketPriority.MEDIUM,
    createdAt: '2026-06-17T08:00:00Z',
    updatedAt: '2026-06-17T08:00:00Z',
  },
];

function renderTicketList() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <TicketListPage />
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>,
  );
}

describe('TicketListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders ticket list correctly', async () => {
    vi.mocked(ticketApi.ticketApi.getAll).mockResolvedValue(mockTickets);

    renderTicketList();

    await waitFor(() => {
      expect(screen.getAllByText('Payment issue').length).toBeGreaterThan(0);
    });

    expect(screen.getAllByText('Login problem').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Jane Smith').length).toBeGreaterThan(0);
    expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0);
    expect(screen.getByText(/2 tickets found/i)).toBeInTheDocument();
  });
});
