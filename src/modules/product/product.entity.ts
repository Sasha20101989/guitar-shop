import { defaultClasses } from '@typegoose/typegoose';
import typegoose from '@typegoose/typegoose';
import { LENGTH_CONSTANTS } from './product.const.js';
import { GuitarType } from '../../types/guitar.type.js';
import { StringCount } from '../../types/string-count.type.js';

const {prop, modelOptions, getModelForClass} = typegoose;

export interface ProductEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'products'
  },
  options: {
    allowMixed: 0
  }
})
export class ProductEntity extends defaultClasses.TimeStamps{
  @prop({ trim: true, required: true, minlength: LENGTH_CONSTANTS.MIN_LENGTH_TITLE, maxlength: LENGTH_CONSTANTS.MAX_LENGTH_TITLE })
  public title!: string;

  @prop({ trim: true, required: true, minlength: LENGTH_CONSTANTS.MIN_LENGTH_DESCRIPTION, maxlength: LENGTH_CONSTANTS.MAX_LENGTH_DESCRIPTION })
  public description!: string;

  @prop({ default: '' })
  public image!: string;

  @prop({ type: String, enum: GuitarType, required: true })
  public type!: GuitarType;

  @prop({ required: true, type: String, minlength: LENGTH_CONSTANTS.MIN_LENGTH_ARTICLE, maxlength: LENGTH_CONSTANTS.MAX_LENGTH_ARTICLE })
  public article!: string;

  @prop({ type: String, enum: StringCount, required: true })
  public numberOfStrings!: StringCount;

  @prop({ required: true, min: LENGTH_CONSTANTS.MIN_LENGTH_PRICE, max: LENGTH_CONSTANTS.MAX_LENGTH_PRICE })
  public price!: number;
}

export const ProductModel = getModelForClass(ProductEntity);
