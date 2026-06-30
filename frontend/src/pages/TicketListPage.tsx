import { useState } from 'react';
import { TicketPriority, TicketStatus } from '../types/ticket';
import { useTickets, useUpdateTicket } from '../hooks/useTickets';
import { useDebounce } from '../hooks/useDebounce';
import { useToast } from '../context/ToastContext';
import { TicketTable } from '../components/TicketTable';
import { TicketCard } from '../components/TicketCard';
import { FilterDropdown } from '../components/FilterDropdown';
import { SearchBar } from '../components/SearchBar';
import { SortDropdown } from '../components/SortDropdown';
import { Loading } from '../components/Loading';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';

const statusFilterOptions = [
  { value: '', label: 'All Statuses' },
  { value: TicketStatus.OPEN, label: 'Open' },
  { value: TicketStatus.IN_PROGRESS, label: 'In Progress' },
  { value: TicketStatus.RESOLVED, label: 'Resolved' },
];

const priorityFilterOptions = [
  { value: '', label: 'All Priorities' },
  { value: TicketPriority.LOW, label: 'Low' },
  { value: TicketPriority.MEDIUM, label: 'Medium' },
  { value: TicketPriority.HIGH, label: 'High' },
];

export function TicketListPage() {
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const queryParams = {
    ...(statusFilter && { status: statusFilter as TicketStatus }),
    ...(priorityFilter && { priority: priorityFilter as TicketPriority }),
    ...(debouncedSearch && { search: debouncedSearch }),
    sortBy: sortBy as 'createdAt' | 'title' | 'priority' | 'status',
    sortOrder: sortOrder as 'asc' | 'desc',
  };

  const { data: tickets, isLoading, isFetching, isError, error, refetch } = useTickets(queryParams);
  const updateTicket = useUpdateTicket();
  const { showToast } = useToast();

  const handleStatusChange = async (ticketId: string, status: TicketStatus) => {
    try {
      await updateTicket.mutateAsync({ id: ticketId, data: { status } });
      showToast('Ticket status updated successfully', 'success');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update status';
      showToast(message, 'error');
    }
  };

  const ticketList = tickets ?? [];
  const showInitialLoading = isLoading && tickets === undefined;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-sm text-gray-500 mt-1">
            {isFetching && !showInitialLoading ? 'Searching...' : (
              <>{ticketList.length} ticket{ticketList.length !== 1 ? 's' : ''} found</>
            )}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <FilterDropdown
            label="Status"
            value={statusFilter}
            options={statusFilterOptions}
            onChange={setStatusFilter}
          />
          <FilterDropdown
            label="Priority"
            value={priorityFilter}
            options={priorityFilterOptions}
            onChange={setPriorityFilter}
          />
          <SortDropdown
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortByChange={setSortBy}
            onSortOrderChange={setSortOrder}
          />
        </div>
      </div>

      {showInitialLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorState
          message={error?.message ?? 'Failed to load tickets'}
          onRetry={() => refetch()}
        />
      ) : ticketList.length === 0 ? (
        <EmptyState
          title={debouncedSearch ? 'No matching tickets' : 'No tickets found'}
          description={
            debouncedSearch
              ? `No tickets match "${debouncedSearch}". Try a different search term.`
              : 'There are no tickets matching your current filters.'
          }
        />
      ) : (
        <>
          <TicketTable
            tickets={ticketList}
            onStatusChange={handleStatusChange}
            isUpdating={updateTicket.isPending}
          />
          <div className="md:hidden grid grid-cols-1 gap-4">
            {ticketList.map((ticket) => (
              <TicketCard
                key={ticket._id}
                ticket={ticket}
                onStatusChange={handleStatusChange}
                isUpdating={updateTicket.isPending}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
