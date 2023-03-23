import { expect } from '@playwright/test';
import { Page } from 'playwright';

export class radioPage {
  ///////////////////////////////////////////////////////////////////////////////
  //  Locators
  //////////////////////////////////////////////////////////////////////////////
  readonly FIRST_RADIO_BUTTON = "//label[text()='Yes']";
  readonly SECOND_RADIO_BUTTON = "//label[text()='Impressive']";
  readonly THIRD_RADIO_BUTTON = '#noRadio';

  readonly TEXT_RESULTS = '.text-success';
  ///////////////////////////////////////////////////////////////////////////////
  //  Methods
  //////////////////////////////////////////////////////////////////////////////
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async click_on_selected_radio_button(radioSelect: string) {
    const page = this.page!;
    let radioSelectElement = "//label[text()='".concat(radioSelect, "']");
    await page.locator(radioSelectElement).click({ force: true });
    console.log('Click on radio button ', radioSelect);
  }

  async check_result_message_after__radio_button_selection(
    radioSelect: string,
    radioStatus: string,
  ) {
    const page = this.page!;
    if (radioStatus == 'Enabled') {
      await expect(page.locator(this.TEXT_RESULTS)).toBeVisible();
      await expect(page.locator(this.TEXT_RESULTS)).toContainText(radioSelect);
      console.log('Text is displayed for enabled radio button ', radioSelect);
    }

    if (radioStatus == 'Disabled') {
      await expect(page.locator(this.TEXT_RESULTS)).not.toBeVisible();
      console.log('No text is displayed for disabled radio button ', radioSelect);
    }
  }
}
