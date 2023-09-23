import { GuitarType } from "./guitar.type.js";
import { StringCount } from "./string-count.type.js";

export type Product = {
  title: string;
  description: string;
  createdAt: Date;
  image: string;
  type: GuitarType;
  article: string;
  numberOfStrings: StringCount;
  price: number;
};
