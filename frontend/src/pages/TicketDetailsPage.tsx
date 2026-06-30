import { useParams, Link } from 'react-router-dom';
import { TicketStatus } from '../types/ticket';
import { useTicket, useUpdateTicket } from '../hooks/useTickets';
import { useToast } from '../context/ToastContext';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { Loading } from '../components/Loading';
import { ErrorState } from '../components/ErrorState';
import { formatDate } from '../utils/format';

const statusOptions = [
  { value: TicketStatus.OPEN, label: 'Open' },
  { value: TicketStatus.IN_PROGRESS, label: 'In Progress' },
  { value: TicketStatus.RESOLVED, label: 'Resolved' },
];

export function TicketDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: ticket, isLoading, isError, error, refetch } = useTicket(id ?? '');
  const updateTicket = useUpdateTicket();
  const { showToast } = useToast();

  const handleStatusChange = async (status: TicketStatus) => {
    if (!id) return;
    try {
      await updateTicket.mutateAsync({ id, data: { status } });
      showToast('Ticket status updated successfully', 'success');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update status';
      showToast(message, 'error');
    }
  };

  if (isLoading) return <Loading />;
  if (isError || !ticket) {
    return (
      <ErrorState
        message={error?.message ?? 'Ticket not found'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to tickets
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{ticket.title}</h1>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={ticket.status} />
                <PriorityBadge priority={ticket.priority} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="status-select" className="text-xs font-medium text-gray-500 uppercase">
                Update Status
              </label>
              <select
                id="status-select"
                value={ticket.status}
                onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
                disabled={updateTicket.isPending}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
              Description
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {ticket.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                Customer
              </h2>
              <p className="font-medium text-gray-900">{ticket.customerName}</p>
              <a
                href={`mailto:${ticket.customerEmail}`}
                className="text-sm text-primary-600 hover:text-primary-800"
              >
                {ticket.customerEmail}
              </a>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                Dates
              </h2>
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between sm:block">
                  <dt className="text-gray-500">Created</dt>
                  <dd className="text-gray-900">{formatDate(ticket.createdAt)}</dd>
                </div>
                <div className="flex justify-between sm:block">
                  <dt className="text-gray-500">Updated</dt>
                  <dd className="text-gray-900">{formatDate(ticket.updatedAt)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
