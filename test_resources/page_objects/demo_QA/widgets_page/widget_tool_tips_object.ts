import { expect } from '@playwright/test';
import { ICustomWorld } from '../../../../conf/support/custom-world';
import { Page } from 'playwright';

export class widgetToolkitPage {
  ///////////////////////////////////////////////////////////////////////////////
  //  Locators
  //////////////////////////////////////////////////////////////////////////////
  //   readonly HOVER_SUBMENU_FIRST_LEVEL = 'a:text("Main Item 2")';
  readonly HOVER_TOOL_BUTTON = '#toolTipButton';
  readonly HOVER_TOOL_FIELD = '#toolTipTextField';
  readonly HOVER_TOOL_TEXT1 = 'a:text("Contrary")';
  readonly HOVER_TOOL_TEXT2 = 'a:text("1.10.32")';

  readonly TOOLTIP_BUTTON = '#buttonToolTip';
  readonly TOOLTIP_TEXTFIELD = '#textFieldToolTip';
  readonly TOOLTIP_TEXT1 = '#contraryTexToolTip';
  readonly TOOLTIP_TEXT2 = '#sectionToolTip';

  ///////////////////////////////////////////////////////////////////////////////
  //  Methods
  //////////////////////////////////////////////////////////////////////////////
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async hover_Tool_kit(hoverElem: string) {
    switch (hoverElem) {
      case 'TooltipButton':
        await this.page.hover(this.HOVER_TOOL_BUTTON);
        break;
      case 'TooltipField':
        await this.page.hover(this.HOVER_TOOL_FIELD);
        break;
      case 'TooltipText1':
        await this.page.hover(this.HOVER_TOOL_TEXT1);
        break;
      case 'TooltipText2':
        await this.page.hover(this.HOVER_TOOL_TEXT2);
        break;
      default:
        console.log('No Corresponding elements');
        break;
    }
  }

  async check_Tool_kit_on_hover(hoverElem: string) {
    let hovertext: string;
    switch (hoverElem) {
      case 'TooltipButton':
        await this.page.locator(this.TOOLTIP_BUTTON).waitFor();
        await expect(this.page.locator(this.TOOLTIP_BUTTON)).toBeVisible();

        break;
      case 'TooltipField':
        await this.page.locator(this.TOOLTIP_TEXTFIELD).waitFor();
        await expect(this.page.locator(this.TOOLTIP_TEXTFIELD)).toBeVisible();
        break;

      case 'TooltipText1':
        await this.page.locator(this.TOOLTIP_TEXT1).waitFor();
        await expect(this.page.locator(this.TOOLTIP_TEXT1)).toBeVisible();
        break;

      case 'TooltipText2':
        await this.page.locator(this.TOOLTIP_TEXT2).waitFor();
        await expect(this.page.locator(this.TOOLTIP_TEXT2)).toBeVisible();
        break;

      default:
        console.log('No Corresponding elements');
        break;
    }
  }
}
