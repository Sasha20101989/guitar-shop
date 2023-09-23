import 'reflect-metadata';
import { Container } from 'inversify';
import RestApplication from './app/rest.js';
import { AppComponent } from './types/app-component.enum.js';
import { createProductContainer } from './modules/product/product.container.js';
import { createUserContainer } from './modules/user/user.container.js';
import { createRestApplicationContainer } from './app/rest.container.js';

async function bootstrap() {
  const mainContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createProductContainer(),
  );

  const application = mainContainer.get<RestApplication>(AppComponent.RestApplication);
  await application.init();
}

bootstrap();

//npm run build
//npm run mock:server
//npm run ts ./src/main.cli.ts -- --help
//npm run ts ./src/main.cli.ts -- --import ./mocks/test-data.tsv admin admin localhost guitar-shop secret
//npm run ts ./src/main.cli.ts -- --generate 100 ./mocks/test-data.tsv http://localhost:3123/api
//docker compose --file ./docker-compose.dev.yml --project-name "guitar-shop" up -d
