import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../../conf/support/custom-world';
import { widgetDisplayPage } from '../../test_resources/page_objects/demo_QA/widgets_page/widget_display_menus_page';
import { widgetToolkitPage } from '../../test_resources/page_objects/demo_QA/widgets_page/widget_tool_tips_object';

When('I hover over the main item 2 sub sub list', async function (this: ICustomWorld) {
  const page = this.page!;
  const widgetFunc = new widgetDisplayPage(page);
  await widgetFunc.hover_on_submenu();
});
Then('I see my menu sub sub items', async function (this: ICustomWorld) {
  const page = this.page!;
  const widgetFunc = new widgetDisplayPage(page);
  await widgetFunc.check_hover_submenu_display();
});

When('I hover over {string}', async function (this: ICustomWorld, TooltipElement: string) {
  console.log(TooltipElement);
  const page = this.page!;
  const widgetFunc = new widgetToolkitPage(page);
  await widgetFunc.hover_Tool_kit(TooltipElement);
});
Then('I see the tooltip for {string}', async function (this: ICustomWorld, TooltipElement: string) {
  const page = this.page!;
  const widgetFunc = new widgetToolkitPage(page);
  await widgetFunc.check_Tool_kit_on_hover(TooltipElement);
});

When('I fill the select fields', async function (this: ICustomWorld) {
  const page = this.page!;
  const selectFunc = new widgetDisplayPage(page);
  await selectFunc.fill_select_menu();
});
Then('I see my selections for each field', async function (this: ICustomWorld) {
  const page = this.page!;
  const selectFunc = new widgetDisplayPage(page);
  await selectFunc.check_select_menu();
});
