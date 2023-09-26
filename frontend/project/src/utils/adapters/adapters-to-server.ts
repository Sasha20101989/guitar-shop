import CreateProductDto from '../../dto/create-product.dto';
import UpdateProductDto from '../../dto/update-product.dto';
import { Product } from '../../types/product';
import { ProductData } from '../../types/product-data.js';

export const adaptEditProductToServer = (product: Product): UpdateProductDto => {
  const imagePathParts = product.image.split('/');
  const imageNameWithExtension = imagePathParts[imagePathParts.length - 1];

  return {
    title: product.title,
    description: product.description,
    createdAt: new Date(product.createdAt),
    image: imageNameWithExtension,
    type: product.type,
    article: product.article,
    numberOfStrings: product.numberOfStrings,
    price: product.price,
  };
};

export const adaptAddProductToServer = (product: ProductData): CreateProductDto => {
  const imagePathParts = product.image.split('/');
  const imageNameWithExtension = imagePathParts[imagePathParts.length - 1];

  return {
    title: product.title,
    description: product.description,
    createdAt: new Date(product.createdAt),
    image: imageNameWithExtension,
    type: product.type,
    article: product.article,
    numberOfStrings: product.numberOfStrings,
    price: product.price,
  };
};

export const adaptImageToServer =
  (file: string) => {
    const formData = new FormData();
    formData.set('image', file);

    return formData;
  };
