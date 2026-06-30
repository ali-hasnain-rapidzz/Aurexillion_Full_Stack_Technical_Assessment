import { Link } from 'react-router-dom';
import type { Ticket } from '../types/ticket';
import { TicketStatus } from '../types/ticket';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { formatDate } from '../utils/format';

interface TicketCardProps {
  ticket: Ticket;
  onStatusChange: (ticketId: string, status: TicketStatus) => void;
  isUpdating?: boolean;
}

const statusOptions = [
  { value: TicketStatus.OPEN, label: 'Open' },
  { value: TicketStatus.IN_PROGRESS, label: 'In Progress' },
  { value: TicketStatus.RESOLVED, label: 'Resolved' },
];

export function TicketCard({ ticket, onStatusChange, isUpdating }: TicketCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        <Link
          to={`/tickets/${ticket._id}`}
          className="text-base font-semibold text-primary-600 hover:text-primary-800 line-clamp-2"
        >
          {ticket.title}
        </Link>
        <PriorityBadge priority={ticket.priority} />
      </div>

      <p className="text-sm text-gray-600 mb-3">{ticket.customerName}</p>

      <div className="flex items-center justify-between gap-2">
        <StatusBadge status={ticket.status} />
        <span className="text-xs text-gray-400">{formatDate(ticket.createdAt)}</span>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <label htmlFor={`status-${ticket._id}`} className="sr-only">
          Update status
        </label>
        <select
          id={`status-${ticket._id}`}
          value={ticket.status}
          onChange={(e) => onStatusChange(ticket._id, e.target.value as TicketStatus)}
          disabled={isUpdating}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
