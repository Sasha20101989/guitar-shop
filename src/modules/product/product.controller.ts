import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import * as core from 'express-serve-static-core';
import { ParamsDictionary } from 'express-serve-static-core';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { ProductServiceInterface } from './product-service.interface.js';
import { ConfigInterface } from '../../core/config/config.interface.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { ParamsGetProduct } from '../../types/params-get-product.type.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import UpdateProductDto from './dto/update-product.dto.js';
import CreateProductDto from './dto/create-product.dto.js';
import { fillDTO } from '../../core/helpers/index.js';
import ProductRdo from './rdo/product.rdo.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { UploadFileMiddleware } from '../../core/middlewares/upload-file.middleware.js';
import { Controller } from '../../core/controller/controller.abstract.js';
import UploadImageResponse from './response/upload-image.response.js';

type ParamsProductDetails = {
  productId: string;
} | ParamsDictionary

@injectable()
export default class ProductController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.ProductServiceInterface) private readonly productService: ProductServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for ProductController…');
    this.addRoute({
      path: '/:productId',
      method: HttpMethod.Get,
      handler: this.showProductDetails,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new DocumentExistsMiddleware(this.productService, 'Product', 'productId')
      ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.createProduct,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateProductDto)
      ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });
    this.addRoute({
      path: '/:productId',
      method: HttpMethod.Put,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new ValidateDtoMiddleware(UpdateProductDto),
        new DocumentExistsMiddleware(this.productService, 'Product', 'productId')
      ]
    });
    this.addRoute({
      path: '/:productId',
      method: HttpMethod.Delete,
      handler: this.deleteProduct,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new DocumentExistsMiddleware(this.productService, 'Product', 'productId')
      ]
    });
    this.addRoute({
      path: '/:productId/image',
      method: HttpMethod.Post,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
      ]
    });
  }

  public async uploadImage(req: Request<ParamsProductDetails>, res: Response) {
    const {productId} = req.params;
    const updateDto = { image: req.file?.filename };
    await this.productService.update(productId, updateDto);
    this.created(res, fillDTO(UploadImageResponse, {updateDto}));
  }

  public async index(
    { query }: Request<core.ParamsDictionary | ParamsGetProduct>,
    res: Response
  ): Promise<void> {
    const { limit } = query;

    const products = await this.productService.find(Number(limit));

    this.ok(res, fillDTO(ProductRdo, products || []));
  }

  public async deleteProduct(
    { params }: Request<core.ParamsDictionary | ParamsGetProduct>,
    res: Response
  ): Promise<void> {
    const {productId} = params;
    const deletedProduct = await this.productService.delete(productId);

    this.ok(res, fillDTO(ProductRdo, deletedProduct));
  }

  public async update(
    {params, body}: Request<core.ParamsDictionary | ParamsGetProduct, UnknownRecord, UpdateProductDto>,
    res: Response
  ): Promise<void> {
    const {productId} = params;
    const updatedProduct = await this.productService.update(productId, body);
    this.ok(res, fillDTO(ProductRdo, updatedProduct));
  }

  public async createProduct(
    { body }: Request<UnknownRecord, UnknownRecord, CreateProductDto>,
    res: Response
  ): Promise<void> {
    const result = await this.productService.create(body);
    const product = await this.productService.getProductDetails(result.id);
    this.created(res, fillDTO(ProductRdo, product));
  }

  public async showProductDetails(
    {params}: Request<core.ParamsDictionary | ParamsGetProduct>,
    res: Response
  ): Promise<void> {
    const {productId} = params;
    const product = await this.productService.getProductDetails(productId);

    this.ok(res, fillDTO(ProductRdo, product));
  }
}
