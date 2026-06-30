import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TicketPriority } from '../types/ticket';
import { ticketFormSchema, type TicketFormData } from '../schemas/ticketForm';

interface TicketFormProps {
  onSubmit: (data: TicketFormData) => void;
  isSubmitting?: boolean;
  defaultValues?: Partial<TicketFormData>;
  submitLabel?: string;
}

const priorityOptions = [
  { value: TicketPriority.LOW, label: 'Low' },
  { value: TicketPriority.MEDIUM, label: 'Medium' },
  { value: TicketPriority.HIGH, label: 'High' },
];

export function TicketForm({
  onSubmit,
  isSubmitting = false,
  defaultValues,
  submitLabel = 'Create Ticket',
}: TicketFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      title: '',
      description: '',
      customerName: '',
      customerEmail: '',
      priority: TicketPriority.MEDIUM,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          placeholder="Brief summary of the issue"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600" role="alert">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          rows={4}
          {...register('description')}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 resize-y"
          placeholder="Detailed description of the issue"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600" role="alert">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name <span className="text-red-500">*</span>
          </label>
          <input
            id="customerName"
            type="text"
            {...register('customerName')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="John Doe"
          />
          {errors.customerName && (
            <p className="mt-1 text-sm text-red-600" role="alert">{errors.customerName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Customer Email <span className="text-red-500">*</span>
          </label>
          <input
            id="customerEmail"
            type="email"
            {...register('customerEmail')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="john@example.com"
          />
          {errors.customerEmail && (
            <p className="mt-1 text-sm text-red-600" role="alert">{errors.customerEmail.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
          Priority <span className="text-red-500">*</span>
        </label>
        <select
          id="priority"
          {...register('priority')}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          {priorityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.priority && (
          <p className="mt-1 text-sm text-red-600" role="alert">{errors.priority.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
