import { expect } from '@playwright/test';
import { BrowserContext, Page } from 'playwright';

export class linkPage {
  ///////////////////////////////////////////////////////////////////////////////
  //  Locators
  //////////////////////////////////////////////////////////////////////////////
  readonly NEW_TAB_HOME_REDIRECT = 'a#simpleLink';
  readonly BROKEN_LINK = "//a[text()='Click Here for Broken Link']";
  readonly LINK_RESPONSE_TEXT = '#linkResponse';
  readonly LINK_STATUS_TEXT = 'p > b';
  readonly NEW_TAB_LINK = '//a[text()="Home"]';
  readonly NEW_TAB_BANNER = '.banner-image';
  ///////////////////////////////////////////////////////////////////////////////
  //  Methods
  //////////////////////////////////////////////////////////////////////////////
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async click_on_broken_link() {
    await this.page.click(this.BROKEN_LINK);
  }

  async check_current_page_is_error_500() {
    const url = this.page.url();
    await this.page.waitForTimeout(1000);
    await expect(url).toContain('/status_codes/500');
  }

  async click_on_api_link(apiLink: string) {
    let linkLocator = this.page.locator('//a'.concat(`[text()="${apiLink}"]`));
    await linkLocator.click();
  }

  async check_response_of_last_api_link(apiResponse: string) {
    await expect(this.page.locator(this.LINK_RESPONSE_TEXT)).toBeVisible();
    await expect(this.page.locator(this.LINK_STATUS_TEXT).first()).toHaveText(apiResponse);
  }

  async click_on_redirection_to_new_tab(new_context: BrowserContext) {
    const page = this.page!;

    await page.waitForTimeout(1000);
    const [newTab] = await Promise.all([
      new_context.waitForEvent('page'),
      page.click(this.NEW_TAB_HOME_REDIRECT), // Opens a new tab at click
    ]);
    await newTab.once('load', () => console.log('Page loaded!'));
    await newTab.bringToFront();
    console.log('Current opened tab is : ', await newTab.url());
    console.log('Previous opened tab is : ', await page.url());

    return newTab;
  }

  async check_redirection_to_new_tab() {
    const page = this.page!;
    await this.page!.waitForTimeout(4000);
    await expect(this.page!.locator(this.NEW_TAB_HOME_REDIRECT)).toBeVisible();
    console.log('looking for new tab');
    console.log('    ✔️  The new tab is well displayed with url : ', this.page!.url());
    await expect(page.url()).toContain('https://demoqa.com/');
    console.log('new tab is displayed');
  }
}
