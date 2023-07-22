import Product from '../../../domain/product/entity/product';
import ProductRepository from '../../product/repository/sequelize/product.repository';
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
    const product1 = new Product('1', 'Product 1', 10);
    const product2 = new Product('2', 'Product 2', 20);

    const productRepository = new ProductRepository();
    await productRepository.create(product1);
    await productRepository.create(product2);

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
});
