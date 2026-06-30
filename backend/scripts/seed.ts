import { connectDatabase, disconnectDatabase } from '../src/config/database';
import { ticketRepository } from '../src/repositories/ticket.repository';
import { TicketPriority, TicketStatus } from '../src/types/ticket.types';

const sampleTickets = [
  {
    title: 'Unable to complete payment',
    description:
      'The customer receives an error after submitting the payment form. Error code PAY-403 appears on screen.',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    priority: TicketPriority.HIGH,
    status: TicketStatus.OPEN,
  },
  {
    title: 'Account login issues',
    description:
      'Customer cannot log in after password reset. They receive "Invalid credentials" message.',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    priority: TicketPriority.MEDIUM,
    status: TicketStatus.IN_PROGRESS,
  },
  {
    title: 'Feature request: Dark mode',
    description:
      'Customer would like a dark mode option for the dashboard to reduce eye strain during night use.',
    customerName: 'Alice Johnson',
    customerEmail: 'alice@example.com',
    priority: TicketPriority.LOW,
    status: TicketStatus.RESOLVED,
  },
  {
    title: 'Billing discrepancy on invoice',
    description:
      'Customer was charged twice for the same subscription period. Needs refund for duplicate charge.',
    customerName: 'Robert Brown',
    customerEmail: 'robert@example.com',
    priority: TicketPriority.HIGH,
    status: TicketStatus.IN_PROGRESS,
  },
  {
    title: 'Mobile app crashes on startup',
    description:
      'App crashes immediately after splash screen on iOS 17. Customer has iPhone 14 Pro.',
    customerName: 'Emily Davis',
    customerEmail: 'emily@example.com',
    priority: TicketPriority.HIGH,
    status: TicketStatus.OPEN,
  },
  {
    title: 'Export data to CSV not working',
    description:
      'When clicking export button, nothing happens. No download starts and no error message shown.',
    customerName: 'Michael Wilson',
    customerEmail: 'michael@example.com',
    priority: TicketPriority.MEDIUM,
    status: TicketStatus.RESOLVED,
  },
  {
    title: 'Notification emails not received',
    description:
      'Customer has not received any notification emails for the past week despite having notifications enabled.',
    customerName: 'Sarah Martinez',
    customerEmail: 'sarah@example.com',
    priority: TicketPriority.MEDIUM,
    status: TicketStatus.OPEN,
  },
  {
    title: 'Request for API documentation',
    description:
      'Customer needs updated API documentation for the v2 endpoints to integrate with their system.',
    customerName: 'David Lee',
    customerEmail: 'david@example.com',
    priority: TicketPriority.LOW,
    status: TicketStatus.IN_PROGRESS,
  },
];

async function seed(): Promise<void> {
  try {
    await connectDatabase();

    const existingCount = await ticketRepository.count();
    if (existingCount > 0) {
      console.log(`Database already has ${existingCount} tickets. Clearing and re-seeding...`);
      await ticketRepository.deleteAll();
    }

    for (const ticket of sampleTickets) {
      await ticketRepository.create(ticket);
    }

    console.log(`Successfully seeded ${sampleTickets.length} tickets`);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await disconnectDatabase();
    process.exit(0);
  }
}

seed();
