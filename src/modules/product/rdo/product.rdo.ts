import { Expose } from 'class-transformer';
import { GuitarType } from '../../../types/guitar.type.js';
import { StringCount } from '../../../types/string-count.type.js';

export default class ProductRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public createdAt!: Date;

  @Expose()
  public image!: string;

  @Expose()
  public type!: GuitarType;

  @Expose()
  public article!: string;

  @Expose()
  public numberOfStrings!: StringCount;

  @Expose()
  public price!: number;
}
