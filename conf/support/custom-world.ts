import { setWorldConstructor, IWorldOptions } from '@cucumber/cucumber';
import { BrowserContext, Page } from 'playwright';
import { AxiosInstance } from 'axios';
import { Allure, CucumberAllureWorld } from 'allure-cucumberjs';

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string };
}

export interface ICustomWorld extends CucumberAllureWorld {
  debug: boolean;

  context?: BrowserContext;
  page?: Page;
  allure?: Allure;
  testName?: string;
  startTime?: Date;
  server?: AxiosInstance;
}

export class CustomWorld extends CucumberAllureWorld implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
  debug = false;
}

setWorldConstructor(CustomWorld);
