import { expect } from '@playwright/test';
import { fstat } from 'fs';
import { Page } from 'playwright';
import * as fs from 'fs';

export class download_upload_page {
  ///////////////////////////////////////////////////////////////////////////////
  //  Locators
  //////////////////////////////////////////////////////////////////////////////
  readonly DOWNLOADBUTTON = '#downloadButton';
  readonly UPLOADBUTTON = '#uploadFile';
  readonly UPLOADFILE = 'test_resources/test_datas/dataset.json';
  readonly UPLOADEDFILEPATH = '#uploadedFilePath';
  readonly RELIABLEPATH = 'test_resources/test_datas/sample.jpeg';

  ///////////////////////////////////////////////////////////////////////////////
  //  Methods
  //////////////////////////////////////////////////////////////////////////////
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async download_file() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'), // wait for download to start
      this.page.click(this.DOWNLOADBUTTON),
    ]);
    // wait for download to complete
    const path = await download.path();
    await download.saveAs(this.RELIABLEPATH);
    await download.delete();
  }
  async check_download_file() {
    const page = this.page!;
    await expect(fs.existsSync(this.RELIABLEPATH)).toBeTruthy();
    fs.unlinkSync(this.RELIABLEPATH);
  }

  async upload_file() {
    await this.page.setInputFiles('#uploadFile', this.UPLOADFILE);
  }

  async check_upload_file() {
    await expect(this.page.locator(this.UPLOADEDFILEPATH)).toBeVisible();
    await expect(this.page.locator('text=dataset.json')).toBeVisible();
  }
}
