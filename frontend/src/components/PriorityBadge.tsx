import { TicketPriority } from '../types/ticket';
import { formatPriorityLabel } from '../utils/format';

const priorityStyles: Record<TicketPriority, string> = {
  [TicketPriority.LOW]: 'bg-gray-100 text-gray-700',
  [TicketPriority.MEDIUM]: 'bg-orange-100 text-orange-800',
  [TicketPriority.HIGH]: 'bg-red-100 text-red-800',
};

interface PriorityBadgeProps {
  priority: TicketPriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityStyles[priority]}`}
    >
      {formatPriorityLabel(priority)}
    </span>
  );
}
