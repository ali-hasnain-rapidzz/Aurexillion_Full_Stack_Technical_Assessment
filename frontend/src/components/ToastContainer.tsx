import { useToast } from '../context/ToastContext';

const toastStyles = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-blue-600 text-white',
};

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center justify-between gap-3 rounded-lg px-4 py-3 shadow-lg ${toastStyles[toast.type]}`}
          role="alert"
        >
          <span className="text-sm font-medium">{toast.message}</span>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="shrink-0 rounded p-1 hover:bg-white/20 transition-colors"
            aria-label="Dismiss notification"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
