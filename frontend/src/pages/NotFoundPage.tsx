import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page not found</h2>
      <p className="text-gray-500 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
      >
        Back to Tickets
      </Link>
    </div>
  );
}
