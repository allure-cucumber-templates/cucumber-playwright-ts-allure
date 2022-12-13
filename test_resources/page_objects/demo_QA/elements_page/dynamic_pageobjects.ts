import { expect } from '@playwright/test';
import { Page } from 'playwright';

export class dynamicPage {
  ///////////////////////////////////////////////////////////////////////////////
  //  Locators
  //////////////////////////////////////////////////////////////////////////////
  readonly ACTIVATION_ELEMENT = '#enableAfter';
  readonly COLOR_CHANGE_ELEMENT = '#colorChange';
  readonly VISIBLE_ELEMENT = '#visibleAfter';
  ///////////////////////////////////////////////////////////////////////////////
  //  Methods
  //////////////////////////////////////////////////////////////////////////////
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async check_dynamic_elements_changing_after_delay(waitTime: number) {
    const page = this.page!;
    await expect(page.locator(this.ACTIVATION_ELEMENT)).toBeDisabled();
    await expect(page.locator(this.COLOR_CHANGE_ELEMENT)).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect(page.locator(this.VISIBLE_ELEMENT)).not.toBeVisible();
    console.log('initial element status OK');
    await page.waitForTimeout(waitTime * 1000);
    await expect(page.locator(this.ACTIVATION_ELEMENT)).toBeEnabled({ timeout: 500 });
    await expect(page.locator(this.COLOR_CHANGE_ELEMENT)).toHaveCSS('color', 'rgb(220, 53, 69)');
    await expect(page.locator(this.VISIBLE_ELEMENT)).toBeVisible({ timeout: 500 });
    console.log('dynamic element status OK after change');
  }
}
