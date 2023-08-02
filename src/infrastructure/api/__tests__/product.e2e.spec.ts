import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should list all product', async () => {
    const response1 = await request(app).post('/product').send({
      name: 'Product 1',
      price: 10,
    });
    expect(response1.status).toBe(200);
    const response2 = await request(app).post('/product').send({
      name: 'Product 2',
      price: 20,
    });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get('/product').send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.length).toBe(2);

    const product = listResponse.body[0];
    expect(product.name).toBe('Product 1');
    expect(product.price).toBe(10);

    const secondProduct = listResponse.body[1];
    expect(secondProduct.name).toBe('Product 2');
    expect(secondProduct.price).toBe(20);
  });

  it('should not create a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Product 1',
    });
    expect(response.status).toBe(500);
  });

  it('should create a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Product 1',
      price: 10,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Product 1');
    expect(response.body.id).toBeDefined();
    expect(response.body.price).toBe(10);
  });
});
