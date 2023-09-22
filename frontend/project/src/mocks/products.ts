import { GuitarType } from "../types/guitar-type";
import { Product } from "../types/product";
import { StringCount } from "../types/string-count";
import { generateRandomGuitars } from "./random-generator-for-product";

export const products: Product[] = generateRandomGuitars(150);