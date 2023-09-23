import { getErrorMessage } from '../helpers/common.js';
import { getMongoURI } from '../helpers/db.js';
import TSVFileReader from '../file-reader/tsv-file-reader.js';
import ConsoleLoggerService from '../logger/console.service.js';
import type { LoggerInterface } from '../logger/logger.interface.js';
import type { CliCommandInterface } from './cli-command.interface.js';
import { UserModel } from '../../modules/user/user.entity.js';
import type { UserServiceInterface } from '../../modules/user/user-service.interface.js';
import UserService from '../../modules/user/user.service.js';
import { DEFAULT_USER_PASSWORD } from './import.command.const.js';
import ConfigService from '../config/config.service.js';
import { DatabaseClientInterface } from '../database-client/database-client.interface.js';
import { Command } from '../../types/command.type.js';
import MongoClientService from '../database-client/mongo-client.service.js';
import { Product } from '../../types/product.type.js';
import { createProduct } from '../helpers/products.js';
import { User } from '../../types/user.type.js';
import { createUser } from '../helpers/users.js';
import ProductService from '../../modules/product/product.service.js';
import { ProductModel } from '../../modules/product/product.entity.js';
import { ProductServiceInterface } from '../../modules/product/product-service.interface.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = Command.Import;
  private productService!: ProductServiceInterface;
  private userService!: UserServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private logger: LoggerInterface;
  private configService: ConfigService;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.configService = new ConfigService(this.logger);
    this.userService = new UserService(this.logger, UserModel);
    this.productService = new ProductService(this.logger, ProductModel);
    this.databaseService = new MongoClientService(this.logger);
  }

  private async saveProduct(product: Product) {
    await this.productService.create(product);
  }

  private async saveUser(user: User) {
    await this.userService.findOrCreate({
      ...user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);
  }

  private async onLine(line: string, resolve: () => void) {
    const product = createProduct(line);
    await this.saveProduct(product);
    const user = createUser(line);
    await this.saveUser(user);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const defaulDbPort = this.configService.get('DB_PORT');
    const uri = getMongoURI(login, password, host, defaulDbPort, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    fileReader.read()
      .catch((err) => {
        console.log(`Can't read the file: ${getErrorMessage(err)}`);
        throw new Error(err);
      });
  }
}