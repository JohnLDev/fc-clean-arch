import CreateProductUseCase from './update.product.usecase';
import Product from '../../../domain/product/entity/product';
import UpdateProductUseCase from './update.product.usecase';

const product = new Product('123', 'Produto1', 10);
const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test update product use case', () => {
  it('should update a customer', async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: '123',
      name: 'Produto1Updated',
      price: 20,
    };

    const output = {
      id: '123',
      name: 'Produto1Updated',
      price: 20,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it('should not update a product', async () => {
    const productRepository = MockRepository();

    productRepository.find.mockImplementation(() => {
      throw new Error('product not exists');
    });

    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: '123',
      name: 'Produto1',
      price: 10,
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow('product not exists');
  });
});
