import { ICustomWorld } from './custom-world';
import { config } from './config';
import { Allure, ContentType } from 'allure-cucumberjs';

import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  Status,
  setDefaultTimeout,
  AfterStep,
} from '@cucumber/cucumber';
import {
  chromium,
  ChromiumBrowser,
  firefox,
  FirefoxBrowser,
  webkit,
  WebKitBrowser,
  ConsoleMessage,
} from '@playwright/test';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import { ensureDir } from 'fs-extra';
import axios from 'axios';
import * as fs from 'fs';
import { Scenario } from '@cucumber/messages';

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
const tracesDir = 'traces';

declare global {
  // eslint-disable-next-line no-var
  var browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
}

setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);

BeforeAll(async function () {
  switch (config.browser) {
    case 'firefox':
      browser = await firefox.launch(config.browserOptions);
      break;
    case 'webkit':
      browser = await webkit.launch(config.browserOptions);
      break;
    default:
      browser = await chromium.launch(config.browserOptions);
  }
  await ensureDir(tracesDir);
  console.log('Browser executed: ', browser);
});

Before({ tags: '@ignore' }, async function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return 'skipped' as any;
});

Before({ tags: '@debug' }, async function (this: ICustomWorld) {
  this.debug = true;
});

Before({ tags: '@ui' }, async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  this.startTime = new Date();
  this.testName = pickle.name.replace(/\W/g, '-');
  // customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)
  this.context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO ? { dir: 'screenshots' } : undefined,
    viewport: null,
  });
  this.server = axios.create();
  this.server.defaults.baseURL = config.BASE_API_URL;
  this.server.defaults.headers.post = {
    'Content-Type': 'application/json',
  };
  this.server.interceptors.response.use((res) => res.data);
  // use login and set authorization if needed
  // this.server.defaults.headers.common.Authorization = 'Bearer ' + token;

  await this.context.tracing.start({ screenshots: true, snapshots: true });
  this.page = await this.context.newPage();
  this.page.on('console', async (msg: ConsoleMessage) => {
    if (msg.type() === 'log') {
      //     await this.attach(msg.text());
    }
  });
  this.feature = pickle;
});

AfterStep(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result?.status != 'PASSED') {
    const image: any = await this.page?.screenshot({ path: '/report/aaa', type: 'png' });
    image && (await this.allure?.attachment('screenshot', image, ContentType.PNG));
  }
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    if (result.status !== Status.PASSED) {
      const image = await this.page?.screenshot();
      image && (await this.attach(image, 'image/png'));

      await this.context?.tracing
        .stop({
          path: `${tracesDir}/${this.testName}-${
            this.startTime?.toISOString().split('.')[0]
          }trace.zip`,
        })
        .catch(() => {});
    }
  }
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  //write environment.properties for allure reporter
  fs.writeFileSync(
    'conf/reporters/environment.properties',
    ` Browser = ${
      config.browser
    } ${browser.version()} \nEnvironment = DemoQA \nURL = https://demoqa.com/
    `,
  );

  if (!fs.existsSync('reports/allure-results')) {
    fs.mkdirSync('reports/allure-results', { recursive: true });
  }
  fs.copyFileSync('conf/reporters/categories.json', 'reports/allure-results/categories.json');
  fs.copyFileSync(
    'conf/reporters/environment.properties',
    'reports/allure-results/environment.properties',
  );
  await browser.close();
});
