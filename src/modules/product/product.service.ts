import { inject, injectable } from 'inversify';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';

import { AppComponent } from '../../types/app-component.enum.js';
import type { LoggerInterface } from '../../core/logger/logger.interface.js';
import type { ProductServiceInterface } from './product-service.interface.js';
import { ProductEntity } from './product.entity.js';
import CreateProductDto from './dto/create-product.dto.js';
import UpdateProductDto from './dto/update-product.dto.js';
import type { MongoId } from '../../types/mongo-id.type.js';
import { SortType } from '../../types/sort-type.enum.js';
import { COUNT_CONSTANTS } from './product.const.js';

@injectable()
export default class ProductService implements ProductServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ProductModel) private readonly productModel: ModelType<ProductEntity>
  ) {}

  public async exists(documentId: string): Promise<boolean> {
    return this.productModel.exists({ _id: documentId }).then((v) => v !== null);
  }

  public async update(productId: MongoId, dto: UpdateProductDto): Promise<DocumentType<ProductEntity> | null> {
    return this.productModel
      .findByIdAndUpdate(productId, dto, {new: true})
      .exec();
  }

  public async delete(productId: MongoId): Promise<DocumentType<ProductEntity> | null> {
    return this.productModel
      .findByIdAndDelete(productId)
      .exec();
  }

  private async findProducts(query: object, types?: string[], limit?: number): Promise<DocumentType<ProductEntity>[]> {
    const productLimit = limit || COUNT_CONSTANTS.DEFAULT_PRODUCTS_COUNT;
    let queryWithProductType = query;

    if (types && types.length > 0) {
      queryWithProductType = { ...query, type: { $in: types } };
    }

    return this.productModel
      .find(queryWithProductType)
      .sort({ createdAt: SortType.Up })
      .limit(productLimit)
      .exec();
  }

  public async find(types?: string[], limit?: number): Promise<DocumentType<ProductEntity>[]> {
    return this.findProducts({}, types, limit);
  }

  public async create(dto: CreateProductDto): Promise<DocumentType<ProductEntity>> {
    const result = await this.productModel.create(dto);
    this.logger.info(`New product created: ${dto.title}`);
    return result;
  }

  public async getProductDetails(productId: MongoId): Promise<DocumentType<ProductEntity> | null> {
    return this.productModel
      .findById(productId)
      .exec();
  }
}
