import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import type { Ticket } from '../types/ticket';
import { TicketStatus } from '../types/ticket';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';
import { useUpdateTicket } from '../hooks/useTickets';
import { useToast } from '../context/ToastContext';

interface KanbanBoardProps {
  tickets: Ticket[];
}

const columns = [
  TicketStatus.OPEN,
  TicketStatus.IN_PROGRESS,
  TicketStatus.RESOLVED,
];

export function KanbanBoard({ tickets }: KanbanBoardProps) {
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const updateTicket = useUpdateTicket();
  const { showToast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const getTicketsByStatus = (status: TicketStatus) =>
    tickets.filter((ticket) => ticket.status === status);

  const handleDragStart = (event: DragStartEvent) => {
    const ticket = tickets.find((t) => t._id === event.active.id);
    if (ticket) setActiveTicket(ticket);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveTicket(null);

    const { active, over } = event;
    if (!over) return;

    const ticketId = active.id as string;
    const ticket = tickets.find((t) => t._id === ticketId);
    if (!ticket) return;

    const newStatus = Object.values(TicketStatus).includes(over.id as TicketStatus)
      ? (over.id as TicketStatus)
      : tickets.find((t) => t._id === over.id)?.status;

    if (!newStatus || newStatus === ticket.status) return;

    try {
      await updateTicket.mutateAsync({
        id: ticketId,
        data: { status: newStatus },
      });
      showToast('Ticket status updated successfully', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update status';
      showToast(message, 'error');
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tickets={getTicketsByStatus(status)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTicket ? <KanbanCard ticket={activeTicket} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
