import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../../../../conf/support/custom-world';
import { BrowserContext, Page } from 'playwright';
import { Context } from 'vm';

export class switchPage {
  ///////////////////////////////////////////////////////////////////////////////
  //  Locators
  //////////////////////////////////////////////////////////////////////////////
  readonly NEW_TAB_BUTTON = '#tabButton';
  readonly NEW_WINDOW_BUTTON = '#windowButton';
  readonly NEW_WINDOW_WITH_MESSAGE_BUTTON = '#messageWindowButton';
  readonly NEW_TAB_HEADER = '#sampleHeading';
  readonly NEW_WINDOW_MESSAGE_BODY = 'body';

  ///////////////////////////////////////////////////////////////////////////////
  //  Methods
  //////////////////////////////////////////////////////////////////////////////
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async opening_new_tab(new_context: BrowserContext) {
    const page = this.page!;

    await page.waitForTimeout(1000);
    const [newTab] = await Promise.all([
      new_context.waitForEvent('page'),
      page.click(this.NEW_TAB_BUTTON), // Opens a new tab at click
    ]);
    await newTab.once('load', () => console.log('Page loaded!'));
    await newTab.bringToFront();
    console.log('Current opened tab is : ', await newTab.url());
    console.log('Previous opened tab is : ', await page.url());

    return newTab;
  }

  async switch_to_new_window(new_context: BrowserContext) {
    const page = this.page!;

    const [newWindow] = await Promise.all([
      new_context.waitForEvent('page'),
      page.click(this.NEW_WINDOW_BUTTON), // Opens a new tab at click
    ]);

    await newWindow.once('load', () => console.log('Page loaded!'));
    await newWindow.bringToFront();
    console.log('Current opened window is : ', await newWindow.url());
    console.log('pREVIOUS opened window is : ', await page.url());
    return newWindow;
  }

  async switch_to_new_window_with_message(new_context: BrowserContext) {
    const page = this.page!;

    const [msgWindow] = await Promise.all([
      new_context.waitForEvent('page'),
      page.click(this.NEW_WINDOW_WITH_MESSAGE_BUTTON), // Opens a new tab at click
    ]);

    await msgWindow.once('load', () => console.log('Page loaded!'));
    await msgWindow.bringToFront();
    console.log('Current opened window is : ', await msgWindow.url());
    console.log('pREVIOUS opened window is : ', await page.url());
    return msgWindow;
  }

  async check_new_tab_is_opened() {
    const page = this.page!;
    await this.page!.waitForTimeout(4000);
    await expect(this.page!.locator(this.NEW_TAB_HEADER)).toBeVisible();
    console.log('looking for new tab');
    return console.log('    ✔️  The new tab is well displayed with url : ', this.page!.url());
  }

  async check_new_window_is_opened() {
    await this.page!.waitForTimeout(4000);
    await expect(this.page!.locator(this.NEW_TAB_HEADER)).toBeVisible();
    console.log('looking for new tab');
    return console.log('    ✔️  The new window is well displayed with url : ', this.page!.url());
  }

  async check_window_message_after_window_switch() {
    await this.page!.waitForTimeout(4000);
    await expect(this.page!.locator(this.NEW_WINDOW_MESSAGE_BODY)).toBeVisible();
    await expect(this.page!.locator(this.NEW_WINDOW_MESSAGE_BODY)).toHaveText(
      'Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.',
    );
    console.log('looking for new tab');
    return console.log('    ✔️  The new window is well displayed with url : ', this.page!.url());
  }

  // When('I access links', async function (this: ICustomWorld) {
  //     const page = this.page!;
  //     const context = this.context!;
  //     // const po_linkResponse = '//b[contains(text(),"201")]'
  // //    let po_linkResponse = '#linkResponse';
  // //    let po_createdLink = '#created'
  //     let po_homeLinkSimple = '#simpleLink'
  // //    let po_homeLinkDynamic = '#dynamicLink'

  //     const [newTab] = await Promise.all([
  //         context.waitForEvent('page'),
  //         page.click(po_homeLinkSimple) // Opens a new tab at click
  //     ])

  //     await msgWindow.once('load', () => console.log('Page loaded!'));
  //     await msgWindow.bringToFront();
  //     // await expect(page.locator(po_linkResponse).toContainText('201');
  //     //click on home links and close new tab

  //     // Click on created link
  // });
}
