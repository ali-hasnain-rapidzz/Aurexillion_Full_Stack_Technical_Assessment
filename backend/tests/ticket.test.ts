import { beforeAll, afterAll, afterEach, describe, it, expect } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createApp } from '../src/app';
import { TicketPriority, TicketStatus } from '../src/types/ticket.types';

let mongoServer: MongoMemoryServer | undefined;
const app = createApp();

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe('Ticket API', () => {
  const validTicket = {
    title: 'Test ticket',
    description: 'Test description for the ticket',
    customerName: 'Test Customer',
    customerEmail: 'test@example.com',
    priority: TicketPriority.MEDIUM,
  };

  describe('POST /api/tickets', () => {
    it('should reject invalid ticket without title', async () => {
      const response = await request(app)
        .post('/api/tickets')
        .send({
          description: 'Missing title',
          customerName: 'Test',
          customerEmail: 'test@example.com',
          priority: TicketPriority.LOW,
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
    });

    it('should successfully create a valid ticket', async () => {
      const response = await request(app)
        .post('/api/tickets')
        .send(validTicket);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(validTicket.title);
      expect(response.body.data.status).toBe(TicketStatus.OPEN);
      expect(response.body.data._id).toBeDefined();
    });
  });

  describe('GET /api/tickets/:id', () => {
    it('should return 404 for a non-existent ticket', async () => {
      const response = await request(app).get(
        '/api/tickets/507f1f77bcf86cd799439011',
      );

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Ticket not found');
    });

    it('should return 400 for an invalid ticket ID format', async () => {
      const response = await request(app).get('/api/tickets/not-a-valid-id');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
    });
  });

  describe('PATCH /api/tickets/:id', () => {
    it('should successfully update ticket status', async () => {
      const createResponse = await request(app)
        .post('/api/tickets')
        .send(validTicket);

      const ticketId = createResponse.body.data._id;

      const updateResponse = await request(app)
        .patch(`/api/tickets/${ticketId}`)
        .send({ status: TicketStatus.IN_PROGRESS });

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.success).toBe(true);
      expect(updateResponse.body.data.status).toBe(TicketStatus.IN_PROGRESS);
    });
  });
});
