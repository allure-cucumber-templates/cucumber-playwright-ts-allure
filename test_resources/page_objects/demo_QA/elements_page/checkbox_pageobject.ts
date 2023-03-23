import { expect } from '@playwright/test';
import { Page } from 'playwright';

export class checkboxPage {
  ///////////////////////////////////////////////////////////////////////////////
  //  Locators
  //////////////////////////////////////////////////////////////////////////////
  readonly EXPAND_TOGGLE = '.rct-option-expand-all';
  readonly DESKTOP_CHECKBOX = "//span[text()='Desktop']";
  readonly REACT_CHECKBOX = "//span[text()='React']";
  readonly WORD_FILE_CHECKBOX = "//span[text()='Word File.doc']";
  readonly EXCEL_FILE_CHECKBOX = "//span[text()='Excel File.doc']";

  readonly CHECKBOX_LIST = [
    'desktop',
    'notes',
    'commands',
    'react',
    'downloads',
    'wordFile',
    'excelFile',
  ];
  ///////////////////////////////////////////////////////////////////////////////
  //  Methods
  //////////////////////////////////////////////////////////////////////////////
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async async_clicking_on_checkbox_combination() {
    const page = this.page!;
    await page.locator(this.EXPAND_TOGGLE).click();
    await page.waitForTimeout(1000);
    await page.locator(this.DESKTOP_CHECKBOX).click();
    await page.locator(this.REACT_CHECKBOX).click();
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.locator(this.WORD_FILE_CHECKBOX).click();
    await page.locator(this.EXCEL_FILE_CHECKBOX).click();
    console.log('checkbox setup');
  }

  async check_checkbox_list_toggles() {
    const page = this.page!;

    for (let i = 0; i < this.CHECKBOX_LIST.length; i++) {
      let toggleLocator = page.locator(
        "//span[@class='text-success' and text()='".concat(this.CHECKBOX_LIST[i], "']"),
      );
      console.log(toggleLocator);
      await expect(toggleLocator).toBeVisible();
    }
    console.log('Checkbox OK');
  }
}
