import { GuitarType } from './guitar-type';
import { StringCount } from './string-count';

export type ProductData = {
  title: string;
  description: string;
  createdAt: string;
  image: string;
  type: GuitarType;
  article: string;
  numberOfStrings: StringCount;
  price: number;
};
