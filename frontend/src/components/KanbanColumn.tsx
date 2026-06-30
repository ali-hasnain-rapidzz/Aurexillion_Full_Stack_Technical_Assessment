import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Ticket } from '../types/ticket';
import { TicketStatus } from '../types/ticket';
import { KanbanCard } from './KanbanCard';
import { formatStatusLabel } from '../utils/format';

interface KanbanColumnProps {
  status: TicketStatus;
  tickets: Ticket[];
}

const columnStyles: Record<TicketStatus, string> = {
  [TicketStatus.OPEN]: 'border-blue-200 bg-blue-50/50',
  [TicketStatus.IN_PROGRESS]: 'border-yellow-200 bg-yellow-50/50',
  [TicketStatus.RESOLVED]: 'border-green-200 bg-green-50/50',
};

export function KanbanColumn({ status, tickets }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-xl border-2 min-h-[400px] ${columnStyles[status]} ${
        isOver ? 'ring-2 ring-primary-400 ring-offset-2' : ''
      }`}
    >
      <div className="p-4 border-b border-gray-200/60">
        <h3 className="font-semibold text-gray-900">{formatStatusLabel(status)}</h3>
        <span className="text-xs text-gray-500">{tickets.length} tickets</span>
      </div>

      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        <SortableContext items={tickets.map((t) => t._id)} strategy={verticalListSortingStrategy}>
          {tickets.map((ticket) => (
            <KanbanCard key={ticket._id} ticket={ticket} />
          ))}
        </SortableContext>

        {tickets.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-8">Drop tickets here</p>
        )}
      </div>
    </div>
  );
}
