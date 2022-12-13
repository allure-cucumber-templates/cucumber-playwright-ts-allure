import { expect } from '@playwright/test';
import { ICustomWorld } from '../../../../conf/support/custom-world';
import { Page } from 'playwright';

export class widgetDisplayPage {
  ///////////////////////////////////////////////////////////////////////////////
  //  Locators
  //////////////////////////////////////////////////////////////////////////////
  readonly HOVER_SUBMENU_FIRST_LEVEL = 'a:text("Main Item 2")';
  readonly HOVER_SUBMENU_SECOND_LEVEL = 'a:text("SUB SUB LIST »")';
  readonly HOVER_SUBMENU_LAST_LEVEL = 'a:text("Sub Sub Item 1")';
  readonly SELECT_VALUE = '#withOptGroup';
  readonly SELECTVALUE_OPTION = '#react-select-2-option-0-0';
  readonly SELECT_ONE = '#selectOne';
  readonly SELECT_ONE_OPTION = '#react-select-3-option-0-1';
  readonly OLD_STYLE_SELECT = '#oldSelectMenu';
  readonly OLD_STYLE_SELECT_OPTION_1 = '#oldSelectMenu >[value="1"]';
  readonly MULTI_SELECT_DROPDOWN = '#react-select-4-input';
  readonly MULTI_SELECT_DROPDOWN_OPTION = '#react-select-4-option-1';
  readonly MULTI_SELECT_DROPDOWN_OPTION_1 = 'div:text("Blue")';
  readonly STANDARD_MULTI_SELECT = '#cars';
  readonly STANDARD_MULTI_SELECT_OPTION = '#cars >[value="volvo"]';

  ///////////////////////////////////////////////////////////////////////////////
  //  Methods
  //////////////////////////////////////////////////////////////////////////////
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async hover_on_submenu() {
    await this.page.hover(this.HOVER_SUBMENU_FIRST_LEVEL);
    await this.page.locator(this.HOVER_SUBMENU_SECOND_LEVEL).waitFor();
  }

  async check_hover_submenu_display() {
    await expect(this.page.locator(this.HOVER_SUBMENU_SECOND_LEVEL)).toBeVisible();
    await this.page.hover(this.HOVER_SUBMENU_SECOND_LEVEL);

    await this.page.locator(this.HOVER_SUBMENU_LAST_LEVEL).waitFor();
    await expect(this.page.locator(this.HOVER_SUBMENU_LAST_LEVEL)).toBeVisible();
  }
  async fill_select_menu() {
    await this.page.locator(this.SELECT_VALUE).click();
    await this.page.locator(this.SELECTVALUE_OPTION).click();
    await this.page.locator(this.SELECT_ONE).click();
    await this.page.locator(this.SELECT_ONE_OPTION).click();
    await this.page.locator(this.OLD_STYLE_SELECT).selectOption('1');
    await this.page.locator(this.MULTI_SELECT_DROPDOWN).click({ force: true });
    await this.page.locator(this.MULTI_SELECT_DROPDOWN_OPTION).click();
    await this.page.keyboard.press('Escape');
    await this.page.locator(this.STANDARD_MULTI_SELECT).click();
    await this.page.locator(this.STANDARD_MULTI_SELECT).selectOption('volvo');
  }

  async check_select_menu() {
    await expect(this.page.locator(this.SELECT_VALUE)).toHaveText('Group 1, option 1');
    await expect(this.page.locator(this.SELECT_ONE)).toHaveText('Mr.');
    await expect(this.page.locator(this.OLD_STYLE_SELECT_OPTION_1)).toHaveText('Blue');

    await expect(this.page.locator(this.MULTI_SELECT_DROPDOWN_OPTION_1)).toHaveText('Blue');
    await expect(this.page.locator(this.STANDARD_MULTI_SELECT_OPTION)).toHaveText('Volvo');
  }
}
