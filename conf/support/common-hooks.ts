import { ICustomWorld } from './custom-world';
import { config } from './config';
import { Allure, ContentType } from 'allure-cucumberjs';
import {ensureFileSync} from 'fs-extra';
var path = require('path');
const screenshots_folder = './screenshots/';
const allure_categories_conf_path = path.join('conf','reporters','categories.json');
const allure_envProperties_path = path.join('conf','reporters','environment.properties');
const allure_categories_target_path = path.join('reports','allure-results','categories.json');
const allure_envProperties_target_path = path.join('reports','allure-results','environment.properties');

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
  // Create emptid allure properties files empty in reports folder
  ensureFileSync(allure_envProperties_target_path);
  ensureFileSync(allure_categories_target_path);
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  const parent_suite = await pickle.uri
    .replace(/[a-zA-Z]+\/[a-zA-Z]+\//i, '')
    .replace('features','')
    .replace('ui','')
    .replace('\\\\','')
    .replace('.feature', '')
    .toUpperCase();
  await this.parentSuite(parent_suite);
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
    }
  });
  //this.feature = pickle;
});

AfterStep(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result?.status != 'PASSED') {
    const image: any = await this.page?.screenshot({ type: 'png' });
    image && (await this.allure?.attachment('screenshot', image, 'image/png'));
  }
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    await this.attach(`Status: ${result?.status}, CurrentUrl:${this.page?.url()}`);

    if (result.status !== Status.PASSED) {
      //Add screenshot
      const image = await this.page?.screenshot();
      image && (await this.attach(image, 'image/png'));

      //Add Video
      if (process.env.PWVIDEO) {
        const video = await this.page?.video();
        const videopath = await video?.path();
        await this.page?.waitForTimeout(3000);
        if (video) {
          await this.attach(fs.readFileSync('./' + videopath), 'video/webm');
        }
      }

      await this.context?.tracing.stop({
        path: `${tracesDir}/${this.testName}-${
          this.startTime?.toISOString().split('.')[0]
        }trace.zip`,
      });
    }
  }

  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  //write environment.properties for allure reporter
  fs.writeFileSync(
    allure_envProperties_path,
    ` Browser = ${config.browser} ${browser.version()} \nEnvironment = prod \nURL = ${
      config.BASE_URL
    }
    `,
  );

  fs.copyFile(allure_categories_conf_path, allure_categories_target_path, (err) => {
    if (err) throw err;
    console.log('File was copied to destination');
  });
  fs.copyFile(
    allure_envProperties_path,
    allure_envProperties_target_path,
    (err) => {
      if (err) throw err;
      console.log('environment_values are copied to destination');
    },
  );

  if (fs.existsSync(screenshots_folder)) {
    fs.rmSync(screenshots_folder, { recursive: true, force: true });
  }

  await browser.close();
});
