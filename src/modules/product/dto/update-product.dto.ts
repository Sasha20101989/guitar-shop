import { IsDateString, IsEnum, IsInt, IsNotEmpty, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { GuitarType } from '../../../types/guitar.type.js';
import { StringCount } from '../../../types/string-count.type.js';
import { LENGTH_CONSTANTS } from '../product.const.js';

export default class UpdateProductDto {
  @IsNotEmpty({ message: 'Title are required' })
  @MinLength(LENGTH_CONSTANTS.MIN_LENGTH_TITLE,{message: `Minimum title length must be ${LENGTH_CONSTANTS.MIN_LENGTH_TITLE}`})
  @MaxLength(LENGTH_CONSTANTS.MAX_LENGTH_TITLE, {message: `Maximum title length must be ${LENGTH_CONSTANTS.MAX_LENGTH_TITLE}`})
  public title?: string;

  @IsNotEmpty({ message: 'Description are required' })
  @MinLength(LENGTH_CONSTANTS.MIN_LENGTH_DESCRIPTION, {message: `Minimum description length must be ${LENGTH_CONSTANTS.MIN_LENGTH_DESCRIPTION}`})
  @MaxLength(LENGTH_CONSTANTS.MAX_LENGTH_DESCRIPTION, {message: `Maximum description length must be ${LENGTH_CONSTANTS.MAX_LENGTH_DESCRIPTION}`})
  public description?: string;

  @IsNotEmpty({ message: 'Date are required' })
  @IsDateString({}, {message: 'Date must be valid ISO date'})
  public createdAt?: Date;

  @IsNotEmpty({ message: 'Image are required' })
  @Matches(/\.(jpg|png)$/, { message: 'Image must be in JPG or PNG format' })
  public image?: string;

  @IsNotEmpty({ message: 'Guitar type are required' })
  @IsEnum(GuitarType, { message: 'Invalid guitar type' })
  public type?: GuitarType;

  @IsNotEmpty({ message: 'Article are required' })
  @MinLength(LENGTH_CONSTANTS.MIN_LENGTH_ARTICLE, {message: `Minimum article length must be ${LENGTH_CONSTANTS.MIN_LENGTH_ARTICLE}`})
  @MaxLength(LENGTH_CONSTANTS.MAX_LENGTH_ARTICLE, {message: `Maximum article length must be ${LENGTH_CONSTANTS.MAX_LENGTH_ARTICLE}`})
  public article?: string;

  @IsNotEmpty({ message: 'String Count are required' })
  @IsEnum(StringCount, { message: 'Invalid strings count' })
  public numberOfStrings?: StringCount;

  @IsNotEmpty({ message: 'Image are required' })
  @IsInt({message: 'Price must be an integer'})
  @Min(LENGTH_CONSTANTS.MIN_LENGTH_PRICE, {message: `Minimum price is ${LENGTH_CONSTANTS.MIN_LENGTH_PRICE}`})
  @Max(LENGTH_CONSTANTS.MAX_LENGTH_PRICE, {message: `Maximum price is ${LENGTH_CONSTANTS.MAX_LENGTH_PRICE}`})
  public price?: number;
}
