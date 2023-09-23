import { Product } from '../../types/product.type.js';

export function createProduct(productData: string): Product {
  const [
    title,
    description,
    createdAt,
    image,
    type,
    article,
    numberOfStrings,
    price
  ] = productData.replace('\n', '').split('\t');

  return {
    title,
    description,
    createdAt: new Date(createdAt),
    image,
    type,
    article,
    numberOfStrings,
    price: parseInt(price, 10)
  } as Product;
}
