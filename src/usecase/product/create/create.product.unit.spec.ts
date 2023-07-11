import CreateProductUseCase from './create.product.usecase';
import Product from '../../../domain/product/entity/product';

const product = new Product('123', 'Produto1', 10);
const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test create product use case', () => {
  it('should create a customer', async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: 'Produto1',
      price: 10,
    };

    const output = {
      id: expect.any(String),
      name: 'Produto1',
      price: 10,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it('should not create a product', async () => {
    const productRepository = MockRepository();

    productRepository.create.mockImplementation(() => {
      throw new Error('product already exists');
    });

    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: 'Produto1',
      price: 10,
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow('product already exists');
  });
});
