import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Link } from 'react-router-dom';
import type { Ticket } from '../types/ticket';
import { PriorityBadge } from './PriorityBadge';

interface KanbanCardProps {
  ticket: Ticket;
}

export function KanbanCard({ ticket }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: ticket._id, data: { ticket } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <Link
          to={`/tickets/${ticket._id}`}
          className="text-sm font-medium text-primary-600 hover:text-primary-800 line-clamp-2"
          onClick={(e) => e.stopPropagation()}
        >
          {ticket.title}
        </Link>
        <PriorityBadge priority={ticket.priority} />
      </div>
      <p className="text-xs text-gray-500 truncate">{ticket.customerName}</p>
    </div>
  );
}
