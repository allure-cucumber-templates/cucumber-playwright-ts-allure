import { expect } from '@playwright/test';
import { ICustomWorld } from '../../../../conf/support/custom-world';
import { Page } from 'playwright';

export class alertPopupPage {
  ///////////////////////////////////////////////////////////////////////////////
  //  Locators
  //////////////////////////////////////////////////////////////////////////////

  readonly ALERT_BUTTON = '#alertButton';
  readonly TIMER_ALERT_BUTTON = '#timerAlertButton';
  readonly CONFIRM_BUTTON = '#confirmButton';
  readonly PROMPT_BUTTON = '#promtButton';

  ///////////////////////////////////////////////////////////////////////////////
  //  Methods
  //////////////////////////////////////////////////////////////////////////////
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async click_Alert_Button(alertElem: string) {
    switch (alertElem) {
      case 'SimpleAlert':
        this.page.on('dialog', async (dialog) => {
          await expect(dialog.message()).toContain('You clicked a button');
          dialog.accept();
        });
        await this.page.locator(this.ALERT_BUTTON).click();
        break;
      case 'TimedAlert':
        this.page.on('dialog', async (dialog) => {
          await expect(dialog.message()).toContain('This alert appeared after 5 seconds');
          dialog.accept();
        });
        await this.page.locator(this.TIMER_ALERT_BUTTON).click();
        await this.page.waitForTimeout(5000);
        break;
      case 'ConfirmAlert':
        this.page.on('dialog', async (dialog) => {
          await expect(dialog.message()).toContain('Do you confirm action?');
          dialog.accept();
        });
        await this.page.locator(this.CONFIRM_BUTTON).click();
        break;
      case 'PromptAlert':
        this.page.on('dialog', async (dialog) => {
          dialog.accept('Prompt message');
        });
        await this.page.locator(this.PROMPT_BUTTON).click();
        break;
      default:
        console.log('No Corresponding buttons');
        break;
    }
  }

  async check_Alert_Button(alertElem: string) {
    switch (alertElem) {
      case 'SimpleAlert':
        this.page.on('dialog', async (dialog) => {
          await expect(dialog.message()).toContain('You clicked a button');
          dialog.accept();
        });

        break;
      case 'TimedAlert':
        this.page.on('dialog', async (dialog) => {
          await expect(dialog.message()).toContain('This alert appeared after 5 seconds');
          dialog.accept();
        });

        break;
      case 'ConfirmAlert':
        this.page.on('dialog', async (dialog) => {
          await expect(dialog.message()).toContain('Do you confirm action?');
          dialog.accept();
        });

        break;
      case 'PromptAlert':
        this.page.on('dialog', async (dialog) => {
          await expect(this.page.locator('text=Please enter your name')).toBeVisible();
          dialog.accept();
        });
        break;
      default:
        console.log('No Corresponding alerts');
        break;
    }
  }

  async close_Alert_Button(alertElem: string) {
    switch (alertElem) {
      case 'SimpleAlert':
        await expect(this.page.locator('text=You clicked a button')).not.toBeVisible();

        break;
      case 'TimedAlert':
        await expect(
          this.page.locator('text=This alert appeared after 5 seconds'),
        ).not.toBeVisible();
        break;
      case 'ConfirmAlert':
        await expect(this.page.locator('text=Do you confirm action?')).not.toBeVisible();
        await expect(this.page.locator('text=You selected Ok')).toBeVisible();

        break;
      case 'PromptAlert':
        await expect(this.page.locator('text=Please enter your name')).not.toBeVisible();
        await expect(this.page.locator('text=You entered Prompt message')).toBeVisible();
        break;
      default:
        console.log('No Corresponding alerts');
        break;
    }
  }
}
