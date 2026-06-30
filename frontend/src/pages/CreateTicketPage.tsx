import { useNavigate } from 'react-router-dom';
import { useCreateTicket } from '../hooks/useTickets';
import { useToast } from '../context/ToastContext';
import { TicketForm } from '../components/TicketForm';
import type { TicketFormData } from '../schemas/ticketForm';

export function CreateTicketPage() {
  const navigate = useNavigate();
  const createTicket = useCreateTicket();
  const { showToast } = useToast();

  const handleSubmit = async (data: TicketFormData) => {
    try {
      const ticket = await createTicket.mutateAsync(data);
      showToast('Ticket created successfully', 'success');
      navigate(`/tickets/${ticket._id}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create ticket';
      showToast(message, 'error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Ticket</h1>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the details below to create a new support ticket.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <TicketForm
          onSubmit={handleSubmit}
          isSubmitting={createTicket.isPending}
        />
      </div>
    </div>
  );
}
