import { ProductGeneratorInterface } from './product-generator.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import { getRandomDate, getRandomInt, getRandomItem } from '../../core/helpers/index.js';
import { GuitarType } from '../../types/guitar.type.js';
import { StringCount } from '../../types/string-count.type.js';

const START_DATE = new Date(2023, 1, 1);
const END_DATE = new Date();
const ARTICLE_PREFIX = ['AB', 'CD', 'EF', 'GH'];

export default class ProductGenerator implements ProductGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdAt = getRandomDate(START_DATE, END_DATE);
    const image = getRandomItem<string>(this.mockData.images);
    const type = Object.values(GuitarType)[getRandomInt(0, Object.values(GuitarType).length - 1)];
    const articleNumbers = getRandomInt(1000, 9999);
    const article = ARTICLE_PREFIX[getRandomInt(0, ARTICLE_PREFIX.length - 1)] + articleNumbers.toString();
    const nunmberOfStrings  = Object.values(StringCount)[getRandomInt(0, Object.values(StringCount).length - 1)];
    const price = getRandomInt(100, 1000000);

    return [
      title, description, createdAt,
      image, type, article, nunmberOfStrings, price
    ].join('\t');
  }
}
