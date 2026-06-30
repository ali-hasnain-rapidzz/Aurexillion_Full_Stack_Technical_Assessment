import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { TicketForm } from '../components/TicketForm';
import { ToastProvider } from '../context/ToastContext';

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>,
  );
}

describe('TicketForm', () => {
  it('displays validation errors for invalid input', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    renderWithProviders(<TicketForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole('button', { name: /create ticket/i }));

    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument();
    });

    expect(screen.getByText('Description is required')).toBeInTheDocument();
    expect(screen.getByText('Customer name is required')).toBeInTheDocument();
    expect(screen.getByText('Customer email is required')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('displays email validation error for invalid email', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    renderWithProviders(<TicketForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/title/i), 'Test ticket');
    await user.type(screen.getByLabelText(/description/i), 'Test description');
    await user.type(screen.getByLabelText(/customer name/i), 'John Doe');
    await user.type(screen.getByLabelText(/customer email/i), 'invalid-email');
    await user.click(screen.getByRole('button', { name: /create ticket/i }));

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
