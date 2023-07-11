import ListProductUseCase from './list.product.usecase';
import Product from '../../../domain/product/entity/product';

const product = new Product('123', 'Produto1', 10);
const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest
      .fn()
      .mockReturnValue(Promise.resolve([product, product, product])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test list product use case', () => {
  it('should list a product', async () => {
    const productRepository = MockRepository();
    const usecase = new ListProductUseCase(productRepository);

    const result = await usecase.execute({});

    expect(result).toHaveLength(3);
    expect(result).toBeInstanceOf(Array);
    expect(result).toEqual([product, product, product]);
  });

  it('should not list products', async () => {
    const productRepository = MockRepository();

    productRepository.findAll.mockImplementation(() => {
      throw new Error('unable to list all products');
    });

    const usecase = new ListProductUseCase(productRepository);

    expect(() => {
      return usecase.execute({});
    }).rejects.toThrow('unable to list all products');
  });
});
