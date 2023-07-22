import { Sequelize } from 'sequelize-typescript';
import ListProductUseCase from './list.product.usecase';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import Product from '../../../domain/product/entity/product';

describe('Test find product use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should list products', async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const product = new Product('123', 'product1', 10);
    const product2 = new Product('1233', 'product2', 20);

    await productRepository.create(product);
    await productRepository.create(product2);

    const input = {};

    const output = [product, product2].map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
    }));

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
