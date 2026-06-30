import { useTickets } from '../hooks/useTickets';
import { KanbanBoard } from '../components/KanbanBoard';
import { Loading } from '../components/Loading';
import { ErrorState } from '../components/ErrorState';

export function KanbanPage() {
  const { data: tickets, isLoading, isError, error, refetch } = useTickets();

  if (isLoading) return <Loading />;
  if (isError) {
    return (
      <ErrorState
        message={error?.message ?? 'Failed to load tickets'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
        <p className="text-sm text-gray-500 mt-1">
          Drag tickets between columns to update their status
        </p>
      </div>

      <KanbanBoard tickets={tickets ?? []} />
    </div>
  );
}
