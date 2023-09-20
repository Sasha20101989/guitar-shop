import { GuitarType } from "../types/guitar-type";
import { Product } from "../types/product";
import { StringCount } from "../types/string-count";

export function generateRandomGuitars(count: number) {
  const generatedGuitars: Product[] = [];

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateRandomGuitar(): Product {
    const titles = ['Гитара', 'Бас-гитара', 'Укулеле', 'Электрогитара'];
    const descriptions = ['крутая', 'отличная', 'популярная', 'легкая', 'качественная'];
    const articlePrefix = ['AB', 'CD', 'EF', 'GH'];
    const articleNumbers = getRandomInt(1000, 9999);
    const article = articlePrefix[getRandomInt(0, articlePrefix.length - 1)] + articleNumbers.toString();

    const randomTitle = titles[getRandomInt(0, titles.length - 1)];
    const randomDescription = descriptions[getRandomInt(0, descriptions.length - 1)];
    const randomType = Object.values(GuitarType)[getRandomInt(0, Object.values(GuitarType).length - 1)];
    const randomStringCount: StringCount = Object.values(StringCount)[getRandomInt(0, Object.values(StringCount).length - 1)];
    const randomPrice = getRandomInt(100, 1000000);

    const guitar = {
      title: `${randomTitle} ${randomStringCount} струнная ${randomType}`,
      description: `${randomDescription} ${randomStringCount} струнная гитара`,
      createdAt: new Date(),
      imageUrl: 'string-path',
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
