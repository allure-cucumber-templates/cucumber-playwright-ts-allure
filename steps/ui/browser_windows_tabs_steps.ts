import { Given, Then, When } from '@cucumber/cucumber';
import { Page } from 'playwright';
import { ICustomWorld } from '../../conf/support/custom-world';
import { switchPage } from '../../test_resources/page_objects/demo_QA/alert_frame_windows_page/switch_tab_windows_pageobject';

When('I switch tab', async function (this: ICustomWorld) {
  const page = this.page!;
  const switchFunc = new switchPage(page);
  this.page = await switchFunc.opening_new_tab(this.context!);
});

When('I switch windows', async function (this: ICustomWorld) {
  const page = this.page!;
  const switchFunc = new switchPage(page);
  this.page = await switchFunc.switch_to_new_window(this.context!);
});
When('I switch to new windows message', async function (this: ICustomWorld) {
  const page = this.page!;
  const switchFunc = new switchPage(page);
  this.page = await switchFunc.switch_to_new_window_with_message(this.context!);
});

Then('The new tab is opened', async function (this: ICustomWorld) {
  const page = this.page!;
  const switchFunc = new switchPage(page);
  await switchFunc.check_new_tab_is_opened();
});

Then('The new windows is opened', async function (this: ICustomWorld) {
  const page = this.page!;
  const switchFunc = new switchPage(page);
  await switchFunc.check_new_window_is_opened();
});

Then('The new windows message is opened', async function (this: ICustomWorld) {
  const page = this.page!;
  const switchFunc = new switchPage(page);
  await switchFunc.check_window_message_after_window_switch();
});
