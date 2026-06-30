import { Link } from 'react-router-dom';
import type { Ticket } from '../types/ticket';
import { TicketStatus } from '../types/ticket';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { formatDate } from '../utils/format';

interface TicketTableProps {
  tickets: Ticket[];
  onStatusChange: (ticketId: string, status: TicketStatus) => void;
  isUpdating?: boolean;
}

const statusOptions = [
  { value: TicketStatus.OPEN, label: 'Open' },
  { value: TicketStatus.IN_PROGRESS, label: 'In Progress' },
  { value: TicketStatus.RESOLVED, label: 'Resolved' },
];

export function TicketTable({ tickets, onStatusChange, isUpdating }: TicketTableProps) {
  return (
    <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <Link
                  to={`/tickets/${ticket._id}`}
                  className="text-sm font-medium text-primary-600 hover:text-primary-800"
                >
                  {ticket.title}
                </Link>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{ticket.customerName}</td>
              <td className="px-6 py-4">
                <StatusBadge status={ticket.status} />
              </td>
              <td className="px-6 py-4">
                <PriorityBadge priority={ticket.priority} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {formatDate(ticket.createdAt)}
              </td>
              <td className="px-6 py-4">
                <select
                  value={ticket.status}
                  onChange={(e) => onStatusChange(ticket._id, e.target.value as TicketStatus)}
                  disabled={isUpdating}
                  aria-label={`Update status for ${ticket.title}`}
                  className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
