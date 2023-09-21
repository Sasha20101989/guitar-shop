import { GuitarType } from "../types/guitar-type";
import { Product } from "../types/product";
import { StringCount } from "../types/string-count";
import { IMAGE_URL } from "./const";

const { v4: uuidv4 } = require('uuid');

export function generateRandomGuitars(count: number) {
  const generatedGuitars: Product[] = [];

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomDate(start: Date, end: Date): Date {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const randomTime = startTime + Math.random() * (endTime - startTime);
    return new Date(randomTime);
  }

  function generateRandomGuitar(): Product {
    const startDate = new Date(2023, 1, 1);
    const endDate = new Date();
    const randomDate = getRandomDate(startDate, endDate);

    const descriptions = ['крутая', 'отличная', 'популярная', 'легкая', 'качественная'];
    const articlePrefix = ['AB', 'CD', 'EF', 'GH'];
    const articleNumbers = getRandomInt(1000, 9999);
    const article = articlePrefix[getRandomInt(0, articlePrefix.length - 1)] + articleNumbers.toString();

    const randomDescription = descriptions[getRandomInt(0, descriptions.length - 1)];
    const randomType = Object.values(GuitarType)[getRandomInt(0, Object.values(GuitarType).length - 1)];
    const randomStringCount: StringCount = Object.values(StringCount)[getRandomInt(0, Object.values(StringCount).length - 1)];
    const randomPrice = getRandomInt(100, 1000000);

    const guitar = {
      id: uuidv4(),
      title: `${randomType} ${randomStringCount} струнная`,
      description: `${randomDescription} ${randomStringCount} струнная гитара`,
      createdAt: randomDate,
      imageUrl: `${IMAGE_URL}${Math.floor(Math.random() * 9)}.png`,
      type: randomType,
      article: article,
      numberOfStrings: randomStringCount,
      price: randomPrice,
    };

    return guitar;
  }

  for (let i = 0; i < count; i++) {
    const randomGuitar = generateRandomGuitar();
    generatedGuitars.push(randomGuitar);
  }

  return generatedGuitars;
}
