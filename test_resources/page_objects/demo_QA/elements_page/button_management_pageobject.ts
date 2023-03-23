import { expect } from '@playwright/test';
import { Page } from 'playwright';

export class buttonPage {
  ///////////////////////////////////////////////////////////////////////////////
  //  Locators
  //////////////////////////////////////////////////////////////////////////////
  readonly DOUBLE_CLICK_BUTTON = '#doubleClickBtn';
  readonly RIGHT_CLICK_BUTTON = '#rightClickBtn';
  readonly DYNAMIC_BUTTON = "//button[text()='Click Me']";

  readonly DOUBLE_CLICK_MESSAGE = '#doubleClickMessage';
  readonly RIGHT_CLICK_MESSAGE = '#rightClickMessage';
  readonly DYNAMIC_MESSAGE = '#dynamicClickMessage';
  ///////////////////////////////////////////////////////////////////////////////
  //  Methods
  //////////////////////////////////////////////////////////////////////////////
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async click_on_all_buttons() {
    const page = this.page!;
    await page.locator(this.DOUBLE_CLICK_BUTTON).dblclick();
    await page.locator(this.RIGHT_CLICK_BUTTON).click({ button: 'right' });
    await page.locator(this.DYNAMIC_BUTTON).click();
    console.log('Clicked on buttons');
  }

  async check_buttons__have_been_clicked_on() {
    const page = this.page!;
    await expect(page.locator(this.DOUBLE_CLICK_MESSAGE)).toBeVisible();
    await expect(page.locator(this.DOUBLE_CLICK_MESSAGE)).toHaveText(
      'You have done a double click',
    );
    await expect(page.locator(this.RIGHT_CLICK_MESSAGE)).toBeVisible();
    await expect(page.locator(this.RIGHT_CLICK_MESSAGE)).toHaveText('You have done a right click');
    await expect(page.locator(this.DYNAMIC_MESSAGE)).toBeVisible();
    await expect(page.locator(this.DYNAMIC_MESSAGE)).toHaveText('You have done a dynamic click');
    console.log('Clicks on all buttons OK');
  }
}
