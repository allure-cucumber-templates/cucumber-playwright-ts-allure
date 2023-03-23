import { expect } from '@playwright/test';
import { ICustomWorld } from '../../../../conf/support/custom-world';
import { Page } from 'playwright';
import { notDeepEqual } from 'assert';

export class modalPopupPage {
  ///////////////////////////////////////////////////////////////////////////////
  //  Locators
  //////////////////////////////////////////////////////////////////////////////
  readonly SMALLMODAL_BTN = '#showSmallModal';
  readonly LARGEMODAL_BTN = '#showLargeModal';

  readonly LARGE_MODAL = '#example-modal-sizes-title-lg';
  readonly CLOSE_SM_BTN = '#closeSmallModal';
  readonly CLOSE_LG_BTN = '#closeLargeModal';
  readonly SMALL_MODAL = '#example-modal-sizes-title-sm';

  //////////////////////////////////////////////////////////////
  //  Methods
  //////////////////////////////////////////////////////////////////////////////
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async click_on_modal_button(modalElem: string) {
    switch (modalElem) {
      case 'Small modal':
        await this.page.locator(this.SMALLMODAL_BTN).click();

        break;
      case 'Large modal':
        await this.page.locator(this.LARGEMODAL_BTN).click();

        break;
      default:
        console.log('No Corresponding buttons');
        break;
    }
  }

  async check_on_modal_button(modalElem: string) {
    switch (modalElem) {
      case 'Small modal':
        await this.page.locator(this.SMALL_MODAL).waitFor();
        await this.page.locator(this.CLOSE_SM_BTN).waitFor();
        await expect(this.page.locator(this.SMALL_MODAL)).toBeVisible();
        await expect(this.page.locator(this.CLOSE_SM_BTN)).toBeVisible();

        break;
      case 'Large modal':
        await this.page.locator(this.LARGE_MODAL).waitFor();
        await this.page.locator(this.CLOSE_LG_BTN).waitFor();
        await expect(this.page.locator(this.LARGE_MODAL)).toBeVisible();
        await expect(this.page.locator(this.CLOSE_LG_BTN)).toBeVisible();

        break;
      default:
        console.log('No Corresponding buttons');
        break;
    }
  }
}
