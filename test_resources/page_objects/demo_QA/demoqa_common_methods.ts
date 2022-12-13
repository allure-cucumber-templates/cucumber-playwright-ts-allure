import { expect } from '@playwright/test';
import { Page } from 'playwright';

export class commonFunctions {
  ///////////////////////////////////////////////////////////////////////////////
  //  Locators
  //////////////////////////////////////////////////////////////////////////////
  readonly HOME_PAGE_URL = 'https://demoqa.com';
  readonly DEMOQA_LOGO = '//a[contains(@href,"https://demoqa.com")]';
  ///////////////////////////////////////////////////////////////////////////////
  //  Methods
  //////////////////////////////////////////////////////////////////////////////
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async go_to_home_page() {
    await this.page?.goto(this.HOME_PAGE_URL);
    await expect(this.page.locator(this.DEMOQA_LOGO).first()).toBeVisible();
    console.log('    ✔️   The "Demoqa" Home Page has well been loaded!');
  }

  async go_to_selected_page(section: string, subsection: string) {
    let selectSection = "//h5[text()='".concat(section, "']");
    let selectSubSection = "//span[text()='".concat(subsection, "']/..");
    await this.page.locator(selectSection).click();
    await expect(this.page.locator(selectSubSection)).toBeVisible();
    await this.page.locator(selectSubSection).click({ position: { x: 15, y: 25 } });
    console.log('On the ' + subsection + ' page');
  }
}
