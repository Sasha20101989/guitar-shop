import { Container } from 'inversify';

import { AppComponent } from '../types/app-component.enum.js';
import { RestSchema } from '../core/config/rest.schema.js';
import type { ConfigInterface } from '../core/config/config.interface.js';
import ConfigService from '../core/config/config.service.js';
import { ExceptionFilterInterface } from '../core/expception-filters/exception-filter.interface.js';
import HttpErrorExceptionFilter from '../core/expception-filters/http-error.exception-filter.js';
import ValidationExceptionFilter from '../core/expception-filters/validation.exception-filter.js';
import BaseExceptionFilter from '../core/expception-filters/base.exception-filter.js';
import type { LoggerInterface } from '../core/logger/logger.interface.js';
import PinoService from '../core/logger/pino.service.js';
import RestApplication from './rest.js';
import { DatabaseClientInterface } from '../core/database-client/database-client.interface.js';
import MongoClientService from '../core/database-client/mongo-client.service.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(AppComponent.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<LoggerInterface>(AppComponent.LoggerInterface).to(PinoService).inSingletonScope();
  restApplicationContainer.bind<ConfigInterface<RestSchema>>(AppComponent.ConfigInterface).to(ConfigService).inSingletonScope();
  restApplicationContainer.bind<DatabaseClientInterface>(AppComponent.DatabaseClientInterface).to(MongoClientService).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilterInterface>(AppComponent.HttpErrorExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilterInterface>(AppComponent.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilterInterface>(AppComponent.BaseExceptionFilter).to(BaseExceptionFilter).inSingletonScope();

  return restApplicationContainer;
}
