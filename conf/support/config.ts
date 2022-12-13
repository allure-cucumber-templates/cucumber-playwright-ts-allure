import { LaunchOptions } from 'playwright';
import dotenv from 'dotenv';

const EXECUTE_TYPE = process.env.EXECUTE_TYPE || 'local';
let browserOptions;

const browserOptionsLocal: LaunchOptions = {
  slowMo: 100,
  headless: false,
  args: [
    '--use-fake-ui-for-media-stream',
    '--use-fake-device-for-media-stream',
    '--incognito',
    '--start-maximized',
  ],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
  devtools: false,
};

const browserOptionsCI: LaunchOptions = {
  slowMo: 20,
  headless: true,
  timeout: 100000,
  args: [
    '--use-fake-ui-for-media-stream',
    '--use-fake-device-for-media-stream',
    '--incognito',
    '--disable-dev-shm-usage',
  ],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
  devtools: false,
};

dotenv.config();

console.log(EXECUTE_TYPE);
if (EXECUTE_TYPE === 'CI') {
  browserOptions = browserOptionsCI;
} else {
  browserOptions = browserOptionsLocal;
}

export const config = {
  browser: process.env.BROWSER || 'chromium',
  browserOptions,
  BASE_URL: String(process.env.BASE_FRONT_URL) || 'https://demoqa.com/',
  AUTH_USER: String(process.env.AUTH_USER),
  AUTH_PASSWORD: String(process.env.AUTH_PASSWORD),
  IMG_THRESHOLD: { threshold: 0.4 },
  BASE_API_URL: String(process.env.BASE_API_ENDPOINT) || 'https://www.boredapi.com/api/',
};
