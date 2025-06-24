import request from 'supertest';
import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { schema } from '../src/schema';

const yoga = createYoga({ schema });
const server = createServer(yoga);

describe('GraphQL API', () => {
  it('returns correct Fibonacci number for n = 10', async () => {
    const response = await request(server)
      .post('/graphql')
      .send({
        query: `query { fibonacci(n: 10) }`
      });

    expect(response.status).toBe(200);
    expect(response.body.data.fibonacci).toBe(55);
  });

  it('returns error for negative input', async () => {
    const response = await request(server)
      .post('/graphql')
      .send({
        query: `query { fibonacci(n: -5) }`
      });

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toMatch(/Negative numbers/);
  });
});
