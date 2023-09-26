import { GuitarType } from '../types/guitar-type';
import { StringCount } from '../types/string-count';

export default class CreateProductDto {
  public id?: string;
  public title?: string;
  public description?: string;
  public createdAt?: Date;
  public image?: string;
  public type?: GuitarType;
  public article?: string;
  public numberOfStrings?: StringCount;
  public price?: number;
}
