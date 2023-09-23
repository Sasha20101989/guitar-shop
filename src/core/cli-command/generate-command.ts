import got from 'got';
import { CliCommandInterface } from './cli-command.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import ProductGenerator from '../../modules/product-generator/product-generator.js';
import TSVFileWriter from '../file-writer/tsv-file-writer.js';
import { Command } from '../../types/command.type.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = Command.Generate;
  private initialData!: MockData;

  public async execute(...parameters:string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const productCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      console.log(`Can't fetch data from ${url}.`);
      return;
    }

    const productGeneratorString = new ProductGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < productCount; i++) {
      await tsvFileWriter.write(productGeneratorString.generate());
    }

    console.log(`File ${filepath} was created!`);
  }
}
