import type { Page } from 'playwright';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(base_url: string, user: string, password: string) {
    await this.page.goto(base_url);

    // eslint-disable-next-line no-console
    console.log('before 1');
    const locatorChoice = this.page.locator('#choiceTransparentDisable');
    if (await locatorChoice.isVisible()) {
      await locatorChoice.waitFor();
      await this.page.waitForTimeout(3000);
      await this.page.click('#choiceTransparentDisable');
    }

    // eslint-disable-next-line no-console
    console.log('before 2');
    const locatorConfirmation = this.page.locator('#confirmationOk');
    if (await locatorConfirmation.isVisible()) {
      await locatorConfirmation.waitFor();
      await this.page.waitForTimeout(3000);
      await this.page.click('#confirmationOk');
    }

    // eslint-disable-next-line no-console
    console.log('before 3');
    await this.page.fill('#username', user);
    await this.page.locator("//input[@class='button primary']").waitFor();
    await this.page.waitForTimeout(3000);
    await this.page.click('//input[@class="button primary"]');
    await this.page.waitForTimeout(3000);
    await this.page.fill('#IDToken2', password);
    await this.page.click('//input[@class="button primary  buttonUpdate"]');
    await this.page.waitForTimeout(3000);
  }
}
