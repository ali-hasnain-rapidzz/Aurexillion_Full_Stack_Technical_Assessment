import { FilterDropdown } from './FilterDropdown';

interface SortDropdownProps {
  sortBy: string;
  sortOrder: string;
  onSortByChange: (value: string) => void;
  onSortOrderChange: (value: string) => void;
}

const sortByOptions = [
  { value: 'createdAt', label: 'Created Date' },
  { value: 'title', label: 'Title' },
  { value: 'priority', label: 'Priority' },
  { value: 'status', label: 'Status' },
];

const sortOrderOptions = [
  { value: 'desc', label: 'Descending' },
  { value: 'asc', label: 'Ascending' },
];

export function SortDropdown({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: SortDropdownProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <FilterDropdown
        label="Sort By"
        value={sortBy}
        options={sortByOptions}
        onChange={onSortByChange}
      />
      <FilterDropdown
        label="Order"
        value={sortOrder}
        options={sortOrderOptions}
        onChange={onSortOrderChange}
      />
    </div>
  );
}
