import { expect } from '@playwright/test';
import { Page } from 'playwright';

export class dropPage {
  ///////////////////////////////////////////////////////////////////////////////
  //  Locators
  //////////////////////////////////////////////////////////////////////////////
  readonly DRAG_ELEMENT = '#draggable';
  readonly DROP_ELEMENT = '#droppable';
  ///////////////////////////////////////////////////////////////////////////////
  //  Methods
  //////////////////////////////////////////////////////////////////////////////
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async drag_element_to_drop_zone() {
    const page = this.page!;
    await page.locator(this.DRAG_ELEMENT).dragTo(page.locator(this.DROP_ELEMENT).first());
    await page.waitForTimeout(1000);
  }

  async check__draggable_is_in_drop_zone() {
    const page = this.page!;
    await expect(page.locator(this.DROP_ELEMENT).first()).toHaveCSS(
      'background-color',
      'rgb(70, 130, 180)',
    );
  }
}
