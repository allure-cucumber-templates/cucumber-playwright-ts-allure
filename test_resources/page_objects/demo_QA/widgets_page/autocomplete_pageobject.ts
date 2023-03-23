import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../../../../conf/support/custom-world';
import { Page } from 'playwright';

export class autocompletePage {
  ///////////////////////////////////////////////////////////////////////////////
  //  Locators
  //////////////////////////////////////////////////////////////////////////////
  readonly AUTOCOMPLETE_INPUT = '#autoCompleteMultipleInput';

  ///////////////////////////////////////////////////////////////////////////////
  //  Methods
  //////////////////////////////////////////////////////////////////////////////
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async type_in_autocomplete_field(color: string) {
    const page = this.page!;
    await page.locator(this.AUTOCOMPLETE_INPUT).fill(color);
  }

  async check_autocomplete_suggestions(color1: string, color2: string) {
    const page = this.page!;
    let optionLocator1 = page.locator('//div'.concat(`[text()="${color1}"]`));
    let optionLocator2 = page.locator('//div'.concat(`[text()="${color2}"]`));
    await expect(optionLocator1).toHaveCount(1);
    await expect(optionLocator2).toHaveCount(1);
  }

  async add_autocomplete_suggestion_to_field(color: string) {
    const page = this.page!;
    let optionLocator = page.locator('//div'.concat(`[text()="${color}"]`));
    await optionLocator.click();
    await expect(optionLocator).toHaveCount(1);
  }
}
