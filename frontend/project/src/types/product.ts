import { GuitarType } from "./guitar-type";
import { StringCount } from "./string-count";

export type Product = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  image: string;
  type: GuitarType;
  article: string;
  numberOfStrings: StringCount;
  price: number;
};
