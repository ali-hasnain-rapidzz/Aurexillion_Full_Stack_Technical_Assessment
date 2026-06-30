import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { ToastContainer } from './components/ToastContainer';
import { TicketListPage } from './pages/TicketListPage';
import { TicketDetailsPage } from './pages/TicketDetailsPage';
import { CreateTicketPage } from './pages/CreateTicketPage';
import { KanbanPage } from './pages/KanbanPage';
import { NotFoundPage } from './pages/NotFoundPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<TicketListPage />} />
                <Route path="/tickets/:id" element={<TicketDetailsPage />} />
                <Route path="/create" element={<CreateTicketPage />} />
                <Route path="/board" element={<KanbanPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <ToastContainer />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
