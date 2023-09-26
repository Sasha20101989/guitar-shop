import {DocumentType} from '@typegoose/typegoose';
import CreateProductDto from './dto/create-product.dto.js';
import UpdateProductDto from './dto/update-product.dto.js';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';
import { ProductEntity } from './product.entity.js';
import { MongoId } from '../../types/mongo-id.type.js';

export interface ProductServiceInterface extends DocumentExistsInterface{
  create(dto: CreateProductDto): Promise<DocumentType<ProductEntity>>;
  update(productId: MongoId, dto: UpdateProductDto): Promise<DocumentType<ProductEntity> | null>;
  delete(productId: MongoId): Promise<DocumentType<ProductEntity> | null>;
  find(types?: string[], limit?: number): Promise<DocumentType<ProductEntity>[]>;
  getProductDetails(productId: MongoId): Promise<DocumentType<ProductEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
